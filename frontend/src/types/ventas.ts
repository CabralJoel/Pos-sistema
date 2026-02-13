export interface ItemVentaDTO{
    idItem:string,
    idProd:number|null,
    nombre:string,
    precioUnitario:number,
    cantidad:number,
    subtotal:number
}

export interface VentaLocal{//se puede agregar uuid para cuando haya varias ventas al mismo tiempo
    items:ItemVentaDTO[],
    mediosDePago:PagoDTO[],
}

export interface VentaRequestDTO{
    items:ItemVentaRequestDTO[],
    mediosDePago:PagoDTO[]
}
export interface VentaResponseDTO{
    id:number,
    fechaCreacion:string,
    total:number,
    estado:EstadoVenta,
    productos:ItemVentaDTO[]
}

export interface ItemVentaRequestDTO{
    idProducto:number|null,
    cantidad:number,
    precioUnitario?:number
}

export const MedioPago = {
    EFECTIVO : "EFECTIVO",
    TRANSFERENCIA : "TRANSFERENCIA",
    DEBITO : "DEBITO",
    CREDITO : "CREDITO",
    MIXTO : "MIXTO"
} as const;

export type MedioPago = typeof MedioPago[keyof typeof MedioPago];

export type ModoPago = "SIMPLE" | "MIXTO";

export interface PagoDTO {
    tipoPago: MedioPago;
    monto: number;
}

export const EstadoVenta = {
    EN_CURSO : "EN_CURSO",
    FINALIZADA : "FINALIZADA",
    ANULADA : "ANULADA"
}as const;

export type EstadoVenta = typeof EstadoVenta[keyof typeof EstadoVenta];

export interface usuarioLocal{
    idUsuario:number,
    nombre:string,
    rol:"ADMIN"|"CAJERO"
}

export interface TurnoDTO{
    idCajero: number;
    efectivoInicial:number;
}

export interface TurnoLocal{
    idTurno:number,
    cajero:usuarioLocal,
    fechaInicio:string,
    efectivoInicial:number,
}

export interface TurnoCierreDTO{
    idTurno:number,
    efectivoFinal:number,
}

export interface TurnoDetalle{//TODO: descomentar
    idTurno:number,
    cajero:usuarioLocal,
    //fechaInicio:string,
    //fechaFin:string,
    efectivoInicial:number,
    efectivoFinal:number,
    diferencia:number,
    estado:EstadoTurno,
}

export type EstadoTurno = "ABIERTO" | "CERRADO";

export interface ResumenVentaLocal{
    idVenta:number,
    fecha:string,
    total:number
}
export interface ResumenVentaTurnoLocal{
    idTurno:number,
    fechaInicio:string,
    nombreCajero:string,
    cantVentasConfirmadas:number,
    cantVentasAnuladas:number,
    total:number,
    ventas:ResumenVentaLocal[],
}