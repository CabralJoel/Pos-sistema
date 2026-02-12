const { contextBridge, ipcRenderer } = require("electron");

const listeners = new Map();

contextBridge.exposeInMainWorld("electronAPI", {

  //openWindow: (config) => ipcRenderer.invoke("open-window", config),
  
  navigate: (config) => ipcRenderer.invoke("navigate", config),

  loginSuccess: (usuario) => ipcRenderer.invoke("login-success", usuario),

  openTurnoModal: () => ipcRenderer.invoke("open-turno-modal"),

  confirmarTurno: (turno) => ipcRenderer.invoke("confirmar-turno", turno),

  cerrarTurno: () => ipcRenderer.invoke("cerrar-turno"),

  onTurnoIniciado: (callback) => {
    const handler = (_, turno) => callback(turno);
    listeners.set(callback, handler);
    ipcRenderer.on("turno-iniciado", handler);
  },

  offTurnoIniciado: (callback) => {
    const handler = listeners.get(callback);
    if (handler) {
      ipcRenderer.removeListener("turno-iniciado", handler);
      listeners.delete(callback);
    }
  },

  getTurnoActual: () => ipcRenderer.invoke("get-turno-actual"),

  openPagoMixto: (total) => ipcRenderer.invoke("open-pago-mixto", total),

  confirmarPagoMixto: (pagos) => ipcRenderer.invoke("pago-mixto-confirmado", pagos),

  onPagoMixtoConfirmado: (callback) => {
    const handler = (_, pagos) => callback(pagos);
    listeners.set(callback, handler);
    ipcRenderer.once("pago-mixto-confirmado", handler);
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