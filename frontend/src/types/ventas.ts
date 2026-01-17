export interface ItemVentaDTO{
    id:number,
    nombre:string,
    precioUnitario:number,
    cantidad:number,
    subtotal:number
}

export interface VentaLocal{//se puede agregar uuid para cuando haya varias ventas al mismo tiempo
    items:ItemVentaDTO[],
    total:number,
    medioPago:MedioPago|null, //cambiar por un tipo propio?
    estado:EstadoVenta,
    fechaCreacion:Date
}

export interface ItemVentaRequest{
    idProducto:number,
    cantidad:number
}

export interface VentaRequest{
    medioPago:MedioPago|null,
    items:ItemVentaRequest[]
}

export const MedioPago = {
    EFECTIVO : "EFECTIVO",
    TRANSFERENCIA : "TRANSFERENCIA",
    DEBITO : "DEBITO",
    CREDITO : "CREDITO",
    MIXTO : "MIXTO"
} as const;

export type MedioPago = typeof MedioPago[keyof typeof MedioPago];

export const EstadoVenta = {
    EN_CURSO : "EN_CURSO",
    FINALIZADA : "FINALIZADA",
    ANULADA : "ANULADA"
}as const;

export type EstadoVenta = typeof EstadoVenta[keyof typeof EstadoVenta];