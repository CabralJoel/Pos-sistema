package com.pos.pos.service;

import com.pos.pos.controller.Dto.producto.ProveedorUpdatedRequestDTO;
import com.pos.pos.modelo.Proveedor;

import java.util.List;
import java.util.Optional;

public interface ProveedorService {
    Proveedor create(Proveedor proveedor);
    Proveedor update(Long id, ProveedorUpdatedRequestDTO proveedor);
    Optional<Proveedor>findById(Long id);
    List<Proveedor>findAll();
    void delete(Long id);
}
