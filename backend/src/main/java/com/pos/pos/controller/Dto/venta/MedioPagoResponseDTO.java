package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.MedioPago;

public record MedioPagoResponseDTO(
        Double monto,
        MedioPago.TipoPago tipoPago
) {
    public static MedioPagoResponseDTO desdeModelo(MedioPago medioPago){
        return new MedioPagoResponseDTO(
                medioPago.getMonto(),
                medioPago.getTipoPago()
        );
    }
}
