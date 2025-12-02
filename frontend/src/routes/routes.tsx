//Pages
import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import CargarProductos from "../pages/CargarProductos"

export  function AppRoutes(){
    return(
        <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/carga" element={<CargarProductos/>}/>
        </Routes>

    )
}