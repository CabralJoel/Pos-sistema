package com.pos.pos.controller.Dto.producto;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;

public record ProductoRequestDTO(
        Long proveedor,
        String nombre,
        String code,
        Double precio,
        Integer stock,
        Double ganancia,
        Double costo
) {

    public Producto aModelo(Proveedor prov){
        validarNotNull(nombre,"Proveedor");
        validarNotNull(code,"Proveedor");
        validarNotNullD(precio,"Proveedor");
        if(stock==null || stock<=0){throw new ParametroIncorrecto("Ingrese un stock mayor a 0");}
        validarNotNullD(ganancia,"Proveedor");
        validarNotNullD(costo,"Proveedor");

        return new Producto(code,nombre,precio,stock,prov);
    }

    private void validarNotNull(String valor, String campo){
        if(valor==null || valor.isBlank()) throw new ParametroIncorrecto("El campo " + campo + " es obligatorio");
    }

    private void validarNotNullD(Double valor, String campo){
        if(valor==null || valor<=0) throw new ParametroIncorrecto("Ingrese un " + campo + " mayor a 0");
    }
}
