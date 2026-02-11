package com.pos.pos.controller.Dto.producto;

import com.pos.pos.modelo.Producto;

public record ProductoResponseDTO(Long idProducto,String code,String nombre,Double precio,Integer stock) {


    public static ProductoResponseDTO desdeModelo(Producto producto){
        return new ProductoResponseDTO(
                producto.getId(),
                producto.getCode(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getStock()
        );
    }
}
