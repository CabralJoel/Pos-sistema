import type { ProductoResponseDTO } from "../types/producto";

const API_URL = "http://localhost:8080";

export async function buscarProductos(texto: string): Promise<ProductoResponseDTO[]> {

    const response = await fetch(`${API_URL}/productos/buscar/filtrar/${encodeURIComponent(texto)}`);

    if (!response.ok) {
        throw new Error("Error buscando productos");
    }

    return response.json();
}

export async function obtenerProductoIndividual(texto: string): Promise<ProductoResponseDTO> {

    const response = await fetch(`${API_URL}/productos/buscar/${texto}`);

    if (!response.ok) {
        throw new Error("Error obteniendo producto");
    }

    return response.json();
}