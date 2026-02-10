import React, { useEffect, useState, type ReactElement } from "react"

import turnoStyle from "../styles/turnoModal/TurnoModal.module.css"
import { NumberInput } from "../components/NumberInput";
import { toast } from "react-toastify";
import {type TurnoLocal, type TurnoDTO, type usuarioLocal, type TurnoCierreDTO, type TurnoDetalle } from "../types/ventas";
import TurnoInicio from "../components/turno/TurnoInicio";
import TurnoCierre from "../components/turno/TurnoCierre";

type ModoTurno = "INICIO"|"CIERRE";
//TODO CAMBIAR TOAST ERRORS POR TECTOS ROJOS ABSOLUTES
//TODO agregar cerrar caja
export default function TurnoModal(){
    const [modo,setModo] = useState<ModoTurno>("INICIO");
    const [turno,setTurno] = useState<TurnoLocal|null>(null);
    const [cajero,setCajero] = useState<usuarioLocal|null>(null);


    const InicioTurno = async(dto:TurnoDTO) => {
            const response = await fetch("http://localhost:8080/turno",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(dto)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return;
            }
            const turno = await response.json();
            await window.electronAPI.confirmarTurno(turno);
            window.close();
    }

    const cierreTurno = async(dto:TurnoCierreDTO):Promise<TurnoDetalle|null> => {
        const response = await fetch("http://localhost:8080/turno/cierreTurno",{
                method: "PATCH",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(dto)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return null;
            }
            const turnoDetalle = await response.json();
            await window.electronAPI.cerrarTurno();

            return turnoDetalle;
    }

    const finalizarCierre = () => {
        if(turno){
            setCajero(turno.cajero);
        }
        setTurno(null);
        setModo("INICIO");
    }

    useEffect(() => {
        window.electronAPI.getTurnoActual().then((turnoActual) => {
            if(turnoActual){
                setTurno(turnoActual);
                setCajero(turnoActual.cajero);
                setModo("CIERRE");
            }else{
                setModo("INICIO");
            }
        })
    },[]);

    return(
        <div style={{height:"100%", width:"100%"}}>
            {modo==="INICIO" && (
            <TurnoInicio usuario={cajero} onCrearTurno={InicioTurno}/>
        )}
        {modo==="CIERRE" && turno && (
            <TurnoCierre turno={turno} onCierreTurno={cierreTurno} onFinalizarCierre={finalizarCierre}/>
        )}
        </div>

    )
}