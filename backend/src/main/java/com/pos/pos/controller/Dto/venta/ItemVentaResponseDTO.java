package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.venta.ItemVenta;

public record ItemVentaResponseDTO(Long id, Long idProducto, String nombreProducto, Double precioUnitario,
                                   Integer cantidad, Double subtotal) {
    public static ItemVentaResponseDTO desdeModelo(ItemVenta itemVenta){
        return new ItemVentaResponseDTO(
                itemVenta.getId(),
                itemVenta.getProducto().getId(),
                itemVenta.getNombreProducto(),
                itemVenta.getPrecioUnitario(),
                itemVenta.getCantidad(),
                itemVenta.getSubtotal()
        );
    }
}
