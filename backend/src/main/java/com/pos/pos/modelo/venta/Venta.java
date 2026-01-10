package com.pos.pos.modelo.venta;

import com.pos.pos.controller.exception.ElementoNoEncontrado;
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
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column
    private LocalDateTime fechaCierre;

    @Column(nullable = false)
    private Double total = 0d;

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado = EstadoVenta.ABIERTA;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ItemVenta> productos = new ArrayList<>();

    //se puede agregar la caja a la que pertenece la venta en el construcor

    public void agregarProducto(Producto producto,Integer cantidad){
        for(ItemVenta item : productos){
            if(producto.getCode().equals(item.getCodeProducto())){
                item.sumarProducto(cantidad);
                this.calcularTotal();
                return;
            }
        }
        ItemVenta nuevo = new ItemVenta(producto,cantidad);

        productos.add(nuevo);
        this.calcularTotal();
    }

    public void reducirProducto(String code, int cantidad){
        ItemVenta item = this.buscarProducto(code);
        item.restarProducto(cantidad);
        if (item.getCantidad() == 0){
            productos.remove(item);
        }
        this.calcularTotal();
    }

    public void eliminarProducto(String code){
        productos.removeIf(item->item.getCodeProducto().equals(code));
        this.calcularTotal();
    }

    private void calcularTotal(){
        this.total = productos.stream().mapToDouble(ItemVenta::getSubtotal).sum();
    }

    private ItemVenta buscarProducto(String code){
        return productos.stream().filter(item->item.getCodeProducto().equals(code)).findFirst()
                .orElseThrow(()-> new ElementoNoEncontrado("El producto no esta cargado"));
    }

    public boolean estaAbierta(){
        return this.estado == EstadoVenta.ABIERTA;
    }
}
