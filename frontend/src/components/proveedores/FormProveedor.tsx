import React, { useEffect, useState } from "react";
import formStyles from "../../styles/proveedoresPage/FormProveedor.module.css";
import type { ProveedorDTO,ProveedorResponse } from "../../types/proveedor";

import { useValidator } from "../../hooks/useValidator";
import { isNotEmpty,maxLength } from "../../utils/validaciones";
import {toast} from "react-toastify";

interface formProv{
    mode:"nuevo"|"edicion",
    proveedor?:ProveedorResponse,
    onSubmit:(proveedor:ProveedorDTO)=>void,
    onCancel?:()=>void
}

const emptyForm: ProveedorDTO = {
                code:"",
                cuit:"",
                nombre:"",
                localidad:"",
                direccion:"",
                email:"",
                telefono:"",
                descripcion:"",
            };


const validaciones = {
    code:[isNotEmpty("Codigo"),maxLength("Codigo",20)],
    cuit:[isNotEmpty("Cuit"),maxLength("Cuit",15)],
    nombre:[isNotEmpty("Nombre"),maxLength("Nombre",50)],
    localidad:[isNotEmpty("Localidad"),maxLength("Localidad",40)],
    direccion:[isNotEmpty("Direccion"),maxLength("Direccion",70)],
    email:[isNotEmpty("Email"),maxLength("Email",50)],
    telefono:[isNotEmpty("Telefono"),maxLength("Telefono",20)],
    descripcion:[maxLength("Descripcion",255)],
}

export default function FormProveedor({mode,proveedor,onSubmit,onCancel}:formProv){
        const [formData,setFormData] = useState<ProveedorDTO>(emptyForm);
        const { validate } = useValidator<any>();

        useEffect(()=>{
            if(mode === "edicion"&& proveedor){
                setFormData({
                    code: proveedor.code,
                    cuit: proveedor.cuit,
                    nombre: proveedor.nombre,
                    localidad: proveedor.localidad,
                    direccion: proveedor.direccion,
                    email: proveedor.email,
                    telefono: proveedor.telefono,
                    descripcion: proveedor.descripcion,
                })
            }else{
                setFormData(emptyForm);
            }
        },[mode,proveedor]);

        const handleChange = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
            const {name, value} = e.target;
            
            setFormData((prev) => ({
                ...prev,[name]:value
            }));
        };
//TODO: agregar validaciones
        const handleSubmit = (e:React.FormEvent)=>{
            e.preventDefault();

            for(const campo in validaciones){
                const validators = validaciones[campo as keyof ProveedorDTO];
                const value = formData[campo as keyof ProveedorDTO];

                const result = validate(value, validators);

                if (!result.ok) {
                    toast.error(result.errors[0]);
                    return;
                }
            }

            onSubmit(formData);
        }
//TODO:cambiar diseño del front, colores
        return(
                <form className={formStyles.proveedorForm} onSubmit={handleSubmit}>
                    <h2>Complete los datos del proveedor</h2>

                    <div className={formStyles.labelContainer}>
                        <label>Codigo
                            <input type="text" placeholder="Codigo" name="code" value={formData.code} onChange={handleChange}/>
                        </label>
                        <label>CUIT
                            <input type="text" placeholder="CUIT " name="cuit" value={formData.cuit} onChange={handleChange}/>
                        </label>
                        
                    </div>

                    <label>Razon Social
                        <input type="text" placeholder="Nombre" name="nombre"value={formData.nombre}onChange={handleChange}/>
                    </label>
                    
                    
                    <div className={formStyles.labelContainer}>
                        <label>Localidad
                            <input type="text" placeholder="Localidad" name="localidad" value={formData.localidad}onChange={handleChange}/>
                        </label>
                        <label>Calle y Nro
                            <input type="text" placeholder="Direccion" name="direccion" value={formData.direccion}onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={formStyles.labelContainer}>
                        <label>Email
                            <input type="email" placeholder="ejemplo@gmail.com" name="email" value={formData.email}onChange={handleChange}/>
                        </label>
                        <label>Telefono
                            <input type="text" placeholder="15 1234-5678" name="telefono" value={formData.telefono}onChange={handleChange}/>
                        </label>
                    </div>
                    
                    <label>Descripción
                        <textarea className={formStyles.formProvTextarea} placeholder="Descripción de servicios"
                        name="descripcion" value={formData.descripcion}onChange={handleChange}></textarea>
                    </label>

                    <div className={formStyles.buttonContainer}>
                        {mode==="edicion" && (
                            <button type="button" style={{background:"gray"}} onClick={onCancel}>Cancelar</button>
                        )}

                        <button type="submit" style={{background:"#3996f3ff"}} >
                            {mode==="nuevo"? "Crear Proveedor" : "Guardar"}
                        </button>
                    </div>
                </form>
    )
}