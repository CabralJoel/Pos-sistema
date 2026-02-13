import barraStyles from "../../styles/cajaPage/BarraCargarProducto.module.css"

import type { ProductoResponseDTO } from "../../types/producto";
import React, { useState,useEffect,useRef } from "react";
import { useBusquedaProducto } from "../../hooks/useBusquedaProducto";
import PanelConsulta from "./PanelConsulta";
import { NumberInput } from "../NumberInput";

interface Props{
    onProductoSeleccionado: (p:ProductoResponseDTO,cant:number) => void;
    filtrarProductos:(texto:string) => Promise<ProductoResponseDTO[]>;
    consultaProducto:(texto:string) => Promise<ProductoResponseDTO>;
    onProductoManual:(monto:number) => void;
    resetSignal: number;
}

export default function BarraCargarProducto({onProductoSeleccionado,filtrarProductos,consultaProducto,onProductoManual,resetSignal}:Props){
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [focused,setFocused] = useState(false);

    const [panel,setPanel] = useState(false);
    const [mostrarPanel,setMostrarPanel] = useState(false);

    const [montoManual,setMontoManual] = useState("");
    const cantidad = Math.max(1,Number(value||1))

    const submittingRef = useRef(false);

    const{
        texto,
        setTexto,
        resultados,
        selectProduct,
        clear
    } = useBusquedaProducto(filtrarProductos, producto=>{
        onProductoSeleccionado(producto,cantidad);
        setValue("");
        clear();
    });

    const wrapperRef = useRef<HTMLDivElement>(null);

    const closeTeclado = () => {
        setOpen(false);
        setMontoManual("");
    }

    const estadoPanel = () => {
        if(!panel){
            setPanel(true);
            requestAnimationFrame(() => {
                setMostrarPanel(true)
            });
        }else{
            setMostrarPanel(false);
            setTimeout(()=>{
                setPanel(false)
            },300)
        }
    }

    const reinicioCompponente = () => {
        setValue("");
        setOpen(false);
        setFocused(false);
        setMontoManual("");
        clear();
    }
//reinicio de componente al finalizar una venta
    useEffect(() =>{
        reinicioCompponente();
    },[resetSignal])

// focus en el input de monto manual
    useEffect(() => {
    if (open) {
        const input = wrapperRef.current?.querySelector("input");
        input?.focus();
    }
    }, [open]);
//reinicio de input de monto manual al cluckear fuera de el
    useEffect(() => {
        if(!open) return;

        const handleClickOutside = (e:MouseEvent) => {
            if(!wrapperRef.current?.contains(e.target as Node)){
                closeTeclado();
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside);
    },[open]);


    const handleChangeCantidad = (e:React.ChangeEvent<HTMLInputElement>) => {
        const soloNumeros = e.target.value.replace(/\D/g, "");
        setValue(soloNumeros.slice(0, 2));
    };

    const handleMontoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                closeTeclado();
                break;

            case "Enter":
                e.preventDefault();

                if (!open) return;
                if (submittingRef.current) return;

                const monto = parseFloat(montoManual);

                if (isNaN(monto) || monto <= 0) {
                    return;
                }

                submittingRef.current = true;

                onProductoManual(monto);
                reinicioCompponente()

                setTimeout(() => {
                    submittingRef.current = false;
                }, 200);

                break;

                default:
                break;
            }
    }

    return(
        <div className={barraStyles.barraContainer}>
            <div className={barraStyles.inputContainer}>
                <div style={{display: "flex",justifyContent:"space-evenly"}}>
                    <input style={{maxWidth:"8%",textAlign:"center",fontSize:"15px"}} type="text" inputMode="numeric" 
                        maxLength={2} pattern="[0-9]" value={value} onChange={handleChangeCantidad} placeholder="Cant"/>

                    <div style={{position:"relative"}}>
                        <input type="text" placeholder="buscar..." value={texto} onChange ={e => setTexto(e.target.value)}
                            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                            style={{width:"100%",height:"100%",padding:"0 20px",minWidth:"29em",fontSize:"15px"}} />

                        {focused && resultados.length > 0 &&(
                        <ul className={barraStyles.sugerencias}>
                            {resultados.map(p =>(
                                <li className={barraStyles.result} key = {p.idProducto} onMouseDown={(e) => {
                                    e.preventDefault();
                                    selectProduct(p);}}>
                                    {p.nombre}
                                </li>
                            ))}

                        </ul>
                        )}
                    </div>
                </div>

                
                <div ref={wrapperRef} style={{display:"flex",gap:"2px"}}>
                    <button onClick={()=>{
                        if(open){closeTeclado()}
                        else{setOpen(true)}
                        }}>Teclado</button>
                    
                    <div className={`${barraStyles.inputWrapper} ${open ? barraStyles.open : ""}`}>
                        <NumberInput value={montoManual} onChange={e => setMontoManual(e.target.value)}
                        onKeyDown={handleMontoKeyDown}
                        style={{width:"150px",fontSize:"18px",padding:"0 10px"}}  placeholder="Monto manual"/>
                    </div>
                </div>
                
            </div>
            
            <div className={barraStyles.consultaWrapper}>
                <button onClick={()=>estadoPanel()}>Consultar precio</button>
                
                {panel && (<PanelConsulta visible={mostrarPanel} consultaProducto={consultaProducto} resetSignal={resetSignal}/>)}
                
            </div>
            

        </div>
    )
}