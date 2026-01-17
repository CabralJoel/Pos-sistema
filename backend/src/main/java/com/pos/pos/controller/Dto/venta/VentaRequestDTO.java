package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.MedioPago;

import java.util.List;

public record VentaRequestDTO(
        MedioPago medioPago,
        List<ItemVentaRequestDTO> items
) {
}
