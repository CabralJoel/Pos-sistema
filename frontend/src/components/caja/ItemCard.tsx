import itemStyle from "../../styles/cajaPage/ItemCard.module.css"
import type { ItemVentaDTO } from "../../types/ventas"

interface ItemProps{
    item:ItemVentaDTO;
    onSumar:(id:string,cantidad:number) => void;
    onRestar:(id:string,cantidad:number) =>void;
    onEliminar:(id:string,cantidad:number) => void;
}

export default function ItemCard({item,onSumar,onRestar,onEliminar}:ItemProps){
    return(
        <div className={itemStyle.cardContainer}>

            <div className={itemStyle.basicInfoContainer}>
                <p>{item.nombre}</p>
                <p style={{marginRight:"auto"}}>${item.precioUnitario} c/u</p>
            </div>

            <div className={itemStyle.cantContainer}>
                {item.idProd !== null && (
                    <button style={{backgroundColor:"#06B50E",padding:" 0.2em 0.5em"}} onClick={() => onSumar(item.idItem,item.cantidad+1)}>
                        <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </button>
                )}

                <p style={{gridColumn:"2"}}>{item.cantidad}</p>

                {item.idProd !== null && (
                    <button style={{backgroundColor:"#546e7a",padding:" 0.2em 0.5em"}} onClick={() => onRestar(item.idItem,item.cantidad-1)}>
                        <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                            <path d="M5 12h14" />
                        </svg>
                    </button>
                )}

            </div>
            
            <div className={itemStyle.subtotalContainer}>
                <p>$ {item.subtotal}</p>
                <button className={itemStyle.deleteButton} onClick={()=> onEliminar(item.idItem,0)}>
                    <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                        <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}