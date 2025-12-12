import styles from "../styles/ProveedoresPage.module.css";

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
                <form>
                    <h2>Complete los datos del proveedor</h2>

                    <div className={styles.labelContainer}>
                        <label>Codigo
                            <input type="text" placeholder="Codigo" />
                        </label>
                        <label>CUIT
                            <input type="number" placeholder="CUIT " />{/*TODO:CAMBIAR POR COMPONENTE NUMBERiNPUT */}
                        </label>
                        
                    </div>

                    <label>Razon Social
                        <input type="text" placeholder="Nombre" />
                    </label>
                    
                    
                    <div className={styles.labelContainer}>
                        <label>Localidad
                            <input type="text" placeholder="Localidad" />
                        </label>
                        <label>Calle y Nro
                            <input type="text" placeholder="Direccion" />
                        </label>
                    </div>
                    <div className={styles.labelContainer}>
                        <label>Email
                            <input type="email" placeholder="ejemplo@gmail.com" />
                        </label>
                        <label>Telefono
                            <input type="text" placeholder="15 1234-5678" />
                        </label>
                    </div>
                    
                    <label>Descripción
                        <textarea placeholder="Descripción de servicios"></textarea>
                    </label>

                    <button>Guardar</button>
                </form>
            </div>
            
        </div>
    )
}