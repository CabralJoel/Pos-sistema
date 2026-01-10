package com.pos.pos.service;

import com.pos.pos.modelo.venta.Venta;

import java.util.List;
import java.util.Optional;

public interface VentaService {
    Venta create(Venta venta);
    Optional<Venta> findById(Long id);
    Venta upgrade(Venta venta);
    List<Venta> findAll();
    void delete(Long id);
    Venta registrarProductoEnVenta(String productoCode,int cantidad);
    Venta reducirProducto(String code,int cantidad);
    Venta eliminarProducto(String code);

}
