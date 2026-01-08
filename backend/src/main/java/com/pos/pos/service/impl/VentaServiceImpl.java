package com.pos.pos.service.impl;

import com.pos.pos.modelo.venta.Venta;
import com.pos.pos.persistencia.interfaces.VentaRepository;
import com.pos.pos.service.VentaService;

import java.util.List;
import java.util.Optional;

public class VentaServiceImpl implements VentaService {
    VentaRepository ventaRepository;

    public VentaServiceImpl(VentaRepository ventaRepository){
        this.ventaRepository = ventaRepository;
    }

    public Venta create(Venta venta){
        return ventaRepository.save(venta);
    }

    public Venta upgrade(Venta venta){
        return ventaRepository.save(venta);
    }

    public Optional<Venta> findById(Long id){
        return ventaRepository.findById(id);
    }

    public List<Venta> findAll(){
        return ventaRepository.findAll();
    }

    public void delete(Long id){
        ventaRepository.deleteById(id);
    }

    public Venta registrarProductoEnVenta(Long ventaid,String productoCode, Integer cantidad){
        return null;
    }
}
