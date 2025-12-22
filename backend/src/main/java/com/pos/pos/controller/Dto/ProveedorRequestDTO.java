package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.Proveedor;

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
    public Proveedor aModelo(){
        return (new Proveedor(code,cuit,nombre,localidad,direccion,email,telefono,descripcion));
    }
}
