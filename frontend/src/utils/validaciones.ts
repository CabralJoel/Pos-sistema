export type Validator<T> = (value: T) => string | null;

// Campo no vacío
export const isNotEmpty = (field: string): Validator<any> => {
    return (value) => {
        if (value === "" || value === null || value === undefined) {
            return `El campo ${field} no puede estar vacío`;
        }
        return null;
    };
};

// Mayor a cero
export const mayorACero = (field: string): Validator<number> => {
    return (value) => {
        if (value <= 0) {
            return `${field} debe ser mayor a 0`;
        }
        return null;
    };
};

// Longitud máxima
export const maxLength = (field: string, max: number): Validator<string> => {
    return (value) => {
        if (!value) return null;
        if (value.length > max) {
            return `${field} debe tener máximo ${max} caracteres`;
        }
        return null;
    };
};
