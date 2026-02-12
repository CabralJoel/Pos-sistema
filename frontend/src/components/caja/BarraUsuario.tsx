import { use, useEffect, useState } from "react"
import type { usuarioLocal } from "../../types/ventas"

interface Props{
    usuario:usuarioLocal|undefined
}

export default function BarraUsuario({usuario}:Props){
    const [fechaHora,setFechaHora] = useState(new Date());
    useEffect(()=>{
        const intervalo = setInterval(()=>{
            setFechaHora(new Date());
        },1000)

        return ()=>clearInterval(intervalo);
    },[])

    const fecha = fechaHora.toLocaleDateString("es-AR",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
    })
    const hora = fechaHora.toLocaleTimeString("es-AR",{
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        hour12:false,
    })

    return (
        <div style={{backgroundColor:"#83ce20",display:"flex",color:"#000000e7",padding:"0 4em",justifyContent:"space-between",borderBottom:"1px solid white"}}>
            <div style={{display:"flex",gap:"0.8em", padding:"0.8em 0",fontSize:"larger",alignItems:"center"}}>
                <span>Cajero:</span>
                <span>{usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1):""}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",fontFamily:"monospace",fontSize:"larger"}}>
                
                <span>{fecha}</span>
                <span>{hora}</span>
            </div>

        </div>
    )
}