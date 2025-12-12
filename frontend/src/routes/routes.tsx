//Pages
import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import CargarProductos from "../pages/CargarProductos"
import NavLayout from "../NavLayout"
import Proveedores from "../pages/ProveedoresPage"

export  function AppRoutes(){
    return(
        <Routes>
             <Route path="/" element={<Home />} />
             <Route element={<NavLayout/>}>
                <Route path="/carga" element={<CargarProductos/>}/>
                <Route path="/proveedores" element={<Proveedores/>}/>
             </Route>
             
        </Routes>

    )
}