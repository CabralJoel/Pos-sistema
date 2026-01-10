package com.pos.pos.service.impl;

import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.venta.Venta;
import com.pos.pos.persistencia.interfaces.ProductoRepository;
import com.pos.pos.persistencia.interfaces.VentaRepository;
import com.pos.pos.service.VentaService;

import java.util.List;
import java.util.Optional;

public class VentaServiceImpl implements VentaService {
    VentaRepository ventaRepository;
    ProductoRepository productoRepository;

    public VentaServiceImpl(VentaRepository ventaRepository,ProductoRepository productoRepository){
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;

    }

    @Override
    public Venta create(Venta venta){
        return ventaRepository.save(venta);
    }

    @Override
    public Venta upgrade(Venta venta){
        return ventaRepository.save(venta);
    }

    @Override
    public Optional<Venta> findById(Long id){
        return ventaRepository.findById(id);
    }

    @Override
    public List<Venta> findAll(){
        return ventaRepository.findAll();
    }

    @Override
    public void delete(Long id){
        ventaRepository.deleteById(id);
    }

    @Override
    public Venta registrarProductoEnVenta(String productoCode, int cantidad){
        Producto producto = productoRepository.findByCode(productoCode)
                .orElseThrow(()->new ElementoNoEncontrado("No se encontro el producto ingresado"));

        Optional<Venta> optionalVenta = ventaRepository.findByAbierta();
        if(optionalVenta.isEmpty()){
            Venta nuevaVenta = new Venta();
            nuevaVenta.agregarProducto(producto,cantidad);
            return ventaRepository.save(nuevaVenta);
        }

        Venta ventaAbierta = optionalVenta.get();
        ventaAbierta.agregarProducto(producto,cantidad);

        return ventaAbierta;
    }

    @Override
    public Venta reducirProducto(String productoCode,int cantidad){
        Producto producto = productoRepository.findByCode(productoCode)
                .orElseThrow(()->new ElementoNoEncontrado("No se encontro el producto ingresado"));

        Venta ventaAbierta = ventaRepository.findByAbierta().
                orElseThrow(()->new ElementoNoEncontrado("No hay ninguna venta abierta"));

        ventaAbierta.reducirProducto(productoCode,cantidad);

        return ventaAbierta;
    }

    @Override
    public Venta eliminarProducto(String productoCode){
        Producto producto = productoRepository.findByCode(productoCode)
                .orElseThrow(()->new ElementoNoEncontrado("No se encontro el producto ingresado"));

        Venta ventaAbierta = ventaRepository.findByAbierta().
                orElseThrow(()->new ElementoNoEncontrado("No hay ninguna venta abierta"));

        ventaAbierta.eliminarProducto(productoCode);

        return ventaAbierta;
    }
}
