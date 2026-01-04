package com.pos.pos.controller.Dto;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Proveedor;

import java.util.regex.Pattern;

public record ProveedorUpdatedRequestDTO(
        String code,
        String cuit,
        String nombre,
        String localidad,
        String direccion,
        String email,
        String telefono,
        String descripcion) {

    private static final Pattern soloNumeros  = Pattern.compile("^[0-9]+$");

    public Proveedor aModelo(Proveedor proveedor){

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

        proveedor.setCode(this.code);
        proveedor.setCuit(cuitNormalizado);
        proveedor.setNombre(this.nombre);
        proveedor.setLocalidad(this.localidad);
        proveedor.setDireccion(this.direccion);
        proveedor.setEmail(this.email);
        proveedor.setTelefono(telefonoNormalizado);
        proveedor.setDescripcion(this.descripcion);

        return (proveedor);
    }

    private String normalizarCuit(String valor){
        return valor.replaceAll("\\D","");
    }

    private void validarNotNull(String valor, String campo){
        if(valor==null || valor.isBlank()) throw new ParametroIncorrecto("El campo " + campo + " es obligatorio");
    }
}
