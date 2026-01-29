package com.pos.pos.controller.Dto.venta;


import java.util.List;

public record VentaRequestDTO(
        List<MedioPagoDTO> mediosDePago,
        List<ItemVentaRequestDTO> items
) {
}
