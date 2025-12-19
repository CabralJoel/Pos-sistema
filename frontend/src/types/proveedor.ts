export interface ProveedorDTO{
    code:string,
    cuit:string,
    nombre:string,
    localidad:string,
    direccion:string,
    email:string,
    telefono:string,
    descripcion?:string
}

export interface ProveedorResponse{
    id:number,
    code:string,
    cuit:string,
    nombre:string,
    localidad:string,
    direccion:string,
    email:string,
    telefono:string,
    descripcion?:string
}