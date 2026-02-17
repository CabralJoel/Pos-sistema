import { Outlet } from "react-router-dom";
import NavButton from "./components/NavButton";
import { FaCashRegister } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { FaTruckLoading } from "react-icons/fa";

import styles from "./NavLayout.module.css";

export default function NavLayout() {
  return (
    <div className={styles.layout}>
      
      <nav className={styles.navbar}>

        <NavButton 
          icon={<FaCashRegister size={23}/>}
          to="/caja" 
          text="Caja" 
        />

        <NavButton 
          icon={<LuPackagePlus size={23}/>}
          to="/carga" 
          text="Cargar productos" 
        />

        <NavButton 
          icon={<BsBoxes size={23}/>}
          to="/" 
          text="Inventario" 
        />

        <NavButton 
          icon={<FaTruckLoading size={23}/>}
          to="/proveedores" 
          text="Proveedores"
        />

      </nav>

      {/* Contenido actual de la página */}
      <main className={styles.content}>
        <Outlet />
      </main>

    </div>
  );
}