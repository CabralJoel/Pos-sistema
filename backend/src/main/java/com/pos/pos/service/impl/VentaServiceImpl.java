package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.venta.ItemVentaRequestDTO;
import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.venta.ItemVenta;
import com.pos.pos.modelo.venta.Venta;
import com.pos.pos.persistencia.interfaces.ProductoRepository;
import com.pos.pos.persistencia.interfaces.VentaRepository;
import com.pos.pos.service.VentaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VentaServiceImpl implements VentaService {
    VentaRepository ventaRepository;
    ProductoRepository productoRepository;

    public VentaServiceImpl(VentaRepository ventaRepository,ProductoRepository productoRepository){
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;

    }

    @Override
    public Venta create(VentaRequestDTO ventaDTO){
        List<ItemVentaRequestDTO> itemsDtos = ventaDTO.items();
        List<ItemVenta> items = new ArrayList<>();

        for(ItemVentaRequestDTO item : itemsDtos){
            ItemVenta itemCreado = crearItemVenta(item);
            items.add(itemCreado);
        }

        Venta venta = new Venta(ventaDTO.medioPago(),items);
        venta.concretarVenta();

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

    private ItemVenta crearItemVenta(ItemVentaRequestDTO itemDto){
        if(itemDto.idProducto() == null){
            return new ItemVenta(itemDto.precioUnitario());
        }
        else{
            Producto producto = productoRepository.findById(itemDto.idProducto()).
                    orElseThrow(() -> new ElementoNoEncontrado("El producto ingresado no existe"));

            return new ItemVenta(producto, itemDto.cantidad());
        }
    }
}
