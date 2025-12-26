import styles from "../styles/proveedoresPage/ProveedoresPage.module.css";

import FormProveedor from "../components/proveedores/FormProveedor";
import DetallesProveedor from "../components/proveedores/DetallesProveedor";
import TablaProveedores from "../components/proveedores/TablaProveedores";
import BuscadorProveedores from "../components/proveedores/BuscadorProveedores";

import { useBusquedaProveedores } from "../hooks/useBusquedaProveedores";
import { useEffect, useState } from "react";

import type { ProveedorDTO,ProveedorResponse } from "../types/proveedor";
import { toast } from "react-toastify";

type Vista = "NUEVO"|"TABLA"|"DETALLES"|"EDITAR";

export default function ProveedorDTOesPage(){
    const [vista,setVista] = useState<Vista>("NUEVO");
    const[proveedores,setProveedores]= useState<ProveedorResponse[]>([]);
    const[provSelecionado,setSeleccion]= useState<ProveedorResponse|undefined>(undefined);

    useEffect(()=>{//trae a los proveedores solo al cargar la pagina
        const fetchProveedores = async () => {
            try{
                const response = await fetch("http://localhost:8080/proveedores",{
                    method: "GET",
                    });
                const proveedoresBack:ProveedorResponse[] = await response.json();
                setProveedores(proveedoresBack);
            }
            catch(error){
                toast.error("No se pudieron cargar los proveedores");
            }
        }

        fetchProveedores();
    },[]);

    const{//hook de busqueda de proveedores
        busqueda,
        sugerencias,
        actualizarBusqueda,
        confirmarBusqueda,
        seleccionar,
    } = useBusquedaProveedores({proveedores,onSelect:(proveedor) => {
        setSeleccion(proveedor);
        setVista("DETALLES");
    },
    });

    const handleChangeVista = (vista:Vista)=>{//solo cambia vista y reinicia seleccionado
        setSeleccion(undefined);
        setVista(vista);
    }

//TODO:separar logica de handles en hook mas adelante
    const handleGuardar = async(proveedorDTO:ProveedorDTO)=>{
        try{
            const response = await fetch("http://localhost:8080/proveedores/crear",{
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

            setProveedores(prev => [...prev, proveedorCreado]);

            setSeleccion(proveedorCreado);//guardo el proveedor creado
            setVista("DETALLES");
            
        }
        catch(error){
            toast.error("Hubo un error inesperado");//TODO:crear un tost error general?
        }
    };

    const handleEditar = async(proveedorDTO:ProveedorDTO) => {
        if(!provSelecionado){
            toast.error("Seleccione un proveedor para editar");
            return;
        }
        
        try{
            const response = await fetch(`http://localhost:8080/proveedores/update/${provSelecionado.id}`,{
                method: "PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(proveedorDTO)
            });

            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return
            }

            const proveedorEditado = await response.json();

            setProveedores(prev =>
                prev.map(p => p.id === proveedorEditado.id ? proveedorEditado : p)
            );

            setSeleccion(proveedorEditado);
            setVista("DETALLES");

        }
        catch(error){
            toast.error("Hubo un error inesperado");
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.optionContainer}>
                <div className={styles.buttonContainer}>
                    <button className={styles.optionButton} onClick={()=>handleChangeVista("TABLA")}>
                        Proveedores
                    </button>
                    <button className={styles.optionButton} onClick={()=>handleChangeVista("NUEVO")}>
                        Nuevo Proveedor
                    </button>
                </div>
                <BuscadorProveedores
                busqueda={busqueda}
                sugerencias={sugerencias}
                onChange={actualizarBusqueda}
                onConfirm={confirmarBusqueda}
                onSelect={seleccionar}/>
                
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