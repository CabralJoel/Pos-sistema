import type {Proveedor} from "../../types/proveedor";
import tableStyles from "../../styles/proveedoresPage/TablaProveedores.module.css"

interface props {
    proveedores?:Proveedor[];
}


export default function proveedorTable({proveedores}: props){
    const sinDatos= !proveedores || proveedores?.length===0;

    if(sinDatos){
        return(
            <div className={tableStyles.emptyContainer}><p className={tableStyles.empty}>No se encontraron proveedores</p></div>
        );
    };

    return(
        <table>
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
            </tbody>
        </table>
    )
}