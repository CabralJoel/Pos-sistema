import styles from "../styles/cargaProductos/CargarProductos.module.css"
import { NumberInput} from "../components/NumberInput";
import TablaProductos from "../components/cargaProductos/TablaProductos";
import React, { useEffect, useState } from "react";
import type { ProductoRequestDTO } from "../types/producto";
import { handleAlfanumerico } from "../utils/soloAlfanumericos"; 
import {toast } from "react-toastify";

import { isNotEmpty, maxLength, mayorACero } from "../utils/validaciones";
import { calcularGanancia,calcularPrecio } from "../utils/calculos";
import { useValidator } from "../hooks/useValidator";
import type { ProveedorNameResponse } from "../types/proveedor";

interface ProductoForm{
    proveedor:string,
    code:string,
    nombre:string,
    precio:number|"",
    stock:number|"",
    ganancia:number|"",
    costo:number|"";//costo por unidad
}

export default function CargarProductos(){

    const initialForm: ProductoForm = {
        proveedor:"",
        code:"",
        nombre:"",
        precio:"",
        stock:"",
        ganancia:"",
        costo:""
    };

    const [costoLote,setCostoLote] = useState<number|"">("");
    const [formData,setFormData] = useState<ProductoForm>(initialForm);
    const [proveedores,setProveedores] = useState<ProveedorNameResponse[]>([]);//proveedores recuperados
    const [productos,setProductos] = useState<ProductoRequestDTO[]>([]);//productos en lista por cargar
    const totalFactura = productos.reduce((total,p) => {//monto que debe figurar en la factura
        return total + (p.costo * p.stock);
    },0);

    const [editIndex,setEditIndex] = useState<number|null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue =type === "number" ? value === "" ? "" : Number(value): value;

    setFormData(prev => {
        const updated = {
            ...prev,
            [name]: parsedValue
        };
        //recalculo de ganancia o precio resectivamente
        if(name === "precio" && parsedValue !== "" && prev.costo !== "" && Number(prev.costo) > 0){
            updated.ganancia = calcularGanancia(Number(parsedValue),Number(prev.costo));
        }
        if(name === "ganancia" && parsedValue !== "" && prev.costo !== "" && Number(prev.costo) > 0){
            updated.precio = calcularPrecio(Number(parsedValue),Number(prev.costo));
        }
        return updated;
    });
};

    useEffect(()=>{//trae los codigos de los proveedores al iniciar componente, decidir si cambiar luego
        const getProveedores = async() => {
            try{
                const response = await fetch("http://localhost:8080/proveedores/codigos",{
                    method:"GET",
                });
                const provCodes:ProveedorNameResponse[] = await response.json();
                setProveedores(provCodes);
            }
            catch(error){
                toast.error("Hubo un error al conectar con a app");
            }
        }

        getProveedores();
    },[]);

    useEffect(()=>{//detecta cambios en costoLote y stock para calcular costo unitario del formData
        if(costoLote === "" || formData.stock===""){
            setFormData((prev)=>({
                ...prev,
                costo:"",
            }));
            return;
        }
        const costoUnidad = Number((costoLote/formData.stock).toFixed(2));
        setFormData(prev =>{
            const updated ={
                ...prev,
                costo: costoUnidad,
            };//si hay ganancia recalcula el precio manteniendo el porcentaje de ganancia
            if(prev.ganancia !== "" && Number(prev.ganancia) > 0){
                updated.precio = calcularPrecio(
                    Number(prev.ganancia),
                    costoUnidad
                );
            }
            return updated;
        });
    },[costoLote,formData.stock]);


    const codeVal = useValidator<string>();
    const nombreVal = useValidator<string>();
    const provVal = useValidator<string>();
    const precioVal = useValidator<number>();
    const costoVal = useValidator<number>();
    const stockVal = useValidator<number>();
    const gananciaVal = useValidator<number>();

    const validarForm = () => {
        let ok = true;

        //PROVEEDOR
        const provErr = 
            provVal.validate(formData.proveedor,[
                isNotEmpty("Proveedor"),
            ]);
        if(!provErr.ok) ok = false;provErr.errors.forEach(e => toast.error(e));

        // CÓDIGO
        const codeErr =
            codeVal.validate(formData.code, [
                isNotEmpty("Código"),
                maxLength("Código", 20),
            ]);

        if (!codeErr.ok) ok = false;codeErr.errors.forEach(e => toast.error(e));

        // NOMBRE
        const nombreErr = nombreVal.validate(formData.nombre, [
                isNotEmpty("Nombre"),
                maxLength("Nombre", 20),
            ]);

        if (!nombreErr.ok) ok = false;nombreErr.errors.forEach(e => toast.error(e));

        // COSTO
        const costoErr = costoVal.validate(Number(formData.costo || 0), [
                isNotEmpty("Costo"),
                mayorACero("Costo"),
            ]);
        if (!costoErr.ok) ok = false;costoErr.errors.forEach(e => toast.error(e));

        // PRECIO
        const precioErr = precioVal.validate(Number(formData.precio || 0), [
                isNotEmpty("Precio"),
                mayorACero("Precio"),
            ]);
        if (!precioErr.ok) ok = false;precioErr.errors.forEach(e => toast.error(e));

        // STOCK
        const stockErr = stockVal.validate(Number(formData.stock || 0), [
                isNotEmpty("Stock"),
                mayorACero("Stock"),
            ]);
        if (!stockErr.ok) ok = false;stockErr.errors.forEach(e => toast.error(e));

        // GANANCIA
        const gananciaErr = gananciaVal.validate(Number(formData.ganancia || 0), [
                isNotEmpty("Ganancia"),
                mayorACero("Ganancia"),
            ]);
        if (!gananciaErr.ok) ok = false;gananciaErr.errors.forEach(e => toast.error(e));

        return ok;
    };

    const handleGuardar=()=>{

        if(!validarForm()){return;}

        const dto: ProductoRequestDTO={
            code:formData.code,
            nombre:formData.nombre,
            costo:Number(formData.costo || 0),
            precio:Number(formData.precio || 0),
            stock:Number(formData.stock || 0),
            ganancia:Number(formData.ganancia || 0),
            proveedor:formData.proveedor
        };
        if(editIndex!==null){
            setProductos(prev=>prev.map((p,i)=> i === editIndex ? dto:p));
            setEditIndex(null);
        }else{
            setProductos(prev=>[...prev,dto])
        }
        setCostoLote("");

        setFormData(prev => ({
            ...initialForm,
            proveedor: prev.proveedor
        }));
    }

    const handleGuardarProductos = async () =>{

        if (productos.length === 0){return}

        try{
            const response = await fetch("http://localhost:8080/productos/cargar",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(productos)
            });
            console.log(productos);
            if(!response.ok){
                const errorMsg = await response.text();
                toast.error(errorMsg);
                return;
            }

            setProductos([]);

        }
        catch(error:any){
            toast.error("Hubo un error inesperado");
        }
    };
    
    const handleDelete = (index:number) => {
        setProductos(prev => prev.filter((_,i) => i!==index));
    }
    const handleEdit = (index:number) =>{
        const editable = productos[index];
        setFormData(editable);
        setCostoLote(editable.costo * editable.stock);
        setEditIndex(index)
    }

    return(
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h2>Ingrese informacion del Producto</h2>
                <div style={{paddingBottom:"20px"}}>
                    <label>Proveedor
                        <select name="proveedor" value={formData.proveedor} onChange={handleChange}>
                            <option value="" disabled>Seleccionar Proveedor</option>
                            {proveedores.map((prov)=>(
                                <option key={prov.id} value={prov.id}>
                                    {prov.code}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <form className={styles.form} >

                    <label>Codigo
                        <input type="text"  placeholder="Codigo del producto"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        {...handleAlfanumerico}/>
                    </label>

                    <label>Nombre
                        <input type="text" placeholder="Nombre del producto"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}/>
                    </label>
                    <div className={styles.inputContainer}>
                        <label>Costo Total
                            <NumberInput placeholder="Costo"
                            name="costoLote"
                            value={costoLote}
                            onChange={(e)=>{
                                const value = e.target.value === "" ? "" : Number(e.target.value);
                                setCostoLote(value);
                            }}/>
                        </label>
                        <label>Cantidad
                            <NumberInput placeholder="Stock" decimal={false}
                            name="stock"
                            value={formData.stock} 
                            onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Precio Unidad
                            <NumberInput placeholder="Precio"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}/>
                        </label>

                        <label>Ganancia
                            <div className={styles.inputWrapper}>
                                <NumberInput type="number" placeholder="%"
                                name="ganancia"
                                value={formData.ganancia}
                                onChange={handleChange}/>
                                <span>%</span>
                            </div>
                        </label>
                    </div>
                    
                    <button type="button" className={styles.submitButton} onClick={handleGuardar}>Guardar</button>
                </form>
            </div>
            {/*LISTA DE PRODUCTOS CARGADOS */}
            <div className={styles.pListContainer}>
                <h2>Productos Cargados</h2>
                <TablaProductos listaProductos={productos} onDelete={handleDelete} onEdit={handleEdit}/>
                <div className={styles.confirmContainer}>
                    <span style={{minWidth:"16em",border:"1px solid black",borderRadius:"3px",padding:"0.2em 1em",textAlign:"start",
                        fontSize:"1.2em"
                    }}>
                            Total cargado: $ {totalFactura}
                        </span>
                    <button type="button" className={styles.submitButton}
                    onClick={handleGuardarProductos}>
                        Guardar Productos
                    </button>
                </div>
            </div>

        </div>
    )
}