import {useEffect, useState } from "react";
import {toast } from "react-toastify";

import type { ProductoResponseDTO } from "../types/producto";

export interface UseProductSearchResult {
    texto: string
    setTexto: (q: string) => void
    resultados: ProductoResponseDTO[]
    selectProduct: (p: ProductoResponseDTO) => void
    clear: () => void
}

export function useBusquedaProducto(
    buscarProd: (texto: string) => Promise<ProductoResponseDTO[]>,
    onSelect?:(p:ProductoResponseDTO)=> void
    ):UseProductSearchResult{

        const [texto, setTexto] = useState("");
        const [resultados,setResultados] = useState<ProductoResponseDTO[]>([]);

        useEffect(()=>{
            if(!texto.trim()){
                setResultados([]);
                return
            }

            const timeout = setTimeout(async()=>{
                try{
                    const productos = await buscarProd(texto);
                    setResultados(productos)
                }catch(error){
                    toast.error("Hubo un error inesperado");
                }
            },250);
            return () => clearTimeout(timeout);
        },[texto,buscarProd]);

        const selectProduct = (producto:ProductoResponseDTO)=>{
            onSelect?.(producto);
            clear();
        }

        const clear = () => {
            setTexto("");
            setResultados([]);
        };

        return{
            texto,
            setTexto,
            resultados,
            selectProduct,
            clear
        };
}