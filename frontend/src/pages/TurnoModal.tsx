import React, { useEffect, useState, type ReactElement } from "react"

import turnoStyle from "../styles/turnoModal/TurnoModal.module.css"
import { NumberInput } from "../components/NumberInput";
import { toast } from "react-toastify";
import {type TurnoLocal, type TurnoDTO, type usuarioLocal } from "../types/ventas";
import TurnoInicio from "../components/turno/TurnoInicio";
import TurnoCierre from "../components/turno/TurnoCierre";

type ModoTurno = "INICIO"|"CIERRE";
//TODO CAMBIAR TOAST ERRORS POR TECTOS ROJOS ABSOLUTES
//TODO agregar cerrar caja
export default function TurnoModal(){
    const [modo,setModo] = useState<ModoTurno>("INICIO");
    const [turno,setTurno] = useState<TurnoLocal|null>(null);


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

    useEffect(() => {
        window.electronAPI.getTurnoActual().then((turnoActual) => {
            if(turnoActual){
                setTurno(turnoActual);
                setModo("CIERRE");
            }else{
                setModo("INICIO");
            }
        })
    },[]);

    return(
        <div>
            {modo==="INICIO" && (
            <TurnoInicio onCrearTurno={InicioTurno}/>
        )}
        {modo==="CIERRE" && (
            <TurnoCierre/>
        )}
        </div>

    )
}