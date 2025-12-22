package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.Proveedor;

public record ProveedorResponseDTO(Long id, String code,String cuit,String nombre, String localidad,
                                   String direccion,String email,String telefono,String descripcion) {

    public  static ProveedorResponseDTO desdeModelo(Proveedor proveedor){
        return new ProveedorResponseDTO(
                proveedor.getId(),
                proveedor.getCode(),
                proveedor.getCuit(),
                proveedor.getNombre(),
                proveedor.getLocalidad(),
                proveedor.getDireccion(),
                proveedor.getEmail(),
                proveedor.getTelefono(),
                proveedor.getDescripcion()
        );
    }
}
