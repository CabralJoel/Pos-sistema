import { app, BrowserWindow, ipcMain,screen } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const window_config = {
  fullscreen:false,
  startMaximized: false
};

function createWindow(route = "/") {

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (!app.isPackaged) {
    win.loadURL(`http://localhost:5173${route}`); 
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  return win;
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("open-new-window", (_, route) => {
    console.log("Main: creando ventana en ruta ->", route);
    createWindow(route);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});