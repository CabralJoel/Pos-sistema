import formStyles from "../../styles/proveedoresPage/FormProveedor.module.css";

export default function FormProveedor(){
        return(
                <form className={formStyles.proveedorForm}>
                    <h2>Complete los datos del proveedor</h2>

                    <div className={formStyles.labelContainer}>
                        <label>Codigo
                            <input type="text" placeholder="Codigo" />
                        </label>
                        <label>CUIT
                            <input type="text" placeholder="CUIT " />
                        </label>
                        
                    </div>

                    <label>Razon Social
                        <input type="text" placeholder="Nombre" />
                    </label>
                    
                    
                    <div className={formStyles.labelContainer}>
                        <label>Localidad
                            <input type="text" placeholder="Localidad" />
                        </label>
                        <label>Calle y Nro
                            <input type="text" placeholder="Direccion" />
                        </label>
                    </div>
                    <div className={formStyles.labelContainer}>
                        <label>Email
                            <input type="email" placeholder="ejemplo@gmail.com" />
                        </label>
                        <label>Telefono
                            <input type="text" placeholder="15 1234-5678" />
                        </label>
                    </div>
                    
                    <label>Descripción
                        <textarea className={formStyles.formProvTextarea} placeholder="Descripción de servicios"></textarea>
                    </label>

                    <button>Guardar</button>
                </form>
    )
}