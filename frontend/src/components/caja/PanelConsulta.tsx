import panelStyle from "../../styles/cajaPage/PanelConsulta.module.css";

import { useEffect, useState } from "react"
import type { ProductoResponseDTO } from "../../types/producto";
import { toast } from "react-toastify";

interface Props {
    visible: boolean;
    consultaProducto:(texto:string) => Promise<ProductoResponseDTO>;
    resetSignal: number;
}

export default function PanelConsulta({visible,consultaProducto,resetSignal}:Props){

    const [producto,setProducto] = useState<ProductoResponseDTO|undefined>(undefined);
    const [texto,setTexto] = useState("");

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) =>{
        switch(e.key){
            case "Enter":
                
                if(!visible){return}
                e.preventDefault();

                try{
                    const prod = await consultaProducto(texto);
                    setProducto(prod);
                    setTexto("");

                }catch(error){
                    toast.error("No se pudo conectar al sistema");
                }
        }
    }

    useEffect(() => {
        setProducto(undefined);
        setTexto("");
    },[resetSignal])

    return(
        <div className={`${panelStyle.panel} ${visible ? panelStyle.panelVisible : panelStyle.panelHidden}`}>
            
            <input className={panelStyle.inputPanel} type="text" placeholder="Consultar Precio "
            onKeyDown={handleKeyDown} value={texto} onChange={e => setTexto(e.target.value)}/>

            <p>{producto?.nombre}</p>
            <p>{producto !== undefined && ("$")} {producto?.precio}</p>
        </div>
    )
}