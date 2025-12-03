export {};

declare global {
  interface Window {
    electronAPI: {
      openWindow: (route: string) => Promise<void>;
    };
  }
}