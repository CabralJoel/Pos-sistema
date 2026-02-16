import { useEffect, useState } from "react"

import styles from "../../styles/cajaPage/TotalVenta.module.css"
import { NumberInput } from "../NumberInput"
import { MedioPago, type ResumenVentaTurnoLocal } from "../../types/ventas";
import ResumenVentas from "./ReumenVentas";

interface Props{
    total:number;
    onMedioPago:(MedioPago:MedioPago) => void,
    resetSignal: number;
    resumenTurno:ResumenVentaTurnoLocal|null;
    mostrarResumen:boolean;
}

export default function TotalVenta({total,onMedioPago,resetSignal,resumenTurno,mostrarResumen}:Props){
    const [efectivo,setEfectivo] = useState("");

    const efectivoNum = parseFloat(efectivo)||0
    const cambio = Math.max(0,efectivoNum - total);

    const [medioPago,setMedioPago] = useState<MedioPago>(MedioPago.EFECTIVO);
    const [resumenVisible,setResumenVisible] = useState(false);

    useEffect(()=>{
        if(!mostrarResumen){
            setTimeout(()=>{
                setResumenVisible(false);
            },300)
            
        }else{
            setResumenVisible(true);
        }
        
    },[mostrarResumen]);

    useEffect(() => {
        setEfectivo("");
        setMedioPago(MedioPago.EFECTIVO);
    },[resetSignal])

    return(
        <div className={styles.totalContainer}>
            {resumenVisible && (<ResumenVentas resumenVentas={resumenTurno} visible={mostrarResumen}/>)}
            <div className={styles.pagoButtonsContainer}>
                <button className={medioPago === MedioPago.EFECTIVO ? styles.botonPresionado: undefined} 
                onClick={() => {onMedioPago("EFECTIVO");
                setMedioPago(MedioPago.EFECTIVO)}}>Efectivo</button>

                <button className={medioPago === MedioPago.TRANSFERENCIA ? styles.botonPresionado: undefined} 
                onClick={() => {onMedioPago("TRANSFERENCIA");
                setMedioPago(MedioPago.TRANSFERENCIA)}}>Transferencia</button>

                <button className={medioPago === MedioPago.CREDITO ? styles.botonPresionado: undefined} 
                onClick={() => {onMedioPago("CREDITO");
                setMedioPago(MedioPago.CREDITO)}}>Credito</button>

                <button className={medioPago === MedioPago.DEBITO ? styles.botonPresionado: undefined} 
                onClick={() => {onMedioPago("DEBITO");
                setMedioPago(MedioPago.DEBITO)}}>Debito</button>

                <button className={medioPago === MedioPago.MIXTO ? styles.botonPresionado: undefined} 
                onClick={() => {onMedioPago("MIXTO");
                setMedioPago(MedioPago.MIXTO)}}>Mixto</button>

            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}} >
                <NumberInput style={{width:"10em",padding:"8px",fontSize:"large",alignSelf:"flex-end"}} placeholder="Efectivo"
                value={efectivo}
                onChange={(e)=> setEfectivo(e.target.value)}/>

                <div className={styles.montoContainer}>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                        <span>TOTAL</span>
                        <span style={{display:"flex",minWidth:"170px"}}>
                            <span className={styles.simbolo}>$</span>
                            <span className={styles.value}>{total.toFixed(2)}</span>
                        </span>
                        
                    </div>
                    
                    <div style={{display:"flex",justifyContent:"space-evenly",fontSize:"x-large"}}>
                        <span >Cambio:</span>
                        <span style={{minWidth:"160px"}}>
                            <span className={styles.simbolo}>$</span>
                            <span className={styles.value}>{cambio.toFixed(2)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}