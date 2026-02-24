import type { TurnoLocal } from "../types/ventas";

export {};

declare global {
  interface Window {
    electronAPI: {
      navigate: (config: {
        route: string;
        from?: string;
      }) => Promise<void>;

      loginSuccess: (usuario: any) => Promise<void>;

      loginToAdmin: (usuario: any) => Promise<void>;

      getUsuarioActual: () => Promise<any>;

      openTurnoModal:() => Promise<void>;

      confirmarTurno: (turno: any) => Promise<void>;

      cerrarTurno:() => Promise<void>;

      onTurnoIniciado: (callback: (turno: any) => void) => void;
      offTurnoIniciado: (callback: (turno: any) => void) => void;

      getTurnoActual: () => Promise<TurnoLocal|null>;

      openPagoMixto: (total: number) => Promise<void>;
      confirmarPagoMixto: (pagos: PagoDTO[]) => Promise<void>;

      onPagoMixtoConfirmado: (callback: (pagos: PagoDTO[]) => void) => void;
      offPagoMixtoConfirmado: (callcallback: (pagos: PagoDTO[]) => void) => void;

      ventaMixtaResultado:(resultado:{ok:boolean}) =>Promise<void>;

      onVentaMixtaResultado:(callback: (resultado: { ok: boolean }) => void) => void;
      offVentaMixtaResultado:(callback: (resultado: { ok: boolean }) => void) => void;

      setCurrentPage: (pageKey: string) => void;
    };
  };
}

