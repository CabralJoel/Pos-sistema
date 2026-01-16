import { useState } from "react"

import styles from "../../styles/cajaPage/TotalVenta.module.css"
import { NumberInput } from "../NumberInput"


export default function TotalVenta(){
    const [efectivo,setEfectivo] = useState("");
    const total = 1250;

    const efectivoNum = parseFloat(efectivo)||0
    const cambio = Math.max(0,efectivoNum - total);

    return(
        <div className={styles.totalContainer}>
            <div className={styles.pagoButtonsContainer}>
                <button>Efectivo</button>
                <button>Transferencia</button>
                <button>Credito</button>
                <button>Debito</button>
                <button>Mixto</button>
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