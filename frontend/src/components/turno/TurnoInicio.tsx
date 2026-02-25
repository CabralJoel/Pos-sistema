import { useState } from "react";

import turnoStyle from "../../styles/turnoModal/TurnoModal.module.css"
import type { TurnoDTO, usuarioLocal } from "../../types/ventas";
import { NumberInput } from "../NumberInput";
import { toast } from "react-toastify";

interface UserForm{
    nombre:string,
    password:string
}

interface Props{
    usuario:usuarioLocal,
    onCrearTurno:(dto:TurnoDTO)=>Promise<void>
}

export default function TurnoInicio({usuario,onCrearTurno}:Props){
    const [edit,setEdit] = useState<boolean>(false);
    const [efectivo,setEfectivo] = useState("");
    const efectivoNum = parseFloat(efectivo)||0;//pasamos efectivo a number
    const [cajero,setCajero] = useState<usuarioLocal>(usuario);
    const [formData,setFormData] = useState<UserForm>({
            nombre: "",
            password: ""
        });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

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

    const handleLoguearCajero = async() => {
        if(formData.nombre === "" || formData.password === ""){
            toast.error("Ingrese usuario y contraseña");
            return;
        }
        try{
            const response = await fetch("http://localhost:8080/usuario/login/turno",
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
        if(cajero===null){
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
            await onCrearTurno(turnoDto);
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
                        {cajero!==null && (
                            <button onClick={handleEditMode}>Cancelar</button>
                        )}
                        <button onClick={handleLoguearCajero}>Seleccionar Cajero</button>
                    </div>
                    
                </div>
            )}
            {!edit && cajero!== null && (
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
    );
}