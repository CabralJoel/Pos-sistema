export {};

declare global {
  interface Window {
    electronAPI: {
      navigate: (config: {
        route: string;
        from?: string;
      }) => Promise<void>;

      openPagoMixto: (total: number) => Promise<void>;

      confirmarPagoMixto: (pagos: PagoDTO[]) => Promise<void>;

      onPagoMixtoConfirmado: (callback: (pagos: PagoDTO[]) => void) => void;

      offPagoMixtoConfirmado: (callcallback: (pagos: PagoDTO[]) => void) => void;

      onPagoMixtoTotal: (callback: (event: any, total: number) => void) => void;

      setCurrentPage: (pageKey: string) => void;
    };
  };
}

