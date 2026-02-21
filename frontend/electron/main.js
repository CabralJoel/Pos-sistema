import { app, BrowserWindow, ipcMain, screen,globalShortcut } from "electron";
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

function canUseShortcuts(){
  if(!session.usuario)return false;//valida usuario no logueado
  const modalOpen = [...windows.values()].some(entry=>{//validacion modal abierto
    const win = entry.win;
    return win && !win.isDestroyed() && win.isModal();
  });
  if(modalOpen) return false;
  return true;
}

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
    minimizable:!modal,
    maximizable:!modal,
    fullscreenable:!modal,
    closable:!modal,
    autoHideMenuBar: modal,//esconde el menu
    //frame:!modal,//borra la barra de ventana completa
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
function focusWindow(win){
  if(!win || win.isDestroyed())return;
  if(win.isMinimized()){
    win.restore();
  }
  win.focus();
}
//navegacion global
function openOrFocusWindow(route) {
  const rule = navigationRules[route];
  if (!rule) return;
  const existing = windows.get(rule.windowKey);
  if(existing?.win && !existing.win.isDestroyed()){
    focusWindow(existing.win);
    
    if(existing.pageKey !==route){
      const url = !app.isPackaged? `http://localhost:5173${route}`: `file://${path.join(__dirname, "../dist/index.html")}#${route}`;

      existing.win.loadURL(url);
      existing.pageKey = route;
    }
    return;
  }
  createWindow(route,rule);
}

// navigation
function navigate({ route, sender }) {
  const rule = navigationRules[route];
  if (!rule) return;

  const currentWindow = BrowserWindow.fromWebContents(sender);

  //se ve desde donde viene la navegacion
  const currentEntry = [...windows.entries()].find(([, value]) => value.win === currentWindow);

  const currentKey = currentEntry?.[0];

  
  const shouldOpenWindow = rule.alwaysOpenInWindow || rule.openInWindowFrom?.includes(currentKey);

  // abrimos ventana nueva
  if (shouldOpenWindow) {
    const existing = windows.get(rule.windowKey);

    openOrFocusWindow(route);

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

//turno modal
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
  //Menu.setApplicationMenu(null);//descomentar para mostrar el mentu superior
  
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
      windowKey: "pago-mixto",
      windowType: "modal",
      parent: caja.win,
      modal: true,
    });
  });
  //ATAJOS DE TECLADO GLOBALES A RUTAS
  globalShortcut.register("F2", () => {
    if (!canUseShortcuts()) return;//bloqueos de logueo y modal 
    openOrFocusWindow("/caja");
  });

  globalShortcut.register("F3", () => {
    if (!canUseShortcuts()) return;
    openOrFocusWindow("/carga");
  });

  globalShortcut.register("F4", () => {
    if (!canUseShortcuts()) return;
    openOrFocusWindow("/proveedores");
  });

  globalShortcut.register("F5", () => {
    if (!canUseShortcuts()) return;
    openOrFocusWindow("/inventario");
  });

  globalShortcut.register("F6", () => {
    if (!canUseShortcuts()) return;
    openOrFocusWindow("/administracion");
  });
});

  ipcMain.handle("pago-mixto-confirmado", (_, pagos) => {
    const caja = windows.get("caja");
    if (caja && !caja.win.isDestroyed()) {
      caja.win.webContents.send("pago-mixto-confirmado", pagos);
    }
  });

  ipcMain.handle("venta-mixta-resultado",(_,resultado) =>{
    const modal = windows.get("pago-mixto");
    if(modal && !modal.win.isDestroyed()){
      modal.win.webContents.send("venta-mixta-resultado",resultado);

      if(resultado.ok){
        modal.win.close();
      }
    }
  });

app.on("will-quit",()=>{
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
