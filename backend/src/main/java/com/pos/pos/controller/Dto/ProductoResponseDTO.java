package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.Producto;

public record ProductoResponseDTO(String codigo,String nombre,Double precio,Integer stock) {


    public static ProductoResponseDTO desdeModelo(Producto producto){
        return new ProductoResponseDTO(
                producto.getCode(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getStock()
        );
    }
}
