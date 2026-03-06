import { useEffect, useState } from "react"
import { NumberInput } from "../components/NumberInput"
import styles from "../styles/MovimientoCajaModal.module.css"
import type { movimientoRequestDTO, TurnoLocal } from "../types/ventas";

import { useValidator } from "../hooks/useValidator";
import { mayorACero } from "../utils/validaciones";

export default function MovimientoCajaModal(){
    const [formData,setFormData] = useState<movimientoRequestDTO>({
        tipo:"",
        concepto:"",
        monto:"",
        descripcion:""
    });
    const [turno,setTurno] = useState<TurnoLocal|null>(null);
    const [guardando,setGuardando] = useState(false);
    const [error,setError] = useState("");
    const { validate } = useValidator<number>();

    const validarForm = ():boolean=>{
        
        if(formData.concepto==="" || formData.monto==="" || formData.descripcion===""){
            setError("Complete los campos faltantes");
            return false;
        }
        if(formData.concepto==="AJUSTE" && !formData.tipo){
            setError("Falta seleccionar el tipo de ajuste");
            return false;
        }
        const montoVal = validate(Number(formData.monto), [
            mayorACero("El Monto")
        ]);

        if (!montoVal.ok) {
            setError(montoVal.errors[0]);
            return false;
        }
        return true;
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement| HTMLSelectElement>) =>{
            const {name, value} = e.target;
            setFormData((prev) => {
                const updated = {...prev,[name]:value} ;
                if(name === "concepto" && value !== "AJUSTE"){
                    updated.tipo = "";
                }
                return updated;
            });
        };

    //agregar errores sin toast
    const handleGuardar = async () => {
        if(guardando){return}
        
        if(!turno){
            setError("No existe turno abierto");
            return;
        }
        if(!validarForm())return;

        setGuardando(true);
        const dto:movimientoRequestDTO = {
            concepto:formData.concepto,
            monto:formData.monto,
            descripcion:formData.descripcion
        }
        if(formData.concepto==="AJUSTE"){
            dto.tipo = formData.tipo;
        }
        try{
            const response = await fetch(`http://localhost:8080/turno/${turno.idTurno}/crearMovimiento`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(dto)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                setError(errorMsg);
                return;
            }
            window.close();
        }
        catch(error){
            setError("Hubo un error al crear el movimiento");
        }finally{setGuardando(false);}
    }


    useEffect(()=>{
        const fetchTurno = async () => {
            const turnoActual = await window.electronAPI.getTurnoActual();
            setTurno(turnoActual);
        };

        fetchTurno();
    },[]);

    useEffect(()=>{
        const handleKeyDown = (e:KeyboardEvent)=>{
            if(e.key === "Escape"){
                window.close();
            }
        };
            window.addEventListener("keydown",handleKeyDown);

            return () => {window.removeEventListener("keydown",handleKeyDown);}
        
    },[]);

    return(
        <div className={styles.modalContainer}>
            <h1 style={{fontSize:"xx-large",margin:"0",color:"black"}}>Movimiento de Caja</h1>
            <div className={styles.infoContainer}>
                <div className={styles.selectContainer}>
                    <select name="concepto" value={formData.concepto} onChange={handleChange}>
                        <option value="" disabled>Seleccionar Concepto</option>
                        <option value="INGRESO_MANUAL">Ingreso Manual</option>
                        <option value="GASTO">Gasto</option>
                        <option value="RETIRO">Retiro</option>
                        <option value="PAGO_PROVEEDOR">Pago Proveedor</option>
                        <option value="DEVOLUCION">Devolucion</option>
                        <option value="AJUSTE">Ajuste</option>
                    </select>
                    {formData.concepto==="AJUSTE" && (
                        <select name="tipo" value={formData.tipo} onChange={handleChange}>
                            <option value="" disabled>Seleccionar Concepto</option>
                            <option value="INGRESO">Ingreso</option>
                            <option value="EGRESO">Egreso</option>
                        </select>
                    )}
                </div>
                <label style={{display:"flex",gap:"12px",padding:"0 1.4em"}}>Efectivo: 
                    <NumberInput name="monto" value={formData.monto} onChange={handleChange} placeholder="Monto"/>
                </label>
                <label style={{display:"flex",flexDirection:"column"}}>Descripción:
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
                </label>
                {error!=="" && (
                        <p style={{position:"absolute",top:"91%",color:"rgb(209, 43, 43)",alignSelf:"center"}}>{error}</p>
                    )}
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={()=>window.close()}>Cancelar</button>
                <button onClick={handleGuardar}>Guardar</button>
            </div>
        </div>
    )
}