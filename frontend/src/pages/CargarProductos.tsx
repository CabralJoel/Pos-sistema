import styles from "../styles/CargarProductos.module.css"
import { NumberInput} from "../components/NumberInput";

export default function CargarProductos(){
    const emptyRows=20;



    return(
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h2>Ingrese informacion del Producto</h2>

                <label>Proveedor
                    <input type="text" placeholder="Proveedor"/>
                </label>

                <form className={styles.form}>

                    <label>Codigo
                        <input type="text"  placeholder="Codigo del producto"/>
                    </label>

                    <label>Nombre
                        <input type="text" placeholder="Nombre del producto"/>
                    </label>
                    <div className={styles.inputContainer}>
                        <label>Costo
                            <NumberInput placeholder="Costo"/>
                        </label>
                        <label>Cantidad
                            <NumberInput placeholder="Stock" decimal={false}/>
                        </label>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Precio
                            <NumberInput placeholder="Precio"/>
                        </label>

                        <label>Ganancia
                            <div className={styles.inputWrapper}>
                                <input type="number" placeholder="%"/>
                                <span>%</span>
                            </div>
                        </label>
                    </div>
                    
                    <button type="button" className={styles.submitButton}>Guardar</button>
                </form>
            </div>
            {/*LISTA DE PRODUCTOS CARADOS */}
            <div className={styles.pListContainer}>
                <h2>Productos Cargados</h2>
                <div className={styles.pList}>
                    <table>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Ganancia</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div className={styles.confirmContainer}>
                    <input type="text" />{/*cambiar input*/}
                    <button type="button" className={styles.submitButton}>Guardar Productos</button>
                </div>
            </div>

        </div>
    )
}