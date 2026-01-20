import itemStyle from "../../styles/cajaPage/ItemCard.module.css"
import type { ItemVentaDTO } from "../../types/ventas"

interface ItemProps{
    item:ItemVentaDTO;
    onSumar:(id:number,cantidad:number) => void;
    onRestar:(id:number,cantidad:number) =>void;
    onEliminar:(id:number,cantidad:number) => void;
}

export default function ItemCard({item,onSumar,onRestar,onEliminar}:ItemProps){
    return(
        <div className={itemStyle.cardContainer}>
            <div style={{display:"flex",width:"60%",justifyContent:"space-between"}}>
                <div className={itemStyle.basicInfoContainer}>
                    <p>{item.nombre}</p>
                    <p style={{marginRight:"auto"}}>${item.precioUnitario} c/u</p>
                </div>

                <div className={itemStyle.cantContainer}>
                    <p>{item.cantidad}</p>
                    <div className={itemStyle.buttonContainer}>
                        <button style={{backgroundColor:"#06B50E"}} onClick={() => onSumar(item.idProd,item.cantidad+1)}>
                            <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                        <button style={{backgroundColor:"#546e7a"}} onClick={() => onRestar(item.idProd,item.cantidad-1)}>
                            <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                                <path d="M5 12h14" />
                            </svg>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className={itemStyle.subtotalContainer}>
                <p>$ {item.subtotal}</p>
                <button className={itemStyle.deleteButton} onClick={()=> onEliminar(item.idProd,0)}>
                    <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                        <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}