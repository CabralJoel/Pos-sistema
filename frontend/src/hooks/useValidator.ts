import type { Validator } from "../utils/validaciones";

export function useValidator<T>() {

    function validate(value: T, validators: Validator<T>[]) {
        const res = validators
            .map(fn => fn(value))
            .filter((msg): msg is string => msg !== null);
        
        return {
            ok:res.length === 0,
            errors: res
        };
    }

    return {validate};
}