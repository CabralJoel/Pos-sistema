import BarraCargarProducto from "../components/caja/BarraCargarProducto"
import ListaProdVenta from "../components/caja/ListaProdVentas"
import TotalVenta from "../components/caja/TotalVenta"
import OpcionesCaja from "../components/caja/OpcionesCaja"
import PanelConsulta from "../components/caja/PanelConsulta"
import type { ProductoResponseDTO } from "../types/producto"
import { useMemo, useState } from "react"
import {toast } from "react-toastify";

import { EstadoVenta, type ItemVentaDTO, type VentaLocal } from "../types/ventas"

import styles from "../styles/cajaPage/CajaPage.module.css"


export default function CajaPage(){
    const ventaInicial = (): VentaLocal => ({
        items:[],
        medioPago: null
    })

    const [VentaLocal,setVentaLocal] = useState<VentaLocal>(ventaInicial());

    const total = useMemo(() => {
        return VentaLocal.items.reduce((suma,item) =>
            suma + item.subtotal,0);
    },[VentaLocal.items]);

    const buscarProducto = async(texto:string):Promise<ProductoResponseDTO[]> => {
        const response = await fetch(`http://localhost:8080/productos/buscar/${encodeURIComponent(texto)}`);
        if(!response.ok){
            throw new Error("Error buscando productos");
        }
        return response.json();
    };

    const handleAgregarProducto = (producto: ProductoResponseDTO,cant:number) => {
        setVentaLocal(prevVenta => {
            const items = [...prevVenta.items];

            const index = items.findIndex(item => item.idProd === producto.idProducto)

            if(index>=0){
                const itemExistente = items[index];
                const nuevaCantidad = itemExistente.cantidad + cant

                items[index] = 
                {...itemExistente,
                    cantidad : nuevaCantidad,
                    subtotal : nuevaCantidad * itemExistente.precioUnitario
                }; 
            }
            else{
                items.push({
                        idProd: producto.idProducto,
                        nombre: producto.nombre,
                        precioUnitario: producto.precio,
                        cantidad: cant,
                        subtotal: producto.precio * cant
                })
            }
            const total = items.reduce((suma,item) => suma + item.subtotal,0);

            return {
                ...prevVenta,
                items,
                total
            }
        })
    };

    const actualizarCantItem = (itemId:number,nuevaCantidad:number) => {
        setVentaLocal(venta => ({
            ...venta,
            items: venta.items.map(item => item.idProd === itemId? {
                ...item,
                cantidad: nuevaCantidad,
                subtotal:nuevaCantidad * item.precioUnitario
            }: item).filter(item => item.cantidad > 0 )
        }));
    };

    return(
        <div className={styles.pageContainer}>
            <div></div>
            <BarraCargarProducto buscarProducto={buscarProducto} onProductoSeleccionado={handleAgregarProducto}/>
            <div className={styles.infoContainer}>
                <ListaProdVenta items={VentaLocal.items} onSumar={actualizarCantItem} 
                onRestar={actualizarCantItem} onEliminar={actualizarCantItem}/>
                <TotalVenta total={total}/>
            </div>
            <OpcionesCaja/>
        </div>
    )
}