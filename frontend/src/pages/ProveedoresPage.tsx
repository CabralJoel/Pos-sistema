import styles from "../styles/proveedoresPage/ProveedoresPage.module.css";
import FormProveedor from "../components/proveedores/FormProveedor";
import DetallesProveedor from "../components/proveedores/DetallesProveedor";
import TablaProveedores from "../components/proveedores/TablaProveedores"

export default function proveedores(){

    return(
        <div className={styles.container}>
            <div className={styles.optionContainer}>
                <div className={styles.buttonContainer}>
                    <button className={styles.optionButton}>Proveedores</button>
                    <button className={styles.optionButton}>Nuevo Proveedor</button>
                </div>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type="text" placeholder="Buscar proveedor" />
                    <button className={styles.optionButton}>Buscar</button>
                </div>
                
                
            </div>

            {/*FORM SECCTION */}
            <div className={styles.formContainer}>
                <TablaProveedores/>
            </div>
            
            
        </div>
    )
}