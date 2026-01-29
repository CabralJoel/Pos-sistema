package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.MedioPago;

public record MedioPagoDTO(
        MedioPago.TipoPago tipoPago,
        Double monto
) {
}
