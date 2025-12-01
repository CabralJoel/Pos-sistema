package com.pos.pos.service;

import com.pos.pos.modelo.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {
    Producto create(Producto producto);
    void update(Producto producto);
    Optional<Producto> findById(String codigo);
    List<Producto> findAll();
    void delete (String code);
    List<Producto> cargarProductos(List<Producto> productos);
}
