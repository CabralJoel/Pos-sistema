package com.pos.pos.modelo.venta;

import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.controller.exception.VentaEstadoException;
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

    @Enumerated(EnumType.STRING)
    private MedioPago medioPago;

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado;

    @OneToMany(mappedBy = "venta",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ItemVenta> items = new ArrayList<>();

    @Column
    private String motivoAnulacion;

    //se puede agregar la caja a la que pertenece la venta en el construcor
    public Venta (MedioPago medioPago,List<ItemVenta> items){
        if(items.isEmpty())new ParametroIncorrecto("No hay productos en la venta");

        this.estado = EstadoVenta.ABIERTA;
        this.medioPago = medioPago;
        this.fechaCreacion = LocalDateTime.now();

        items.forEach(this::agregarProducto);

        this.calcularTotal();
    }

    public void agregarProducto(ItemVenta item){
        item.setVenta(this);
        items.add(item);
        this.calcularTotal();
    }

    private void calcularTotal(){
        this.total = items.stream().mapToDouble(ItemVenta::getSubtotal).sum();
    }

    public void concretarVenta(){
        if(this.estado == EstadoVenta.FINALIZADA){
            throw new VentaEstadoException("La venta ya fue concretada");
        }
        for(ItemVenta item : items){
            item.reducirStock();
        }
        this.estado = EstadoVenta.FINALIZADA;
    }

    public void anularVenta(String motivo){
        this.motivoAnulacion = motivo;
        this.estado = EstadoVenta.ANULADA;
    }
}
