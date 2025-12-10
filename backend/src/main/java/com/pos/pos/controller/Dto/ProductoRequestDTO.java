package com.pos.pos.controller.Dto;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Producto;

public record ProductoRequestDTO(
        String proveedor,
        String nombre,
        String code,
        Double precio,
        Integer stock,
        Double ganancia,
        Double costo
) {



    public Producto aModelo(){
        if(nombre==null || code==null||precio==null||stock==null)throw new ParametroIncorrecto("faltan ingresar datos");
        if(precio<=0)throw new ParametroIncorrecto("El precio debe ser mayor a 0");
        if(stock<=0)throw new ParametroIncorrecto("El stock debe ser mayor a 0");

        return new Producto(code,nombre,precio,stock,proveedor);
    }
}
