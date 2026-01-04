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
        validarNotNull(proveedor,"Proveedor");
        validarNotNull(nombre,"Proveedor");
        validarNotNull(code,"Proveedor");
        validarNotNullD(precio,"Proveedor");
        if(stock==null || stock<=0){throw new ParametroIncorrecto("Ingrese un stock mayor a 0");}
        validarNotNullD(ganancia,"Proveedor");
        validarNotNullD(costo,"Proveedor");

        return new Producto(code,nombre,precio,stock,proveedor);
    }

    private void validarNotNull(String valor, String campo){
        if(valor==null || valor.isBlank()) throw new ParametroIncorrecto("El campo " + campo + " es obligatorio");
    }

    private void validarNotNullD(Double valor, String campo){
        if(valor==null || valor<=0) throw new ParametroIncorrecto("Ingrese un " + campo + " mayor a 0");
    }
}
