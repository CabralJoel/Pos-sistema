import NavButton from "../NavButton";
import { LuPackagePlus } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { FaTruckLoading } from "react-icons/fa";

export default function BarraNavegacionCaja(){
    return (
        <div style={{backgroundColor:"rgb(63, 63, 63)",color:"white",display:"flex",flexDirection:"column",minWidth:"3.6rem"
        ,gap:"1.5em",padding:"3em 0.4em"}}>
            <NavButton to="/carga" tooltip="Cargar Productos" icon={<LuPackagePlus size={23}/>}/>
            <NavButton to="/proveedores" tooltip="Proveedores" icon={<FaTruckLoading size={23}/>}/>
            <NavButton to="/inventario" tooltip="Inventario" icon={<BsBoxes size={23}/>}/>
        </div>
    )
}