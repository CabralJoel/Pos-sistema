import React from "react";
import { useNumericInput } from "../hooks/useNumericInput";

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  decimal?: boolean;    // ← NUEVO PROP
}

export function NumberInput({ decimal = true, ...props }: NumericInputProps) {

  const { handleKeyDown, handlePaste, handleWheel } = useNumericInput(decimal);

  return (
    <input
      type="number"
      step={decimal ? "any" : "1"}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onWheel={handleWheel}
      {...props}
    />
  );
}
