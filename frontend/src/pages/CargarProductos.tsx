import styles from "../styles/CargarProductos.module.css"
import { NumberInput} from "../components/NumberInput";


export default function CargarProductos(){
    return(
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h2>Ingrese informacion del Producto</h2>

                <form className={styles.form}>

                    <label className={styles.label}>Codigo
                        <input type="text"  placeholder="Codigo del producto"/>
                    </label>

                    <label className={styles.label}>Nombre
                        <input type="text" placeholder="Nombre del producto"/>
                    </label>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Costo
                            <NumberInput placeholder="Costo"/>
                        </label>
                        <label className={styles.label}>Cantidad
                            <NumberInput placeholder="Stock" decimal={false}/>
                        </label>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Precio
                            <NumberInput placeholder="Precio"/>
                        </label>

                        <label className={styles.label}>Ganancia
                            <div className={styles.inputWrapper}>
                                <input type="number" placeholder="%"/>
                                <span>%</span>
                            </div>
                        </label>
                    </div>
                    

                </form>
            </div>
            {/*LISTA DE PRODUCTOS CARADOS */}
            <div className={styles.pListContainer}>
                <h2>Productos Cargados</h2>
                <div className={styles.plist}>

                </div>
                
            </div>

        </div>
    )
}