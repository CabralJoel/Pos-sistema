import styles from "../styles/CargarProductos.module.css"
import { NumberInput} from "../components/NumberInput";
import React, { useState } from "react";
import type { ProductoRequestDTO } from "../types/producto";

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


    const [formData,setFormData] = useState<ProductoForm>(initialForm);

    const [productos,setProductos] = useState<ProductoRequestDTO[]>([]);

    const emptyRows=20;
    const filasVacias = emptyRows - productos.length;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "number"? value === "" ? "" : Number(value): value
        }));
    };

    const validarForm = true;//cambiar por validaciones reales

    const handleGuardar=()=>{

        if(!validarForm){return;}

        const dto: ProductoRequestDTO={
            code:formData.code,
            nombre:formData.nombre,
            precio:Number(formData.precio || 0),
            stock:Number(formData.stock || 0),
            ganancia:Number(formData.ganancia || 0),
            proveedor:formData.proveedor
        };

        setProductos(prev=>[...prev,dto])

        setFormData(initialForm);
    }
    

    return(
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h2>Ingrese informacion del Producto</h2>

                <label>Proveedor
                    <input type="text" placeholder="Proveedor"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleChange}/>
                </label>

                <form className={styles.form} >

                    <label>Codigo
                        <input type="text"  placeholder="Codigo del producto"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}/>
                    </label>

                    <label>Nombre
                        <input type="text" placeholder="Nombre del producto"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}/>
                    </label>
                    <div className={styles.inputContainer}>
                        <label>Costo
                            <NumberInput placeholder="Costo"
                            name="costo"
                            value={formData.costo}
                            onChange={handleChange}/>
                        </label>
                        <label>Cantidad
                            <NumberInput placeholder="Stock" decimal={false}
                            name="stock"
                            value={formData.stock} 
                            onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Precio
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
            {/*LISTA DE PRODUCTOS CARADOS */}
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
                    <button type="button" className={styles.submitButton}>Guardar Productos</button>
                </div>
            </div>

        </div>
    )
}