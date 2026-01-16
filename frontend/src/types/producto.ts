export interface ProductoRequestDTO{
    code:string;
    nombre:string;
    precio:number;
    stock:number;
    ganancia:number;
    proveedor:string;
}
export interface ProductoResponseDTO{
    code:string;
    nombre:string;
    precio:number;
    stock:number;
    proveedor:string;
}
