import itemStyle from "../../styles/cajaPage/ItemCard.module.css"

export default function ItemCard(){
    return(
        <div className={itemStyle.cardContainer}>
            <div style={{display:"flex",width:"60%",justifyContent:"space-between"}}>
                <div className={itemStyle.basicInfoContainer}>
                    <p>articuloNombre</p>
                    <p style={{marginRight:"auto"}}>$ 3.000 c/u</p>
                </div>

                <div className={itemStyle.cantContainer}>
                    <p>12</p>
                    <div className={itemStyle.buttonContainer}>
                        <button style={{backgroundColor:"#06B50E"}}>
                            <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                        <button style={{backgroundColor:"#546e7a"}}>
                            <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                                <path d="M5 12h14" />
                            </svg>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className={itemStyle.subtotalContainer}>
                <p>$ 20.000</p>
                <button className={itemStyle.deleteButton}>
                    <svg viewBox="0 0 24 24" className={itemStyle.icon}>
                        <path d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}