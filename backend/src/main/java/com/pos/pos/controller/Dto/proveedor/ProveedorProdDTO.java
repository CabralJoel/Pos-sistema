package com.pos.pos.controller.Dto.proveedor;

import com.pos.pos.modelo.Proveedor;

public record ProveedorProdDTO(
        Long id,
        String code
) {
    public static ProveedorProdDTO desdeModelo(Proveedor proveedor){
        return new ProveedorProdDTO(proveedor.getId(), proveedor.getCode());
    }
}
