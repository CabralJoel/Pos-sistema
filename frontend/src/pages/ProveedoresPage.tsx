import styles from "../styles/proveedoresPage/ProveedoresPage.module.css";

import FormProveedor from "../components/proveedores/FormProveedor";
import DetallesProveedor from "../components/proveedores/DetallesProveedor";
import TablaProveedores from "../components/proveedores/TablaProveedores"

import { useState } from "react";

import type { Proveedor } from "../types/proveedor";

type Vista = "NUEVO"|"TABLA"|"DETALLES"|"EDITAR";

// TEMPORAL – borrar cuando venga de backend
const proveedorMock: Proveedor = {
  code: "P001",
  cuit: "20-12345678-9",
  nombre: "Proveedor de Prueba",
  localidad: "Rosario",
  direccion: "San Martín 123",
  email: "test@proveedor.com",
  telefono: "341-111-1111",
  descripcion: "Proveedor temporal para pruebas",
};


export default function ProveedoresPage(){
    const [vista,setVista] = useState<Vista>("TABLA");
    const[proveedores,setProveedores]= useState<Proveedor[]>([]);
    const[provSelecionado,setSeleccion]= useState<Proveedor|undefined>(undefined);


    const proveedoresMock: Proveedor[] = [proveedorMock];//TODO:borrar al tener llamado a back
    const [proveedorGuardado,setProveedorGuardado]= useState<Proveedor|undefined>(proveedorMock);//borrar


    const handleNuevoProv=()=>{};

    return(
        <div className={styles.container}>
            <div className={styles.optionContainer}>
                <div className={styles.buttonContainer}>
                    <button className={styles.optionButton} onClick={()=>setVista("TABLA")}>
                        Proveedores
                    </button>
                    <button className={styles.optionButton} onClick={()=>setVista("NUEVO")}>
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
                    <FormProveedor mode="edicion"
                    onSubmit={(proveedorNuevo)=>{
                        setProveedorGuardado(proveedorNuevo);
                        setVista("DETALLES");}}>
                    </FormProveedor>
                )}

                {vista==="TABLA" && (
                    <TablaProveedores proveedores={proveedoresMock}/>
                )}
            </div>
            
            
        </div>
    )
}