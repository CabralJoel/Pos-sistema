const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD CARGÓ!");

contextBridge.exposeInMainWorld("electronAPI", {
  openWindow: (route) => {
    console.log("Preload: enviando ruta ->", route);
    return ipcRenderer.invoke("open-new-window", route);
  }
});