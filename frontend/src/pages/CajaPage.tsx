import BarraCargarProducto from "../components/caja/BarraCargarProducto"
import ListaProdVenta from "../components/caja/ListaProdVentas"
import TotalVenta from "../components/caja/TotalVenta"
import OpcionesCaja from "../components/caja/OpcionesCaja"
import {toast } from "react-toastify";

import { crearItemManual, mapVentaRequest } from "../hooks/useCreacionVentaTypes"
import { buscarProductos} from "../service/producto.service";

import { useEffect, useMemo, useState } from "react"

import type { ProductoResponseDTO } from "../types/producto"
import { MedioPago, type VentaLocal,type VentaRequestDTO,type PagoDTO, type TurnoLocal } from "../types/ventas"

import styles from "../styles/cajaPage/CajaPage.module.css"


export default function CajaPage(){
    const ventaInicial = (): VentaLocal => ({
        items:[],
        mediosDePago: []
    })

    const [formaPago,setFormaPago] = useState<MedioPago>("EFECTIVO");
    const [VentaLocal,setVentaLocal] = useState<VentaLocal>(ventaInicial());
    const [ventasRealizadas,setVentasRealizadas] = useState(0);
    const [turno,setTurno] = useState<TurnoLocal|null>(null);
    //const [mostrarModal,setMostrarModal] = useState(false);

    const total = useMemo(() => {
        return VentaLocal.items.reduce((suma,item) =>
            suma + item.subtotal,0);
    },[VentaLocal.items]);

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
                        idItem: crypto.randomUUID(),
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

    const consultaProducto = async (texto:string) => {
        try{
            const response = await fetch(`http://localhost:8080/productos/buscar/${texto}`);

            if(!response.ok){
                return;
            }
            return response.json();
        }
        catch(error){
            toast.error("No se pudo concretar la venta");
        }
    }

    const handleProductoManual = (monto:number) => {
        setVentaLocal(venta => ({
            ...venta,
            items: [...venta.items,crearItemManual(monto)]
        }))
    }

    const actualizarCantItem = (itemId:string,nuevaCantidad:number) => {
        setVentaLocal(venta => ({
            ...venta,
            items: venta.items.map(item => item.idItem === itemId? {
                ...item,
                cantidad: nuevaCantidad,
                subtotal:nuevaCantidad * item.precioUnitario
            }: item).filter(item => item.cantidad > 0 )
        }));
    };

    const finalizarVenta = async() => {
        console.log(turno);
        if(VentaLocal.items.length === 0){
            toast.error("No hay productos cargados");
            return;
        }

        if(formaPago === "MIXTO"){
            window.electronAPI.openPagoMixto(total)
            return;
        }

        const ventaSimple: VentaLocal = {
            ...VentaLocal,
            mediosDePago:[{
                tipoPago: formaPago,
                monto: total
            }]
        }

        const ventaRequest = mapVentaRequest(ventaSimple);

        enviarVenta(ventaRequest);
    }

    const confirmarPagoMixto = async(pagos:PagoDTO[]) => {

        const ventaMixta: VentaLocal = {
            ...VentaLocal,
            mediosDePago:pagos
        }

        const ventaRequest = mapVentaRequest(ventaMixta);
        
        enviarVenta(ventaRequest);
    }

    const enviarVenta = async(ventaRequest: VentaRequestDTO) => {
        try{
            const response = await fetch("http://localhost:8080/ventas/registrarVenta",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(ventaRequest)
            });
            if(!response.ok){
                const errorMsg = await response.json();
                console.log(errorMsg)
                return
            }
            const ventaGuardada = await response.json();

            setVentaLocal(ventaInicial);
            setVentasRealizadas(prev => prev + 1);

            console.log("Venta guardada:", ventaGuardada);//para futuro ticket
        }
        catch(error){
            toast.error("No se pudo concretar la venta");
        }
    }

    const cerrarTurno = () => {
        if(VentaLocal.items.length > 0){
            toast.error("Termine la venta para cerrar el turno");
            return;
        }

        window.electronAPI.openTurnoModal();
    }

    useEffect(() => {
        const handler = (pagos: PagoDTO[]) => {
            confirmarPagoMixto(pagos);
        };

        window.electronAPI.onPagoMixtoConfirmado(handler);

        return () => {
            window.electronAPI.offPagoMixtoConfirmado(handler);
        };
    }, []);

    useEffect(() => {
        //lee el turno cuando abre el componente
        window.electronAPI.getTurnoActual().then((t) => {
            if (t) setTurno(t);
        });

        const handler = (t: TurnoLocal) => {
            setTurno(t);
        };

        //listener de turnoModal
        window.electronAPI.onTurnoIniciado(handler);

        return () => {
            window.electronAPI.offTurnoIniciado(handler);
        };
    }, []);




    return(
        <div className={styles.pageContainer}>
            <div></div>
            <BarraCargarProducto filtrarProductos={buscarProductos} consultaProducto={consultaProducto} onProductoSeleccionado={handleAgregarProducto}
                resetSignal={ventasRealizadas} onProductoManual={handleProductoManual}/>
            <div className={styles.infoContainer}>

                <ListaProdVenta items={VentaLocal.items} onSumar={actualizarCantItem} 
                onRestar={actualizarCantItem} onEliminar={actualizarCantItem}/>
                <TotalVenta total={total} onMedioPago={setFormaPago} resetSignal={ventasRealizadas}/>
            </div>
            <OpcionesCaja onFinalizarVenta={finalizarVenta} onCerrarTurno={cerrarTurno}/>
        </div>
    )
}