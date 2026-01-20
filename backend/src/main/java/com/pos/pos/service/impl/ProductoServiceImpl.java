package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.ProductoRequestDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.persistencia.interfaces.ProductoRepository;
import com.pos.pos.persistencia.interfaces.ProveedorRepository;
import com.pos.pos.service.ProductoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional

public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;

    public ProductoServiceImpl (ProductoRepository productoRepository,ProveedorRepository proveedorRepository){
        this.productoRepository = productoRepository;
        this.proveedorRepository = proveedorRepository;
    }

    @Override
    public Producto create(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    @Override
    public Optional<Producto> findByCode(String code) {
        return productoRepository.findByCode(code);
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
    public void delete(Long id) {
        productoRepository.deleteById(id);
    }

    @Override
    public List<Producto> cargarProductos(List<ProductoRequestDTO> productosDtos){
        return productosDtos.stream().map(this::cargarProducto).toList();
    }

    @Override
    public List<Producto> buscarProductosFiltrados(String filtro){
        List<Producto> busqueda = productoRepository.buscarPorNombreOCode(filtro);
        return busqueda;
    }

    public Producto cargarProducto(ProductoRequestDTO productoDto){

        Proveedor proveedor = proveedorRepository.findById(productoDto.proveedor())
                .orElseThrow(() ->new ElementoNoEncontrado("No existe el proveedor seleccionado"));

        Producto productoNuevo = productoDto.aModelo(proveedor);

        Optional<Producto> optionalProducto = productoRepository.findByCode(productoNuevo.getCode());

        if(optionalProducto.isEmpty()){
            return productoRepository.save(productoNuevo);
        }

        Producto existente = optionalProducto.get();

        existente.setPrecio(productoNuevo.getPrecio());
        existente.sumarStock(productoNuevo.getStock());
        existente.setNombre(productoNuevo.getNombre());
        existente.setProveedor(productoNuevo.getProveedor());

        return productoRepository.save(existente);
    }
}
