import type { ItemVentaDTO } from "../../types/ventas";
import ItemCard from "./ItemCard";

interface ListaItemsProps {
    items:ItemVentaDTO[];
}

export default function ListaProdVenta({items}:ListaItemsProps ){
    return(
        <div style={{display:"flex",flexDirection:"column",flex:"2",gap:"5px",overflow:"auto"}}>
            {items.map(item =>(
                <ItemCard/>
            ))}
            <ItemCard/>
            <ItemCard/>
        </div>
    )
}