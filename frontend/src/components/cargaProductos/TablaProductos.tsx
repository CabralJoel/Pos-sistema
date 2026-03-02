import tableStyle from "../../styles/cargaProductos/tablaProductos.module.css"
import { RiDeleteBack2Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import type { ProductoRequestDTO } from "../../types/producto";

interface listProps{
    listaProductos:ProductoRequestDTO[];
    onDelete:(i:number)=>void;
    onEdit:(i:number)=>void;
}

export default function TablaProductos({listaProductos,onDelete,onEdit}:listProps){
    const emptyRows=19;//filas vacias si no hay productos enlistados
    const filasVacias = emptyRows - listaProductos.length;

    return(
        <div className={tableStyle.pList}>
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Costo Total</th>
                        <th>Stock</th>
                        <th>Ganancia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map((p,index)=>(
                        <tr key={index}>
                            <td>{p.code}</td>
                            <td>{p.nombre}</td>
                            <td>{p.precio}</td>
                            <td>{p.costo * p.stock}</td>
                            <td>{p.stock}</td>
                            <td>{p.ganancia}%</td>
                            <td>
                                <div className={tableStyle.tdButtons}>
                                    <button style={{backgroundColor:"#83ce20"}} onClick={()=>onEdit(index)}>
                                        <RiEdit2Fill/>
                                    </button>
                                    <button style={{backgroundColor:"#ff0000",color:"white"}} onClick={()=>onDelete(index)}>
                                        <RiDeleteBack2Fill/>
                                    </button>
                                </div>
                            </td>
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
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}