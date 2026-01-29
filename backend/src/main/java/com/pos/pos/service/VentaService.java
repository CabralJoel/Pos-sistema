package com.pos.pos.service;

import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.modelo.venta.Venta;

import java.util.List;
import java.util.Optional;

public interface VentaService {
    Venta create(VentaRequestDTO ventaDTO);
    Optional<Venta> findById(Long id);
    Venta upgrade(Venta venta);
    List<Venta> findAll();
    void delete(Long id);
    Venta anularVenta(Long id,String motivo);

}
