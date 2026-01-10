package com.pos.pos.modelo.venta;

import com.pos.pos.modelo.Producto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
public class ItemVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)//TODO: revisar lazy
    private Producto producto;

    @Column(nullable = false)
    private String codeProducto;

    @Column(nullable = false)
    private String nombreProducto;

    @Column(nullable = false)
    private Double precioUnitario;
    //TODO: revisar si conviene usar BigDecimal para los precios
    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    private Double subtotal;

    public ItemVenta(Producto producto,Integer cantidad){
        this.producto = producto;
        this.codeProducto = producto.getCode();
        this.nombreProducto = producto.getNombre();
        this.precioUnitario = producto.getPrecio();
        this.cantidad = cantidad;
        this.calcularSubtotal();
    }

    public void sumarProducto(Integer cant){
        this.cantidad = cantidad + cant;
        this.calcularSubtotal();
    }

    public void restarProducto(Integer cant){
        this.cantidad = Math.max(0,cantidad - cant);
        this.calcularSubtotal();
    }

    private void calcularSubtotal(){
        this.subtotal = cantidad*precioUnitario;
    }

}
