export const navigationRules = {
    "/": {
        windowKey: "home",
        singleton: true,
        windowType: "home",
        closeOnNavigateTo: ["/caja"],
    },

    "/caja": {
        windowKey: "caja",
        singleton: true,
        windowType: "full",
        alwaysOpenInWindow: true,
    },

    "/carga": {
        windowKey: "admin",
        singleton: true,
        windowType: "full",
        openInWindowFrom: ["caja"],
    },

    "/proveedores": {
        windowKey: "admin",
        singleton: true,
        windowType: "full",
        openInWindowFrom: ["caja"],
    },

};