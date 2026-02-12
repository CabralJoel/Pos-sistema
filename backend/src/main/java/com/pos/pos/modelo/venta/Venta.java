package com.pos.pos.modelo.venta;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.controller.exception.EstadoInvalidoException;
import com.pos.pos.modelo.turno.Turno;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turno_id",nullable = false)
    private Turno turno;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = false)
    private Double total;

    @OneToMany(mappedBy = "venta",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<MedioPago> mediosDePago = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado;

    @OneToMany(mappedBy = "venta",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ItemVenta> items = new ArrayList<>();

    @Column
    private String motivoAnulacion;

    //se puede agregar la caja a la que pertenece la venta en el construcor
    public Venta (Turno turno){
        this.setTurno(turno);
        this.estado = EstadoVenta.ABIERTA;
        this.fechaCreacion = LocalDateTime.now();

    }

    public void agregarMedioPago(MedioPago medioPago){
        if (estado != EstadoVenta.ABIERTA){
            throw new EstadoInvalidoException("La venta debe estar abierta para agregar medios de pago");
        }
        medioPago.setVenta(this);
        mediosDePago.add(medioPago);
    }

    public void agregarMediosDePago(List<MedioPago> mediosDePago){
        for(MedioPago mp : mediosDePago){
            agregarMedioPago(mp);
        }
    }

    public void agregarProducto(ItemVenta item){
        if (estado != EstadoVenta.ABIERTA){
            throw new EstadoInvalidoException("La venta debe estar abierta para agregar medios de pago");
        }
        item.setVenta(this);
        items.add(item);
        //this.calcularTotal();//por ahora no lo uso porque creo la venta finalizada
    }

    public void agregarProductos(List<ItemVenta> productos){
        for(ItemVenta item : productos){
            this.agregarProducto(item);
        }
        this.calcularTotal();
    }

    private void calcularTotal(){
        this.total = items.stream().mapToDouble(ItemVenta::getSubtotal).sum();
    }

    public void concretarVenta(){
        if(this.estado != EstadoVenta.ABIERTA){
            throw new EstadoInvalidoException("La venta no se encuentra abierta");
        }
        if(items.isEmpty())new ParametroIncorrecto("No hay productos en la venta");

        this.calcularTotal();

        for(ItemVenta item : items){
            item.reducirStock();
        }
        validarMedioPago(mediosDePago);
        this.estado = EstadoVenta.FINALIZADA;
    }

    public void anularVenta(String motivo){
        if(this.estado == EstadoVenta.ANULADA){
            throw new EstadoInvalidoException("La venta se encuentra anulada");
        }

        this.motivoAnulacion = motivo;
        this.estado = EstadoVenta.ANULADA;
    }

    private void validarMedioPago(List<MedioPago> mediosDePago){
        if(mediosDePago.isEmpty())new ParametroIncorrecto(("Seleccione un medio de pago"));

        Double suma = mediosDePago.stream().mapToDouble(MedioPago::getMonto).sum();

        if(suma != this.total)new ParametroIncorrecto(("Faltan pagos por realizar en la venta"));

    }
}
