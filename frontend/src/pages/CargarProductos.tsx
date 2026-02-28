import styles from "../styles/CargarProductos.module.css"
import { NumberInput} from "../components/NumberInput";
import React, { useEffect, useState } from "react";
import type { ProductoRequestDTO } from "../types/producto";
import { handleAlfanumerico } from "../utils/soloAlfanumericos"; 
import {toast } from "react-toastify";

import { isNotEmpty, maxLength, mayorACero } from "../utils/validaciones";
import { redondear,calcularGanancia,calcularPrecio } from "../utils/calculos";
import { useValidator } from "../hooks/useValidator";
import type { ProveedorNameResponse } from "../types/proveedor";
//TODO: agregar calculos de inputs de precios
interface ProductoForm{
    proveedor:string,
    code:string,
    nombre:string,
    precio:number|"",
    stock:number|"",
    ganancia:number|"",
    costo:number|"";
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
    const [proveedores,setProveedores] = useState<ProveedorNameResponse[]>([]);
    const [productos,setProductos] = useState<ProductoRequestDTO[]>([]);

    const emptyRows=19;
    const filasVacias = emptyRows - productos.length;

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

        setProductos(prev=>[...prev,dto])
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
                <div className={styles.pList}>
                    <table>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Ganancia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p,index)=>(
                                <tr key={index}>
                                    <td>{p.code}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.precio}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.ganancia}</td>
                                </tr>
                            ))}
                            {/*filas vacias */}
                            {Array.from({ length: filasVacias }).map((_, index) => (
                                <tr key={`empty-${index}`}>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.confirmContainer}>
                    <input type="text" />{/*cambiar input*/}
                    <button type="button" className={styles.submitButton}
                    onClick={handleGuardarProductos}>
                        Guardar Productos
                    </button>
                </div>
            </div>

        </div>
    )
}