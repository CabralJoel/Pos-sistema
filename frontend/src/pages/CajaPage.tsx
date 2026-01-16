import BarraCargarProducto from "../components/caja/BarraCargarProducto"
import ListaProdVenta from "../components/caja/ListaProdVentas"
import TotalVenta from "../components/caja/TotalVenta"
import OpcionesCaja from "../components/caja/OpcionesCaja"
import { useState } from "react"

import type { ItemVentaDTO } from "../types/ventas"

import styles from "../styles/cajaPage/CajaPage.module.css"

export default function Caja(){
    const [itemList,setItemList] = useState<ItemVentaDTO[]>([]);

    return(
        <div className={styles.pageContainer}>
            <div></div>
            <BarraCargarProducto/>
            <div className={styles.infoContainer}>
                <ListaProdVenta items={itemList}/>
                <TotalVenta/>
            </div>
            <OpcionesCaja/>
        </div>
    )
}