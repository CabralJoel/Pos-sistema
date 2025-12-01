package com.pos.pos.controller.Dto;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Producto;

public class ProductoRequestDTO {
    String nombre;
    String codigo;
    Double precio;
    Integer stock;


    public Producto aModelo(){
        if(nombre==null || codigo==null||precio==null||stock==null)throw new ParametroIncorrecto("faltan ingresar datos");
        if(precio<=0)throw new ParametroIncorrecto("ingrese un monto mayor a 0");
        if(stock<=0)throw new ParametroIncorrecto("ingrese un stock mayor a 0");

        return new Producto(codigo,nombre,precio,stock);
    }
}
