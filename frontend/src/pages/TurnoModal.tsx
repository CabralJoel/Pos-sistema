import React, { useState, type ReactElement } from "react"

import turnoStyle from "../styles/cajaPage/TurnoModal.module.css"
import { NumberInput } from "../components/NumberInput";
import { toast } from "react-toastify";
import type { TurnoDTO, usuarioLocal } from "../types/ventas";

interface UserForm{
    nombre:string,
    password:string
}
//TODO CAMBIAR TOAST ERRORS POR TECTOS ROJOS ABSOLUTES
//TODO agregar cerrar caja
export default function(){
    const [edit,setEdit] = useState<boolean>(true);
    const [efectivo,setEfectivo] = useState("");
    const [cajero,setCajero] = useState<usuarioLocal|undefined>({
        idUsuario:5,
        nombre:"lolo",
        rol:"ADMIN"
    });
    const efectivoNum = parseFloat(efectivo)||0;//pasamos efectivo a number
    const [formData,setFormData] = useState<UserForm>({
        nombre: "",
        password: ""
    });

    const handleEditMode = () => {
        setEdit(!edit);
        resetUserForm();
    }
    const resetUserForm = () => {
        setFormData({
        nombre: "",
        password: ""
    })
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLoguearCajero = async() => {
        if(formData.nombre === "" || formData.password === ""){
            toast.error("Ingrese usuario y contraseña");
            return;
        }
        try{
            const response = await fetch("http://localhost:8080/usuario/findCajero",
                {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            })
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return;
            }
            const user = await response.json();
            setCajero(user);

            handleEditMode();
        }
        catch(error){
            toast.error("Error al buscar usuario")
        }
    }

    const InicioTurno = async() => {
        if(cajero===undefined){
            toast.error("Seleccione un usuario para el turno");
            return;
        }
        if(efectivo === ""){
            toast.error("Ingrese efectivo inicial");
            return
        }
        const turnoDto: TurnoDTO = {
            idCajero:cajero.idUsuario,
            efectivoInicial:efectivoNum
        };

        try{
            const response = await fetch("http://localhost:8080/turno",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(turnoDto)
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
        catch(error){
            toast.error("Error al iniciar el Turno")
        }
    }

    return(
        <div className={turnoStyle.modalTurnoContainer}>
            <span style={{backgroundColor:"rgb(173, 167, 167)",padding:"0.3em"}}>Cajero del Turno</span>
            {edit && (
                <div className={turnoStyle.usuarioContainer}>
                    <div className={turnoStyle.inputContainer}>
                        <input name="nombre" value={formData?.nombre} onChange={handleChange} type="text" placeholder="Usuario"/>
                        <input name="password" value={formData?.password} onChange={handleChange} type="password" placeholder="Contraseña"/>
                    </div>
                    <div style={{display:"flex",gap:"1em"}}>
                        {cajero!==undefined && (
                            <button onClick={handleEditMode}>Cancelar</button>
                        )}
                        <button onClick={handleLoguearCajero}>Seleccionar Cajero</button>
                    </div>
                    
                </div>
            )}
            {!edit && cajero!== undefined && (
                <div style={{display:"flex",flex:"0.5",justifyContent:"center",alignItems:"center",gap:"1em"}}>
                    <span>Cajero:</span>
                    <span style={{textTransform:"uppercase"}}>{cajero.nombre}</span>
                    <button onClick={handleEditMode}>Cambiar Usuario</button>
                </div>
            )}
            
            <div className={turnoStyle.efectivoContainer}>
                <span>EFECTIVO: $</span>
                <NumberInput value={efectivo} onChange={(e)=> setEfectivo(e.target.value)} placeholder="Efectivo en Caja"/>
            </div>
            <div className={turnoStyle.buttonContainer}>
                <button>Cerrar Caja</button>
                <button onClick={InicioTurno}>Iniciar Turno</button>
            </div>
        </div>
    )
}