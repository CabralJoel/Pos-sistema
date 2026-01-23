import type { ItemVentaDTO, ItemVentaRequest } from "../types/ventas";


export function crearItemManual(monto:number):ItemVentaDTO{
    return{
        idItem: crypto.randomUUID(),
        idProd:null,
        nombre:"Varios",
        precioUnitario:monto,
        cantidad:1,
        subtotal:monto
    }
}