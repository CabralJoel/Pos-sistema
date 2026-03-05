package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.turno.MovimientoCaja;

public record MovimientoCajaRequest(
        MovimientoCaja.Concepto concepto,
        MovimientoCaja.Tipo tipo,
        double monto,
        String descripcion
) {
}
