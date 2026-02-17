import type { ProveedorResponse } from "../../types/proveedor"

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
        <div style={{display:"flex", gap:"10px",flexGrow:"2"}}>
            <div style={{position:"relative",flex:"1",maxWidth:"400px"}}>
                <input style={{backgroundColor:"#ededed",borderRadius:"10px",width:"100%",height:"100%",left:"0",padding:"0 1em"}}
                type="text" placeholder="Buscar proveedor"
                value={busqueda}
                onChange={e => onChange(e.target.value)}
                onKeyDown={e =>{
                    if(e.key==="Enter")onConfirm();}}/>

                {sugerencias.length>0 && (
                <ul style={{position:"absolute",width:"100%",margin:"0",padding:"0 10px",listStyle:"none",top:"100%",
                background:"#f8f8f8ff",borderRadius:"8px",maxWidth:"400px"}}>
                    {sugerencias.map(p => (
                        <li key={p.id}
                        onClick={() => onSelect(p)}
                        style={{cursor:"pointer",textAlign:"left",padding:"2px 0"}}>

                            <strong>{p.code}</strong> - {p.nombre}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            

            <button 
            onClick={onConfirm}>Buscar</button>
            
        </div>
    );
}