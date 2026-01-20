package com.pos.pos.service;

import com.pos.pos.controller.Dto.ProductoRequestDTO;
import com.pos.pos.modelo.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {
    Producto create(Producto producto);
    void update(Producto producto);
    Optional<Producto> findById(Long id);
    Optional<Producto> findByCode(String code);
    List<Producto> findAll();
    void delete (Long id);
    List<Producto> cargarProductos(List<ProductoRequestDTO> productosDtos);
    Producto cargarProducto(ProductoRequestDTO productoDto);
    List<Producto> buscarProductosFiltrados(String filtro);
}
