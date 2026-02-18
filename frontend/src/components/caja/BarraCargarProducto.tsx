import barraStyles from "../../styles/cajaPage/BarraCargarProducto.module.css"
import { FaKeyboard } from "react-icons/fa";

import type { ProductoResponseDTO } from "../../types/producto";
import React, { useState,useEffect,useRef } from "react";
import { useBusquedaProducto } from "../../hooks/useBusquedaProducto";
import PanelConsulta from "./PanelConsulta";
import { NumberInput } from "../NumberInput";
import { useLayoutEffect } from "react";

interface Props{
    onProductoSeleccionado: (p:ProductoResponseDTO,cant:number) => void;
    filtrarProductos:(texto:string) => Promise<ProductoResponseDTO[]>;
    consultaProducto:(texto:string) => Promise<ProductoResponseDTO>;
    onProductoManual:(monto:number) => void;
    resetSignal: number;
    //parametros de atajos teclado padre
    abrirVarios:boolean;
    onAbrirVarios:()=>void;
    abrirConsulta:boolean;
    onAbrirConsulta:(b:boolean)=>void;
}

export default function BarraCargarProducto({onProductoSeleccionado,filtrarProductos,consultaProducto,onProductoManual,resetSignal
    ,abrirVarios,onAbrirVarios,abrirConsulta,onAbrirConsulta
}:Props){
    const [open,setOpen] = useState(false);//variable del input varios
    const [montoManual,setMontoManual] = useState("");//valor input varios
    const [focused,setFocused] = useState(false);//focus del input varios

    const [mostrarPanel,setMostrarPanel] = useState(false);//avisa a PanelConsulta que debe de hacer la animacion
    const [panel,setPanel] = useState(false);

    const [value, setValue] = useState("");//valor del input cantidad buscador
    const cantidad = Math.max(1,Number(value||1))

    const submittingRef = useRef(false);

    const tecladoRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const{
        texto,//valor de input buscador
        setTexto,
        resultados,
        selectProduct,
        clear
    } = useBusquedaProducto(filtrarProductos, producto=>{
        onProductoSeleccionado(producto,cantidad);
        setValue("");
        clear();
    });

    const reinicioCompponente = () => {
        setValue("");
        closeTeclado()
        setFocused(false);
        cerrarPanel();
        clear();
    }

    const closeTeclado = () => {
        if(abrirVarios){
            onAbrirVarios();//false
        }
        setOpen(false);
        setMontoManual("");
    }

    const cerrarPanel = () => {
        setMostrarPanel(false);
        
        setTimeout(()=>{
            setPanel(false)
        },300)
    }

    const estadoPanel = () => {
        if(!panel){
            setPanel(true);
            requestAnimationFrame(() => {
                setMostrarPanel(true)
            });
        }else{
            cerrarPanel();
        }
    }
    //receptor de atajos teclado
    useLayoutEffect(()=>{//receptor de atajo teclado panel consulta
        if(abrirConsulta){
            estadoPanel();
        }else{cerrarPanel();}
    },[abrirConsulta]);

    useEffect(()=>{//receptor de atajo teclado input varios
        if (abrirVarios) setOpen(true);
        else{closeTeclado()}
    },[abrirVarios]); 

//reinicio de componente al finalizar una venta
    useEffect(() =>{
        reinicioCompponente();
    },[resetSignal])

// focus en el input de monto manual
    useEffect(() => {
    if (open) {
        const input = tecladoRef.current?.querySelector("input");
        input?.focus();
    }
    }, [open]);
//reinicio de input de monto manual y panel consulta al clickear fuera de el
    useEffect(() => {
        if(!open && !panel) return;

        const handleClickOutside = (e:MouseEvent) => {
            const target = e.target as Node;

            // cerrar teclado
            if (open && !tecladoRef.current?.contains(target)) {
                closeTeclado();
            }

            // cerrar panel 
            if (panel && !panelRef.current?.contains(target)) {
                onAbrirConsulta(!abrirConsulta);
            }
        };
        document.addEventListener("mousedown",handleClickOutside);

        return () => document.removeEventListener("mousedown",handleClickOutside);
    },[open,panel]);


    const handleChangeCantidad = (e:React.ChangeEvent<HTMLInputElement>) => {
        const soloNumeros = e.target.value.replace(/\D/g, "");
        setValue(soloNumeros.slice(0, 2));
    };

    const handleMontoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {//atajo del input para crear item sin producto
        switch (e.key) {
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

                
                <div ref={tecladoRef} style={{display:"flex",gap:"2px"}}>
                    <button style={{display:"flex",alignItems:"center",gap:"0.5em"}} onClick={()=>{onAbrirVarios()}}>
                            <FaKeyboard size={18}/>
                            Varios</button>
                    
                    <div className={`${barraStyles.inputWrapper} ${open ? barraStyles.open : ""}`}>
                        <NumberInput value={montoManual} onChange={e => setMontoManual(e.target.value)}
                        onKeyDown={handleMontoKeyDown}
                        style={{width:"150px",fontSize:"18px",padding:"0 10px"}}  placeholder="Monto manual"/>
                    </div>
                </div>
                
            </div>
            
            <div ref={panelRef} className={barraStyles.consultaWrapper}>
                <button onClick={()=>onAbrirConsulta(!abrirConsulta)}>Consultar precio</button>
                
                {panel && (<PanelConsulta visible={mostrarPanel} consultaProducto={consultaProducto} resetSignal={resetSignal}/>)}
                
            </div>
        </div>
    )
}