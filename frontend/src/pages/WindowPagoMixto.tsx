import { useEffect, useState } from "react";
import modalStyle from "../styles/cajaPage/ModalPagoMixto.module.css"

import { MedioPago, type PagoDTO } from "../types/ventas";
import { toast } from "react-toastify";
import { NumberInput } from "../components/NumberInput";


export default function WindowPagoMixto(){
    const [total, setTotal] = useState<number>(0);
    const [pagos,setPagos] = useState<PagoDTO[]>([]);
    const totalPagos = pagos.reduce((suma, pago) => suma + pago.monto,0);
    const montoFaltante = total - totalPagos;

    const [medioSeleccionado,setMedioSeleccionado] = useState<MedioPago| null>(null);
    const [montoActual, setMontoActual] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const totalParam = params.get("total");

        if (totalParam) {
        setTotal(Number(totalParam));
        }
    }, []);

    const reinicioComponente = () => {
        setPagos([]);
        setMontoActual("");
        setMedioSeleccionado(null);
    }

    const agregarPago = () => {
        if(!medioSeleccionado){return;}

        const monto = Number(montoActual);
        
        if(!monto||monto <= 0){return;}
        if(montoFaltante-monto <0){return;}

        setPagos(prev => [
            ...prev,
            { tipoPago: medioSeleccionado, monto },
        ]);

        setMontoActual("");
    }

    const eliminarPago = (index: number) => {
        setPagos(pagos => pagos.filter((_, i) => i !== index));
    };

    const confirmarPago = () => {
        if(totalPagos !== total){
            toast.error("Los montos abonado debe coincidir con el total de la venta");
            return;
        }
        if(pagos.length <= 1){
            toast.error("Seleccione almenos 2 medios de pago");
            return;
        }
        window.electronAPI.confirmarPagoMixto(pagos);
        reinicioComponente();
        window.close();
    }

    
    const cancelar = () => {
        reinicioComponente();
        window.close();
    }

    return(
        <div className={modalStyle.modalContainer}>
            <div className={modalStyle.selectContainer}>
                <div className={modalStyle.totalContainer}>
                    <span>Total Faltante</span>
                    <span>${montoFaltante.toFixed(2)}</span>
                </div>
                <div className={modalStyle.infoPagoContainer}>
                    <select className={modalStyle.pagosSelect} value={medioSeleccionado ?? ""} onChange={e => setMedioSeleccionado(e.target.value as MedioPago)}>
                        <option value="" disabled>Seleccionar pago</option>
                        <option value="EFECTIVO">Efectivo</option>
                        <option value="TRANSFERENCIA">Transferencia</option>
                        <option value="DEBITO">Débito</option>
                        <option value="CREDITO">Crédito</option>
                    </select>

                    <NumberInput className={modalStyle.inputMonto} value={montoActual} 
                    onChange={e => setMontoActual(e.target.value)} min={0} placeholder="Monto"
                    onKeyDown={(e) => {if (e.key === 'Enter') {
                                        e.preventDefault
                                        agregarPago()
                                        }
                                    }}/>
                </div>

                <button style={{height:"40px"}} onClick={agregarPago}>Agregar</button>
            </div>

            <div className={modalStyle.pagosContainer}>
                {pagos.map((p,i)=>(
                    <div key={i} className={modalStyle.itemPago} >
                        <span>{p.tipoPago}</span>
                        <span>${p.monto.toFixed(2)}</span>
                        <button className={modalStyle.deleteButton} onClick={() => eliminarPago(i)}>X</button>
                    </div>
                ))}
            </div>

            <div className={modalStyle.buttonsContainer}>
                <span style={{borderRadius:"5px",padding:"10px"}}>TOTAL: ${total.toFixed(2)}</span>
                <div style={{display:"flex",gap:"20px"}}>
                    <button onClick={cancelar}
                    >Cancelar</button>

                    <button onClick={confirmarPago}>Confirmar Pagos</button>
                </div>
            </div>
        </div>
    )
}