import type { ItemVentaDTO,VentaLocal,VentaRequestDTO } from "../types/ventas";


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

export function mapVentaRequest(ventaLocal:VentaLocal):VentaRequestDTO{
    return{
        mediosDePago:ventaLocal.mediosDePago,
        items:ventaLocal.items.map(item => ({
            idProducto:item.idProd,
            cantidad:item.cantidad,
            ...(item.idProd === null && {precioUnitario:item.precioUnitario})
            
        }))
    }
}
