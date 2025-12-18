import React, { useEffect, useState } from "react";
import formStyles from "../../styles/proveedoresPage/FormProveedor.module.css";
import type { Proveedor } from "../../types/proveedor";

interface formProv{
    mode:"nuevo"|"edicion",
    proveedor?:Proveedor,
    onSubmit:(proveedor:Proveedor)=>void,
    onCancel?:()=>void
}

export default function FormProveedor({mode,proveedor,onSubmit,onCancel}:formProv){
        const [formData,setFormData] = useState<Proveedor>(proveedor??//arranca con el que recive o todo vacio como esta abajo
            {
                code:"",
                cuit:"",
                nombre:"",
                localidad:"",
                direccion:"",
                email:"",
                telefono:"",
                descripcion:"",
            }
        )

        const handelSubmit = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
            const {name, value} = e.target;
            
            setFormData((prev) => ({
                ...prev,[name]:value
            }));
        };

        const handleSubmit = (e:React.FormEvent)=>{
            onSubmit(formData);
        }

        return(
                <form className={formStyles.proveedorForm}>
                    <h2>Complete los datos del proveedor</h2>

                    <div className={formStyles.labelContainer}>
                        <label>Codigo
                            <input type="text" placeholder="Codigo" />
                        </label>
                        <label>CUIT
                            <input type="text" placeholder="CUIT " />
                        </label>
                        
                    </div>

                    <label>Razon Social
                        <input type="text" placeholder="Nombre" />
                    </label>
                    
                    
                    <div className={formStyles.labelContainer}>
                        <label>Localidad
                            <input type="text" placeholder="Localidad" />
                        </label>
                        <label>Calle y Nro
                            <input type="text" placeholder="Direccion" />
                        </label>
                    </div>
                    <div className={formStyles.labelContainer}>
                        <label>Email
                            <input type="email" placeholder="ejemplo@gmail.com" />
                        </label>
                        <label>Telefono
                            <input type="text" placeholder="15 1234-5678" />
                        </label>
                    </div>
                    
                    <label>Descripción
                        <textarea className={formStyles.formProvTextarea} placeholder="Descripción de servicios"></textarea>
                    </label>

                    <div className={formStyles.buttonContainer}>
                        {mode==="edicion" && (
                            <button type="button" style={{background:"gray"}} onClick={onCancel}>Cancelar</button>
                        )}

                        <button type="submit" style={{background:"red"}}>{/*TODO:cambiar color de boton */}
                            {mode==="nuevo"? "Crear Proveedor" : "Guardar"}
                        </button>
                    </div>
                </form>
    )
}