package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.venta.ItemVentaRequestDTO;
import com.pos.pos.controller.Dto.venta.MedioPagoDTO;
import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.controller.exception.VentaEstadoException;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.ItemVenta;
import com.pos.pos.modelo.venta.MedioPago;
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
        List<MedioPagoDTO> mediosDePagoDtos = ventaDTO.mediosDePago();

        List<MedioPago> mediosDePago = new ArrayList<>();
        List<ItemVenta> items = new ArrayList<>();

        for(ItemVentaRequestDTO item : itemsDtos){
            ItemVenta itemCreado = crearItemVenta(item);
            items.add(itemCreado);
        }

        for(MedioPagoDTO medioPago : mediosDePagoDtos){
            MedioPago medioPagoCreado = new MedioPago(medioPago.tipoPago(),medioPago.monto());
            mediosDePago.add(medioPagoCreado);
        }

        Venta venta = new Venta(mediosDePago,items);
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

    @Override
    public Venta anularVenta(Long idVenta,String motivo){
        Venta ventaRecuperada = ventaRepository.findById(idVenta)
                .orElseThrow(()->new ElementoNoEncontrado("La venta a anular no existe"));

        if(ventaRecuperada.getEstado() == EstadoVenta.ANULADA) throw new VentaEstadoException("La venta ya fue anulada anteriormente");

        ventaRecuperada.anularVenta(motivo);

        return ventaRepository.save(ventaRecuperada);
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
