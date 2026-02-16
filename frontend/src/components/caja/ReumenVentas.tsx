import { useEffect, useState } from "react";
import resumenStyle from "../../styles/cajaPage/ResumenVentas.module.css"
import type { ResumenVentaTurnoLocal } from "../../types/ventas"
import { IoReceiptOutline } from "react-icons/io5";

interface resumenProps{
    resumenVentas:ResumenVentaTurnoLocal|null;
    visible:boolean;
}

export default function ResumenVentas({resumenVentas,visible}:resumenProps){

    const [animar,setAnimar] = useState(false);

    useEffect(()=>{
        if(visible){
            requestAnimationFrame(()=>{
                setAnimar(true);
            })
        }else{
            setAnimar(false);}
    },[visible]);

    return(
        <div className={`${resumenStyle.resumenContainer} ${animar ? resumenStyle.resumenVisible : resumenStyle.resumenHidden}`}>
            
            <div style={{display:"grid",width:"100%",gridTemplateColumns:"auto 1fr auto"}}>
                <button style={{backgroundColor:"rgb(255, 255, 255)",padding:"0.2em 0.6em"}}>
                    <IoReceiptOutline style={{color:"black"}} size={20}/>
                </button>{/*poner pading 0 cuando agregue icono */}
                <span style={{}}>TURNO: {new Date(resumenVentas?.fechaInicio ?? "").toLocaleString("es-AR",{
                    day:"2-digit",
                    month:"2-digit",
                    year:"2-digit",
                    hour:"2-digit",
                    minute:"2-digit",
                    hour12: false,
                })}</span>
            </div>
            <span>Cajero: {resumenVentas?.nombreCajero.toUpperCase()}</span>
            <table className={resumenStyle.ventasTable}>
                    <tbody className={resumenStyle.infoVentaTable}>
                        {resumenVentas?.ventas.map((v,index)=>(
                        <tr style={{display:"flex",width:"100%"}} key={index}>
                            
                            <td style={{flex:"2"}}>{index+1}</td>
                            <td style={{flex:"7"}}>{new Date(v.fechaCreacion).toLocaleString("es-AR",{
                                hour:"2-digit",
                                minute:"2-digit",
                                hour12:false,
                            })}</td>
                            <td style={{flex:"5"}}>${v.total}</td>
                        </tr>
                        ))}
                    </tbody>
            </table>

        </div>
    )
}