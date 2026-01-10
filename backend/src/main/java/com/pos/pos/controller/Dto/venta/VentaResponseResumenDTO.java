package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.Venta;

import java.time.LocalDateTime;

public record VentaResponseResumenDTO(Long id, LocalDateTime fechaCreacion, LocalDateTime fechaCierre, Double total, EstadoVenta estado){
    public static VentaResponseResumenDTO desdeModelo(Venta venta){
        return new VentaResponseResumenDTO(
                venta.getId(),
                venta.getFechaCreacion(),
                venta.getFechaCierre(),
                venta.getTotal(),
                venta.getEstado()
        );
    }
}
