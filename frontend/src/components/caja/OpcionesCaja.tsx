import opsCajaStyle from "../../styles/cajaPage/OpcionesCaja.module.css";

interface Props{
    onFinalizarVenta: () => void,
    onCerrarTurno: () => void,
    onMostrarResumen:() =>void,
}

export default function OpcionesCaja({onFinalizarVenta,onCerrarTurno,onMostrarResumen}:Props){
    return(
        <div className={opsCajaStyle.optionsButtonContainer}>
            <div style={{display:"flex",gap:"12px"}}>
                <button style={{minWidth:"12em"}}>Cerrar caja</button>
                <button style={{minWidth:"12em"}} onClick={onCerrarTurno}>Cerrar turno</button>
                <button style={{minWidth:"12em"}} onClick={onMostrarResumen}>Ventas realizadas</button>
            </div>
            <div>
                <button style={{minWidth:"12em"}} onClick={() => onFinalizarVenta()}>Finalizar venta</button>
            </div>
        </div>
    )
}

