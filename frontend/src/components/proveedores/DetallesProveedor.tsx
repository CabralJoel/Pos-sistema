import detailStyles from "../../styles/proveedoresPage/DetallesProveedor.module.css";
import type { ProveedorResponse } from "../../types/proveedor";

interface props {
    proveedor?: ProveedorResponse;
    onEdit?: ()=>void;
}


export default function DetallesProveedor ({proveedor,onEdit}:props){ 

    if(!proveedor){
        return(
            <div className={detailStyles.emptyContainer}><p className={detailStyles.empty}>Ingrese un proveedor existente</p></div>
        );
    }

    const descripcion = proveedor.descripcion?.trim()|| "Sin Descripcion";
    return(
        <div className={detailStyles.detailContiner}>
            <h2>Detalles de proveedor</h2>

            <div className={detailStyles.details}>
                <div className={detailStyles.infoContainer}>
                    <p>Codigo: {proveedor.code}</p>
                    <p>CUIT: {proveedor.cuit}</p>
                </div>
                <p>Razon social: {proveedor.nombre}</p>
                <p>Direccion: {proveedor.localidad} -{proveedor.direccion}</p>
                <div className={detailStyles.infoContainer}>
                    <p>Email: {proveedor.email}</p>
                    <p>Telefono: {proveedor.telefono}</p>
                </div>
                <p className={detailStyles.descripcion}>Descripcion: {descripcion}</p>
                <div>
                    <button className={detailStyles.editButton} type="button" onClick={onEdit}>Editar</button>
                </div>
                
            </div>
        </div>
    )
}