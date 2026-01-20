import barraStyles from "../../styles/cajaPage/BarraCargarProducto.module.css"

import type { ProductoResponseDTO } from "../../types/producto";
import React, { useState,useEffect,useRef } from "react";
import { useBusquedaProducto } from "../../hooks/useBusquedaProducto";
import { NumberInput } from "../NumberInput";

interface Props{
    onProductoSeleccionado: (p:ProductoResponseDTO,cant:number) => void;
    buscarProducto:(texto:string) => Promise<ProductoResponseDTO[]>;
}

export default function BarraCargarProducto({onProductoSeleccionado,buscarProducto}:Props){
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState("");

    const cantidad = Math.max(1,Number(value||1))

    const{
        texto,
        setTexto,
        resultados,
        selectProduct,
        clear
    } = useBusquedaProducto(buscarProducto, producto=>{
        onProductoSeleccionado(producto,cantidad);
        setValue("");
        clear();
    });

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (open) {
        const input = wrapperRef.current?.querySelector("input");
        input?.focus();
    }
    }, [open]);

    const handleChangeCantidad = (e:React.ChangeEvent<HTMLInputElement>) => {
        const soloNumeros = e.target.value.replace(/\D/g, "");
        setValue(soloNumeros.slice(0, 2));
    };
//TODO: agregar componente para consultar precio
    return(
        <div className={barraStyles.barraContainer}>
            <div className={barraStyles.inputContainer}>
                <div style={{display: "flex",justifyContent:"space-evenly"}}>
                    <input style={{maxWidth:"8%",textAlign:"center",fontSize:"15px"}} type="text" inputMode="numeric" 
                        maxLength={2} pattern="[0-9]" value={value} onChange={handleChangeCantidad} placeholder="Cant"/>

                    <div style={{position:"relative"}}>
                        <input type="text" placeholder="buscar..." value={texto} onChange ={e => setTexto(e.target.value)}
                            style={{width:"100%",height:"100%",padding:"0 20px",minWidth:"29em",fontSize:"15px"}} />

                        {resultados.length > 0 &&(
                        <ul className={barraStyles.sugerencias}>
                            {resultados.map(p =>(
                                <li className={barraStyles.result} key = {p.idProducto} onClick={() => selectProduct(p)}>
                                    {p.nombre}
                                </li>
                            ))}

                        </ul>
                        )}
                    </div>
                </div>

                
                
                <button onClick={()=>setOpen(!open)}>Teclado</button>
                
                <div ref={wrapperRef} className={`${barraStyles.inputWrapper} ${open ? barraStyles.open : ""}`}>
                    <NumberInput style={{width:"150px",fontSize:"18px",padding:"0 10px"}}  placeholder="Monto manual"/>
                </div>
                
            </div>
            
            <button>Consultar precio</button>

        </div>
    )
}