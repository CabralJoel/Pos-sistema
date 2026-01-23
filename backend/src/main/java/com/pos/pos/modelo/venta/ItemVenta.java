package com.pos.pos.modelo.venta;

import com.pos.pos.modelo.Producto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
public class ItemVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;

    @Column(nullable = true)
    private String codeProducto;

    @Column(nullable = false)
    private String nombreProducto;

    @Column(nullable = false)
    private Double precioUnitario;

    @Column(nullable = false)
    private int cantidad;

    public ItemVenta(Producto producto,int cantidad){
        this.producto = producto;
        this.codeProducto = producto.getCode();
        this.nombreProducto = producto.getNombre();
        this.precioUnitario = producto.getPrecio();
        this.cantidad = cantidad;
    }

    public ItemVenta (Double precio){
        this.nombreProducto = "Varios";
        this.precioUnitario = precio;
        this.cantidad = 1;

    }

    public Double getSubtotal(){
        return this.cantidad * this.precioUnitario;
    }

    public void reducirStock(){
        this.producto.restarStock(this.cantidad);
    }

    public void sumarProducto(Integer cant){
        this.cantidad = cantidad + cant;
    }

    public void restarProducto(Integer cant){
        this.cantidad = Math.max(0,cantidad - cant);
    }


}
