import { useCallback } from "react";

export function useNumericInput(allowDecimal: boolean = true) {

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    const allowedControlKeys = [
      "Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"
    ];

    if (allowedControlKeys.includes(key)) return;

    // dígitos
    if (/^\d$/.test(key)) return;

    // permitir punto/coma si se permiten decimales
    if (allowDecimal && (key === ".")) return;

    // bloquear todo lo demás
    e.preventDefault();
  }, [allowDecimal]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");

    if (!allowDecimal && /[.,]/.test(text)) {
      e.preventDefault();
      return;
    }

    if (!/^[0-9.,]+$/.test(text)) {
      e.preventDefault();
    }
  }, [allowDecimal]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    e.preventDefault();
  }, []);

  return { handleKeyDown, handlePaste, handleWheel };
}
