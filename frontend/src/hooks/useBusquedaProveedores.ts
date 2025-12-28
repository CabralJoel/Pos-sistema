import { useState } from "react";
import {toast} from "react-toastify";
import type { ProveedorResponse } from "../types/proveedor";

const normalizar =(texto:string) => texto.toLocaleLowerCase().replace(/[^a-z0-9]/gi, "").trim();

type useBusquedaProps = {
    proveedores:ProveedorResponse[];
    onSelect: (proveedor?:ProveedorResponse)=>void;
};

export function useBusquedaProveedores({
    proveedores,
    onSelect,
}:useBusquedaProps){
    const [busqueda,setBusqueda] = useState("");
    const [sugerencias,setSugerencias] = useState<ProveedorResponse[]>([]);

    const filtrar = (texto:string) => {
        const normalizado = normalizar(texto);
        if(!normalizado){
            return[]
        }
        return proveedores.filter(p => 
            normalizar(p.code).includes(normalizado)||
            normalizar(p.nombre).includes(normalizado) ||
            normalizar(p.cuit).includes(normalizado));
    } ;

    const actualizarBusqueda = (texto:string) => {
        setBusqueda(texto);

        const resultados = filtrar(texto);
        setSugerencias(resultados.slice(0,5));
    }

    const confirmarBusqueda = () => {
        const resultados = filtrar(busqueda);

        if(resultados.length===1){
            seleccionar(resultados[0]);
            return;
        }
        if(resultados.length===0){
            seleccionar(undefined);
            return;
        }

        toast.info("Seleccione un proveedor sugerido")
    }

    const seleccionar = (proveedor?:ProveedorResponse) => {
        onSelect(proveedor)
        setBusqueda("");
        setSugerencias([]);
    }

    return{
        busqueda,
        sugerencias,
        actualizarBusqueda,
        confirmarBusqueda,
        seleccionar,
    };
}