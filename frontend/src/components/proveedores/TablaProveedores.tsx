import type {ProveedorResponse} from "../../types/proveedor";
import tableStyles from "../../styles/proveedoresPage/TablaProveedores.module.css"

interface props {
    proveedores?:ProveedorResponse[];
}


export default function proveedorTable({proveedores}: props){
    const sinDatos= !proveedores || proveedores?.length===0;

    if(sinDatos){
        return(
            <div className={tableStyles.emptyContainer}><p className={tableStyles.empty}>No se encontraron proveedores</p></div>
        );
    };

    const emptyRows=16;
    const filasVacias = Math.max(emptyRows - proveedores.length, 0);

    return(
        <table className={tableStyles.proveedorTable}>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>CUIT</th>
                    <th>Localidad</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                {proveedores.map((p)=>(
                    <tr key={p.id}>
                        <td>{p.code}</td>
                        <td>{p.nombre}</td>
                        <td>{p.cuit}</td>
                        <td>{p.localidad}</td>
                        <td>{p.telefono}</td>
                    </tr>
                ))}
                {/*filas vacias */}
                {Array.from({ length: filasVacias }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}