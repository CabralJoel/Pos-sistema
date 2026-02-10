import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { navigationRules } from "./navigationRules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const windows = new Map();

const session = {
  usuario: null,
  turno: null,
};

const windowTypes = {
  full: () => screen.getPrimaryDisplay().workAreaSize,
  home: () => ({ width: 1200, height: 800 }),
  modal: () => ({ width: 600, height: 500 }),
};

function createWindow(route, { windowKey, windowType, parent, modal } = {}) {
  const size = windowTypes[windowType]?.() ?? windowTypes.full();

  const win = new BrowserWindow({
    ...size,
    parent,
    modal,
    resizable: !modal,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    win.loadURL(`http://localhost:5173${route}`);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  if(windowKey){
    windows.set(windowKey, {
      win,
      pageKey: route,
    });

    win.on("closed", () => {
      windows.delete(windowKey);
    });
  }
  

  return win;
}

// navigation
function navigate({ route, sender }) {
  const rule = navigationRules[route];
  if (!rule) return;

  const currentWindow = BrowserWindow.fromWebContents(sender);

  //se ve desde donde viene la navegacion
  const currentEntry = [...windows.entries()]
    .find(([, win]) => win === currentWindow);

  const currentKey = currentEntry?.[0];

  
  const shouldOpenWindow =
    rule.alwaysOpenInWindow ||
    rule.openInWindowFrom?.includes(currentKey);

  // abrimos ventana nueva
  if (shouldOpenWindow) {
    const existing = windows.get(rule.windowKey);

    if (rule.singleton && existing && !existing.isDestroyed()) {
      existing.win.focus();
    } else {
      createWindow(route, rule);
    }

    //cierra la ventana si se indica
    const currentRule = Object.values(navigationRules)
      .find(r => r.windowKey === currentKey);

    if (currentRule?.closeOnNavigateTo?.includes(route)) {
      currentWindow.close();
    }

    return;
  }


  const url = !app.isPackaged
    ? `http://localhost:5173${route}`
    : `file://${path.join(__dirname, "../dist/index.html")}#${route}`;

  currentWindow.loadURL(url);
}

function openTurnoModal(){
  const caja = windows.get("caja");

  const existing = windows.get("turno-modal");
  if (existing && !existing.win.isDestroyed()) {
    existing.win.focus();
    return;
  }

  createWindow("/turno", {
    windowKey: "turno-modal",
    windowType: "modal",
    parent: caja?.win,
    modal: true,
  });
}

// APP
app.whenReady().then(() => {
  createWindow("/", navigationRules["/"]);

  ipcMain.handle("navigate", (e, payload) =>
    navigate({ ...payload, sender: e.sender })
  );

    //actualizar pageKey
  ipcMain.on("set-current-page", (e, pageKey) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const entry = [...windows.values()].find(v => v.win === win);

    if (entry) entry.pageKey = pageKey;
    
  });

    // login
  ipcMain.handle("login-success", (_, usuario) => {
    session.usuario = usuario;

    // cerrar home
    const home = windows.get("home");
    home?.win.close();

    // abrir caja
    const cajaRule = navigationRules["/caja"];
    const caja = createWindow("/caja", {
      ...cajaRule,
      windowKey:"caja"});

    
    openTurnoModal();
  });
  
  // abrir TurnoModal
  ipcMain.handle("open-turno-modal",() => {
    openTurnoModal();
  })

    //confirmar turno
  ipcMain.handle("confirmar-turno", (_, turno) => {
    session.turno = turno;
    const caja = windows.get("caja");
    caja?.win.webContents.send("turno-iniciado", turno);
  });

  ipcMain.handle("get-turno-actual", () => session.turno);

  ipcMain.handle("cerrar-turno",() => session.turno = null);

  //MODAL PAGO MIXTO
  ipcMain.handle("open-pago-mixto", (_, total) => {
    const caja = windows.get("caja");
    if (!caja) return;

    createWindow(`/pago-mixto?total=${total}`, {
      windowType: "modal",
      parent: caja,
      modal: true,
    });
  });
});

ipcMain.handle("pago-mixto-confirmado", (_, pagos) => {
  const caja = windows.get("caja");
  if (caja && !caja.win.isDestroyed()) {
    caja.webContents.send("pago-mixto-confirmado", pagos);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
