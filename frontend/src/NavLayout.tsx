import { Outlet } from "react-router-dom";
import NavButton from "./components/NavButton";

import styles from "./NavLayout.module.css";

export default function NavLayout() {
  return (
    <div className={styles.layout}>
      
      <nav className={styles.navbar}>

        <NavButton 
          icon="/icons/home.png" 
          to="/" 
          text="Caja" 
        />

        <NavButton 
          icon="/icons/carga.png" 
          to="/carga" 
          text="Cargar productos" 
        />

        <NavButton 
          icon="/icons/inventario.png" 
          to="/inventario" 
          text="Inventario" 
        />

        <NavButton 
          icon="/icons/proveedores.png" 
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