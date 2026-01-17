package com.pos.pos.modelo.venta;

import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.modelo.Producto;
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

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private MedioPago medioPago;

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ItemVenta> productos = new ArrayList<>();

    //se puede agregar la caja a la que pertenece la venta en el construcor
    public Venta (MedioPago medioPago,List<ItemVenta> items){
        if(items.isEmpty())new ParametroIncorrecto("No hay productos en la venta");

        this.estado = EstadoVenta.FINALIZADA;
        this.medioPago = medioPago;
        this.fechaCreacion = LocalDateTime.now();

        productos.forEach(this::agregarProducto);

        this.calcularTotal();
    }

    public void agregarProducto(ItemVenta item){

        productos.add(item);
        this.calcularTotal();
    }

    private void calcularTotal(){
        this.total = productos.stream().mapToDouble(ItemVenta::getSubtotal).sum();
    }

}
