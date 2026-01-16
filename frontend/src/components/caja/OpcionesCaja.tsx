import opsCajaStyle from "../../styles/cajaPage/OpcionesCaja.module.css";

export default function OpcionesCaja(){
    return(
        <div className={opsCajaStyle.optionsButtonContainer}>
            <div style={{display:"flex",gap:"12px"}}>
                <button style={{minWidth:"12em"}}>Cerrar caja</button>
                <button style={{minWidth:"12em"}}>Cerrar turno</button>
                <button style={{minWidth:"12em"}}>Ventas realizadas</button>
            </div>
            <div>
                <button style={{minWidth:"12em"}}>Finalizar venta</button>
            </div>
        </div>
    )
}

