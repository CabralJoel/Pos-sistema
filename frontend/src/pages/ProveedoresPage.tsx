import styles from "../styles/proveedoresPage/ProveedoresPage.module.css";

import FormProveedor from "../components/proveedores/FormProveedor";
import DetallesProveedor from "../components/proveedores/DetallesProveedor";
import TablaProveedores from "../components/proveedores/TablaProveedores"

import { useState } from "react";

import type { ProveedorDTO,ProveedorResponse } from "../types/proveedor";
import { toast } from "react-toastify";

type Vista = "NUEVO"|"TABLA"|"DETALLES"|"EDITAR";

// TEMPORAL – borrar cuando venga de backend
const proveedorMock: ProveedorResponse = {
  id:1,
  code: "P001",
  cuit: "20-12345678-9",
  nombre: "Proveedor de Prueba",
  localidad: "Rosario",
  direccion: "San Martín 123",
  email: "test@proveedor.com",
  telefono: "341-111-1111",
  descripcion: "ProveedorDTO temporal para pruebas",
};


export default function ProveedorDTOesPage(){
    const [vista,setVista] = useState<Vista>("NUEVO");
    const[proveedores,setProveedores]= useState<ProveedorResponse[]>([]);
    const[provSelecionado,setSeleccion]= useState<ProveedorResponse|undefined>(undefined);

    const handleChangeVista = (vista:Vista)=>{
        setSeleccion(undefined);
        setVista(vista);
    }

    const handleGuardar = async(proveedorDTO:ProveedorDTO)=>{
        try{
            const response = await fetch("",{//TODO:completar la direccion del fetch para crear proveedor
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(proveedorDTO)
            });
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return
            }
            const proveedorCreado = await response.json();
            setSeleccion(proveedorCreado);//guardo el proveedor creado
            setVista("DETALLES");
            
        }
        catch(error){
            toast.error("Hubo un error inesperado");//TODO:crear un tost error general?
        }
    };

    const handleEditar = async(proveedorDTO:ProveedorDTO) => {
        
        try{
            const response = await fetch("",{//TODO:completar la direccion del fetch para editar proveedor con su id en direccion
                method: "PATCH",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(proveedorDTO)
            });

            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return
            }

            const proveedorEditado = await response.json();
            setSeleccion(proveedorEditado);
            setVista("DETALLES");

        }
        catch(error){
            toast.error("Hubo un error inesperado");
        }

    }

    const handleProveedores = async() =>{
        try{
            const response = await fetch("",{
                method: "GET",
            });

            const proveedoresBack:ProveedorResponse[] = await response.json();
            setProveedores(proveedoresBack);

            handleChangeVista("TABLA");
        }
        catch(error){
            toast.error("Hubo un error inesperado");
        }
    }


    return(
        <div className={styles.container}>
            <div className={styles.optionContainer}>
                <div className={styles.buttonContainer}>
                    <button className={styles.optionButton} onClick={()=>handleChangeVista("TABLA")}>{/*TODO:cambiar por handleProveedores */}
                        Proveedores
                    </button>
                    <button className={styles.optionButton} onClick={()=>handleChangeVista("NUEVO")}>
                        Nuevo Proveedor
                    </button>
                </div>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type="text" placeholder="Buscar proveedor" />
                    <button className={styles.optionButton} onClick={()=>setVista("DETALLES")}>
                        Buscar
                    </button>
                </div>
                
            </div>

            {/*FORM SECCTION */}
            <div className={styles.formContainer}>
                {vista==="NUEVO" && (
                    <FormProveedor mode="nuevo"
                    onSubmit={handleGuardar}>
                    </FormProveedor>
                )}

                {vista==="TABLA" && (
                    <TablaProveedores proveedores={proveedores}/>
                )}
                
                {vista==="DETALLES" && (
                    <DetallesProveedor proveedor={provSelecionado} onEdit={()=>{
                        setVista("EDITAR");
                    }}/>
                )}

                {vista==="EDITAR" && (
                    <FormProveedor mode="edicion" proveedor={provSelecionado} onSubmit={handleEditar}
                    onCancel={()=>{
                        setVista("DETALLES");
                    }}/>
                )}
            </div>
            
        </div>
    )
}