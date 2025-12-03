import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow(route="/") {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation:true,
      nodeIntegration:false
    },
  });

  if (!app.isPackaged) {
    win.loadURL(`http://localhost:5173${route}`); 
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("open-new-window", (_, route) => {
  console.log("Main: creando ventana en ruta ->", route);
  createWindow(route);
});
});
