package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.Venta;

import java.time.LocalDateTime;
import java.util.List;

public record VentaResponseDTO(Long id, LocalDateTime fechaCreacion, Double total,
                               EstadoVenta estado,
                               List<ItemVentaResponseDTO> productos) {
    public static VentaResponseDTO desdeModelo(Venta venta){
        return new VentaResponseDTO(
                venta.getId(),
                venta.getFechaCreacion(),
                venta.getTotal(),
                venta.getEstado(),
                venta.getItems().stream().map(ItemVentaResponseDTO :: desdeModelo).toList()
        );
    }
}
