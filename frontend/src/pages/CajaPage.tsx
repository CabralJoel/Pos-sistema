import BarraCargarProducto from "../components/caja/BarraCargarProducto"
import ListaProdVenta from "../components/caja/ListaProdVentas"
import TotalVenta from "../components/caja/TotalVenta"
import OpcionesCaja from "../components/caja/OpcionesCaja"
import {toast } from "react-toastify";

import { crearItemManual, mapVentaRequest } from "../hooks/useCreacionVentaTypes"
import { buscarProductos} from "../service/producto.service";

import { useEffect, useMemo, useState,useRef } from "react"

import type { ProductoResponseDTO } from "../types/producto"
import { MedioPago, type VentaLocal,type VentaRequestDTO,type PagoDTO, type TurnoLocal, type ResumenVentaTurnoLocal, type ResumenVentaLocal, type VentaResponseDTO, EstadoVenta } from "../types/ventas"

import styles from "../styles/cajaPage/CajaPage.module.css"
import BarraUsuario from "../components/caja/BarraUsuario";
import BarraNavegacionCaja from "../components/caja/BarraNavegacionCaja";


export default function CajaPage(){
    const ventaInicial = (): VentaLocal => ({
        items:[],
        mediosDePago: []
    })

    const [formaPago,setFormaPago] = useState<MedioPago>("EFECTIVO");
    const [ventaLocal,setVentaLocal] = useState<VentaLocal>(ventaInicial());
    const [ventasRealizadas,setVentasRealizadas] = useState(0);
    const [turno,setTurno] = useState<TurnoLocal|null>(null);
    const [resumenTurno,setResumenTurno] = useState<ResumenVentaTurnoLocal|null>(null)
    const [mostratResumen,setMostrarResumen] = useState(false);

    const ventaRef = useRef<VentaLocal>(ventaInicial());
    useEffect(() => {
        ventaRef.current = ventaLocal;
    }, [ventaLocal]);
    
    const turnoRef = useRef<TurnoLocal | null>(null);
    useEffect(() => {
        turnoRef.current = turno;
    }, [turno]);
    const enviandoVentaRef = useRef(false);


    const total = useMemo(() => {
        return ventaLocal.items.reduce((suma,item) =>
            suma + item.subtotal,0);
    },[ventaLocal.items]);

    const agregarVentaAResumen = (venta:VentaResponseDTO) => {
        setResumenTurno(prev => {
            if(!prev)return prev;
            if(venta.estado === "ANULADA")return prev;

            return{...prev,
                cantVentasConfirmadas:prev.cantVentasConfirmadas + 1,
                total:prev.total + venta.total,
                ventas:[
                    ...prev.ventas,
                    {
                        idVenta:venta.id,
                        fechaCreacion:venta.fechaCreacion,
                        total:venta.total,
                        estado:venta.estado
                    }
                ]
            }
        })
    }

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

    const handleProductoManual = (monto:number) => {//AGREGA UN ITEM SIN PRODUCTO 
        setVentaLocal(venta => ({
            ...venta,
            items: [...venta.items,crearItemManual(monto)]
        }))
    }

    const actualizarCantItem = (itemId:string,nuevaCantidad:number) => {//AUMENTE O DISMINUYE LA CANTIDAD DE UN ITEM
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
        if(ventaLocal.items.length === 0){
            toast.error("No hay productos cargados");
            return;
        }

        if(formaPago === "MIXTO"){
            window.electronAPI.openPagoMixto(total)
            return;
        }

        const ventaSimple: VentaLocal = {
            ...ventaLocal,
            mediosDePago:[{
                tipoPago: formaPago,
                monto: total
            }]
        }

        const ventaRequest = mapVentaRequest(ventaSimple);

        enviarVenta(ventaRequest);
    }

    const confirmarPagoMixto = async(pagos:PagoDTO[]) => {
        if (enviandoVentaRef.current) return;
        enviandoVentaRef.current = true;

        const turnoActual = turnoRef.current;

        if (!turnoActual) {
            toast.error("No hay turno activo");
            enviandoVentaRef.current = false;
            return;
        }

        const ventaMixta: VentaLocal = {
            ...ventaRef.current,
            mediosDePago:pagos
        }
        
        const ventaRequest = mapVentaRequest(ventaMixta);
        const ok = await enviarVenta(ventaRequest, turnoActual);

        window.electronAPI.ventaMixtaResultado({ ok });
        enviandoVentaRef.current = false;
    }

    const enviarVenta = async(ventaRequest: VentaRequestDTO, turnoActual?: TurnoLocal): Promise<boolean> => {
        const turnoAUsar = turnoActual ?? turnoRef.current;
        
        if(!turnoAUsar){
            toast.error("no hay turno activo");
            return false;
        }
        try{
            const response = await fetch(`http://localhost:8080/ventas/${turnoAUsar.idTurno}/registrarVenta`,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(ventaRequest)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg)
                return false;
            }
            const ventaGuardada:VentaResponseDTO = await response.json();
            
            agregarVentaAResumen(ventaGuardada);
            setVentaLocal(ventaInicial);
            setVentasRealizadas(prev => prev + 1);

            console.log("Venta guardada:", ventaGuardada);//para futuro ticket
            return true;
        }
        catch(error){
            toast.error("No se pudo concretar la venta");
            return false;
        }
    }
    

    const cerrarTurno = () => {//ABRE LA VENTANA MODAL DE CIERRE DE TURNO
        if(ventaLocal.items.length > 0){
            toast.error("Termine la venta para cerrar el turno");
            return;
        }

        window.electronAPI.openTurnoModal();
    }

    const handleResumenTurno = async (idTurno:number) => {//FETCH PARA OBTENER RESUMEN DE TURNO
        try{
            const response = await fetch(`http://localhost:8080/turno/resumen/${idTurno}`);

            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return;
            }

            const resumenResponse = await response.json();
            setResumenTurno(resumenResponse);
        }
        catch(error){
            toast.error("No se pudo obtener el resumen del turno");
        }
    }

    //SETEA O HACE FETCH CUADO CAMBIA EL TURNO
    useEffect(()=>{
        if(turno){
            handleResumenTurno(turno.idTurno)
        }else{
            setResumenTurno(null);
        }
    },[turno]);

    //LEE EL TURNO DE MAIN CUANDO SE ABRE EL COMPONENTE
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

    //RECIBE LA LISTA DE METODOS DE PAGOS Y CIERRA LA VENTA MIXTA
    useEffect(() => {
        const handler = (pagos: PagoDTO[]) => {
            confirmarPagoMixto(pagos);
        };

        window.electronAPI.onPagoMixtoConfirmado(handler);

        return () => {
            window.electronAPI.offPagoMixtoConfirmado(handler);
        };
    }, []);

    return(
        <div className={styles.pageContainer}>
            <BarraNavegacionCaja/>
            <div className={styles.cajaContainer}>
                <BarraUsuario usuario={turno?.cajero}/>
                <div className={styles.cobroContainer}>
                    <BarraCargarProducto filtrarProductos={buscarProductos} consultaProducto={consultaProducto} onProductoSeleccionado={handleAgregarProducto}
                        resetSignal={ventasRealizadas} onProductoManual={handleProductoManual}/>
                    <div className={styles.infoContainer}>

                        <ListaProdVenta items={ventaLocal.items} onSumar={actualizarCantItem} 
                        onRestar={actualizarCantItem} onEliminar={actualizarCantItem}/>
                        <TotalVenta total={total} onMedioPago={setFormaPago} resetSignal={ventasRealizadas} resumenTurno={resumenTurno}
                        mostrarResumen={mostratResumen} />
                    </div>
                    <OpcionesCaja onFinalizarVenta={finalizarVenta} onCerrarTurno={cerrarTurno} 
                    onMostrarResumen={()=>setMostrarResumen(prev=>!prev)}/>
                </div>
            </div>
        </div>
    )
}