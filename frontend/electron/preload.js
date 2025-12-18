const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD CARGÓ!");//TODO:borrar los consol.log

contextBridge.exposeInMainWorld("electronAPI", {
  openWindow: (route) => {
    console.log("Preload: enviando ruta ->", route);
    return ipcRenderer.invoke("open-new-window", route);
  }
});