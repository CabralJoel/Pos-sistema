import barraStyles from "../../styles/cajaPage/BarraCargarProducto.module.css"

import React, { useState,useEffect,useRef } from "react";
import { NumberInput } from "../NumberInput";



export default function BarraCargarProducto(){
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState("");

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

                    <input type="text" placeholder="buscar..."
                        style={{padding:"0 20px",minWidth:"29em",fontSize:"15px"}} />
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