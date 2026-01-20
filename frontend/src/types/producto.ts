export interface ProductoRequestDTO{
    code:string;
    nombre:string;
    precio:number;
    stock:number;
    ganancia:number;
    proveedor:string;
}
export interface ProductoResponseDTO{
    idProducto:number,
    code:string;
    nombre:string;
    precio:number;
    stock:number;
}
