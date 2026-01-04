package com.pos.pos.controller.Dto;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Proveedor;

import java.util.regex.Pattern;

public record ProveedorRequestDTO(
        String code,
        String cuit,
        String nombre,
        String localidad,
        String direccion,
        String email,
        String telefono,
        String descripcion
) {
    private static final Pattern soloNumeros  = Pattern.compile("^[0-9]+$");

    public Proveedor aModelo(){
        validarNotNull(code,"Codigo");
        validarNotNull(cuit,"Cuit");
        validarNotNull(nombre,"Nombre");
        validarNotNull(localidad,"Locaidad");
        validarNotNull(direccion,"Direccion");
        validarNotNull(email,"Email");
        validarNotNull(telefono,"Telefono");

        //por ahora solo permitimos numeros
        if(!soloNumeros.matcher(cuit).matches()){throw new ParametroIncorrecto("Escriba el cuit usando solo numeros");}
        if(!soloNumeros.matcher(telefono).matches()){throw new ParametroIncorrecto("Escriba el telefono usando solo numeros");}

        String cuitNormalizado = this.normalizarCuit(cuit);//normalizacion por si viene con algo mas que numeros mas adelante
        String telefonoNormalizado = this.normalizarCuit(telefono);

        return (new Proveedor(code,cuitNormalizado,nombre,localidad,direccion,email,telefonoNormalizado,descripcion));
    }

    private String normalizarCuit(String valor){
        return valor.replaceAll("\\D","");
    }

    private void validarNotNull(String valor, String campo){
        if(valor==null || valor.isBlank()) throw new ParametroIncorrecto("El campo "+ campo +" es obligatorio");
    }
}
