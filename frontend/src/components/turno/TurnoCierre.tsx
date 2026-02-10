import { useState } from "react";
import turnoStyle from "../../styles/turnoModal/TurnoModal.module.css"

import { NumberInput } from "../NumberInput";
import { toast } from "react-toastify";
import {type TurnoCierreDTO, type TurnoDetalle, type TurnoLocal } from "../../types/ventas";

interface Props{
    turno: TurnoLocal,
    onCierreTurno:(dto:TurnoCierreDTO) => Promise<TurnoDetalle|null>, 
    onFinalizarCierre:()=>void,
}



export default function TurnoCierre({turno,onCierreTurno,onFinalizarCierre}:Props){
    const [efectivo,setEfectivo] = useState("");
    const efectivoNum = parseFloat(efectivo)||0;//pasamos efectivo a number
    const [turnoDetalle,setTurnoDetalle] = useState<TurnoDetalle|null>({
        idTurno:1,
        cajero:turno.cajero,
        efectivoInicial:100,
        efectivoFinal:200,
        diferencia:100,
        estado:"CERRADO"
    }); 

    const handleReset = ()=>{
        setTurnoDetalle(null);
        setEfectivo("");
    }

    const handleInprimirTicketTurno = () => {
        //funcion que imprime el ticket
        onFinalizarCierre();
    }

    const handleCerrarTurno = async ()=>{
        if(efectivo === "" || efectivoNum<0){
            toast.error("Ingrese el efectivo en caja");
            return;
        }

        const turnoDto: TurnoCierreDTO = {
                idTurno:turno.idTurno,
                efectivoFinal:efectivoNum,
            };

        try{
            const turnoCerrado = onCierreTurno(turnoDto);
            if(!turnoCerrado)return;
        }
        catch(error){
            toast.error("Hubo un error al cerrar el turno");
        }
    }


    return (
        <div className={turnoStyle.modalTurnoContainer}>
            <span style={{backgroundColor:"rgb(173, 167, 167)",padding:"0.3em"}}>Cierre de Turno</span>
            <div style={{display:"flex",flex:"0.5",justifyContent:"center",alignItems:"center",gap:"1em"}}>
                <span>Cajero:</span>
                <span style={{textTransform:"uppercase"}}>{turno.cajero.nombre}</span>
            </div>
            {turnoDetalle === null && (
                <div style={{display:"flex",flexDirection:"column",flex:"1"}}>
                    <div className={turnoStyle.efectivoContainer}>
                        <div>
                            <span>EFECTIVO: $ </span>
                            <NumberInput value={efectivo} onChange={(e)=> setEfectivo(e.target.value)} placeholder="Efectivo en Caja"/>
                        </div>
                    </div>
                    <div className={turnoStyle.buttonContainer}>
                        <button onClick={handleCerrarTurno}>Cerrar Turno</button>
                    </div>
                </div>
            )}
            {turnoDetalle !== null && (
                <div style={{display:"flex",flexDirection:"column",flex:"1",justifyContent:"space-around"}}>
                    <div style={{display: "grid",gridTemplateColumns: "280px auto",rowGap: "10px",paddingLeft: "20px"}}>
                        <span>Efectivo Inicial:</span>
                        <span>$ {turnoDetalle.efectivoInicial}</span>

                        <span>Efectivo Final:</span>
                        <span>$ {turnoDetalle.efectivoFinal}</span>

                        <span>Diferencia:</span>
                        <span>$ {turnoDetalle.diferencia}</span>
                    </div>
                    
                    <button style={{alignSelf:"center"}} onClick={handleInprimirTicketTurno} >Imprimir Ticket</button>
                </div>
            )}
        </div>
    )
}