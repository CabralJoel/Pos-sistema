import type { ProveedorResponse } from "../../types/proveedor"
import buscadorStyles from "../../styles/proveedoresPage/BuscadorProveedores.module.css"

type Props = {
    busqueda: string;
    sugerencias:ProveedorResponse[];
    onChange: (texto:string)=>void;
    onConfirm:()=>void;
    onSelect:(proveedor:ProveedorResponse)=>void;
}

export default function BuscadorProveedores({
    busqueda,
    sugerencias,
    onChange,
    onConfirm,
    onSelect,
}:Props){
    return(
        <div className={buscadorStyles.searchContainer}>
            <input className={buscadorStyles.search}
            type="text" placeholder="Buscar proveedor"
            value={busqueda}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e =>{
                if(e.key==="Enter")onConfirm();}}/>

            <button 
            onClick={onConfirm}>Buscar</button>
            {sugerencias.length>0 && (
                <ul>
                    {sugerencias.map(p => (
                        <li key={p.id}>

                            <strong>{p.code}</strong>- {p.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}