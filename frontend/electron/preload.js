const { contextBridge, ipcRenderer } = require("electron");

const listeners = new Map();

contextBridge.exposeInMainWorld("electronAPI", {

  //openWindow: (config) => ipcRenderer.invoke("open-window", config),
  
  navigate: (config) => ipcRenderer.invoke("navigate", config),

  openPagoMixto: (total) => ipcRenderer.invoke("open-pago-mixto", total),

  confirmarPagoMixto: (pagos) => ipcRenderer.invoke("pago-mixto-confirmado", pagos),

  onPagoMixtoConfirmado: (callback) => {
    const handler = (_, pagos) => callback(pagos);
    listeners.set(callback, handler);
    ipcRenderer.on("pago-mixto-confirmado", handler);
  },

  offPagoMixtoConfirmado: (callback) => {
    const handler = listeners.get(callback);
    if (handler) {
      ipcRenderer.removeListener("pago-mixto-confirmado", handler);
      listeners.delete(callback);
    }
  },

  setCurrentPage: (pageKey) => ipcRenderer.send("set-current-page", pageKey),

});