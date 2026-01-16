//Pages
import { Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import CargarProductos from "../pages/CargarProductos";
import NavLayout from "../NavLayout";
import Proveedores from "../pages/ProveedoresPage";
import Caja from "../pages/CajaPage";
//cambiar el elemento del inventario
export  function AppRoutes(){
    return(
        <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/caja" element={<Caja/>}/>
             
             <Route element={<NavLayout/>}> {/*las rutas dentro del NavLayout utilizan este nav*/}
                <Route path="/carga" element={<CargarProductos/>}/>
                <Route path="/proveedores" element={<Proveedores/>}/>
                <Route path="/inventario" element={<Proveedores/>}/>
             </Route>
        </Routes>

    )
}