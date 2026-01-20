import type { ItemVentaDTO } from "../../types/ventas";
import ItemCard from "./ItemCard";

interface ListaItemsProps {
    items:ItemVentaDTO[];
    onSumar:(id:number,cantidad:number) => void;
    onRestar:(id:number,cantidad:number) =>void;
    onEliminar:(id:number,cantidad:number) => void;
}

export default function ListaProdVenta({items,onSumar,onRestar,onEliminar}:ListaItemsProps ){
    return(
        <div style={{display:"flex",flexDirection:"column",flex:"2",gap:"5px",overflow:"auto"}}>
            {items.map(item =>(
                <ItemCard item={item} onSumar={onSumar} onRestar={onRestar} onEliminar={onEliminar}/>
            ))}
        </div>
    )
}