package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.Proveedor;

public record ProveedorUpdatedRequestDTO(
        String code,
        String cuit,
        String nombre,
        String localidad,
        String direccion,
        String email,
        String telefono,
        String descripcion) {

    public Proveedor aModelo(Proveedor proveedor){

        //TODO:agregar validaciones

        proveedor.setCode(this.code);
        proveedor.setCuit(this.cuit);
        proveedor.setNombre(this.nombre);
        proveedor.setLocalidad(this.localidad);
        proveedor.setDireccion(this.direccion);
        proveedor.setEmail(this.email);
        proveedor.setTelefono(this.telefono);
        proveedor.setDescripcion(this.descripcion);

        return (proveedor);
    }
}
