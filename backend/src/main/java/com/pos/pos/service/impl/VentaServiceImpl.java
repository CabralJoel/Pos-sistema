package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.venta.ItemVentaRequestDTO;
import com.pos.pos.controller.Dto.venta.MedioPagoDTO;
import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.controller.exception.EstadoInvalidoException;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.turno.EstadoTurno;
import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.ItemVenta;
import com.pos.pos.modelo.venta.MedioPago;
import com.pos.pos.modelo.venta.Venta;
import com.pos.pos.persistencia.interfaces.ProductoRepository;
import com.pos.pos.persistencia.interfaces.TurnoRepository;
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
    TurnoRepository turnoRepository;

    public VentaServiceImpl(VentaRepository ventaRepository,ProductoRepository productoRepository,TurnoRepository turnoRepository){
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;
        this.turnoRepository = turnoRepository;

    }

    @Override
    public Venta create(Long idTurno,VentaRequestDTO ventaDTO){
        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(()->new ElementoNoEncontrado("El turno de la venta no existe"));
        if(turno.getEstado()== EstadoTurno.CERRADO){
            throw  new EstadoInvalidoException("El turno ya termino, inicie un nuevo turno");}

        Venta venta = new Venta(turno);

        List<ItemVentaRequestDTO> itemsDtos = ventaDTO.items();
        List<MedioPagoDTO> mediosDePagoDtos = ventaDTO.mediosDePago();

        List<MedioPago> mediosDePago = new ArrayList<>();
        List<ItemVenta> items = new ArrayList<>();

        for(ItemVentaRequestDTO item : itemsDtos){
            ItemVenta itemCreado = crearItemVenta(venta,item);
            items.add(itemCreado);
        }

        for(MedioPagoDTO medioPago : mediosDePagoDtos){
            MedioPago medioPagoCreado = new MedioPago(venta,medioPago.tipoPago(),medioPago.monto());
            mediosDePago.add(medioPagoCreado);
        }

        venta.agregarProductos(items);
        venta.agregarMediosDePago(mediosDePago);

        venta.concretarVenta();
        turno.agregarVenta(venta);

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

        if(ventaRecuperada.getEstado() == EstadoVenta.ANULADA) throw new EstadoInvalidoException("La venta ya fue anulada anteriormente");

        ventaRecuperada.anularVenta(motivo);

        return ventaRepository.save(ventaRecuperada);
    }

    private ItemVenta crearItemVenta(Venta venta,ItemVentaRequestDTO itemDto){
        if(itemDto.idProducto() == null){
            return new ItemVenta(venta,itemDto.precioUnitario());
        }
        else{
            Producto producto = productoRepository.findById(itemDto.idProducto()).
                    orElseThrow(() -> new ElementoNoEncontrado("El producto ingresado no existe"));

            return new ItemVenta(venta,producto, itemDto.cantidad());
        }
    }
}
