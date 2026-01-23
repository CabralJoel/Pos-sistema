package com.pos.pos.controller.Dto.venta;

public record ItemVentaRequestDTO(
        Long idProducto,
        int cantidad,
        Double precioUnitario
) {

}
