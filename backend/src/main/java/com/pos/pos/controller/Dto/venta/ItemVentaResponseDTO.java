package com.pos.pos.controller.Dto.venta;

import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.venta.ItemVenta;

public record ItemVentaResponseDTO(Long id, Long idProducto, String nombreProducto, Double precioUnitario,
                                   Integer cantidad, Double subtotal) {
    public static ItemVentaResponseDTO desdeModelo(ItemVenta itemVenta){
        Producto producto = itemVenta.getProducto();

        return new ItemVentaResponseDTO(
                itemVenta.getId(),
                producto != null ? producto.getId() : null,
                itemVenta.getNombreProducto(),
                itemVenta.getPrecioUnitario(),
                itemVenta.getCantidad(),
                itemVenta.getSubtotal()
        );
    }
}
