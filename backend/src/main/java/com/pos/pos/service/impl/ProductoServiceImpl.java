package com.pos.pos.service.impl;

import com.pos.pos.modelo.Producto;
import com.pos.pos.persistencia.interfaces.ProductoRepository;
import com.pos.pos.service.ProductoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.apache.logging.log4j.ThreadContext.isEmpty;
import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

@Service
@Transactional

public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl (ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    @Override
    public Producto create(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> findById(String code) {
        return productoRepository.findById(code);
    }


    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public void update(Producto producto) {
        productoRepository.save(producto);
    }

    @Override
    public void delete(String code) {
        productoRepository.deleteById(code);
    }

    @Override
    public List<Producto> cargarProductos(List<Producto> productos){
        return productos.stream().map(this::cargarProducto).toList();
    }

    private Producto cargarProducto(Producto producto){

        Optional<Producto> optionalProducto = productoRepository.findById(producto.getCode());
        if(optionalProducto.isEmpty()){
            return productoRepository.save(producto);
        }
        Producto existente = optionalProducto.get();
        existente.setPrecio(producto.getPrecio());
        existente.sumarStock(producto.getStock());
        existente.setNombre(producto.getNombre());
        existente.setProveedor(producto.getProveedor());

        return productoRepository.save(existente);
    }
}
