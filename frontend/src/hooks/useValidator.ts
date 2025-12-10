import { useState } from "react";
import type { Validator } from "../utils/validaciones";

export function useValidator<T>() {
    const [errors, setErrors] = useState<string[]>([]);

    function validate(value: T, validators: Validator<T>[]) {
        const res = validators
            .map(fn => fn(value))
            .filter((msg): msg is string => msg !== null);

        setErrors(res);
        
        return {
            ok:res.length === 0,
            errors: res
        };
    }

    function resetErrors() {
        setErrors([]);
    }

    return {
        errors,
        validate,
        resetErrors
    };
}