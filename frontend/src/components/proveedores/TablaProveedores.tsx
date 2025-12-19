import type {ProveedorResponse} from "../../types/proveedor";
import tableStyles from "../../styles/proveedoresPage/TablaProveedores.module.css"

interface props {
    proveedores?:ProveedorResponse[];
}


export default function proveedorTable({proveedores}: props){
    const sinDatos= !proveedores || proveedores?.length===0;

    const emptyRows=15;
    const filasVacias = emptyRows;
    if(proveedores){
        const filasVacias = emptyRows - proveedores.length;
    };

    if(sinDatos){
        return(
            <div className={tableStyles.emptyContainer}><p className={tableStyles.empty}>No se encontraron proveedores</p></div>
        );
    };

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
                <tr>
                    <td>alfa</td>
                    <td>razon anonima</td>
                    <td>20 4113250 0</td>
                    <td>florencio varela</td>
                    <td>11 1234-1234</td>
                </tr>
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