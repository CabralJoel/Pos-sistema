package com.pos.pos.modelo;

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
public class Producto {
    @Id//TODO: cambiar por Long y tener el code aparte para buscar
    private String code;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private String proveedor;//TODO:cambiar por la clase proveedor

    public Producto(String codigo,String nombre, Double precio, Integer stock, String proveedor){
        this.code = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.proveedor = proveedor;
    }


    public void sumarStock(Integer cantidad){
        this.stock = stock + cantidad;
    }

    public void restarStock(Integer cantidad){
        if(cantidad<=0) return;
        stock = Math.max(0,stock-cantidad);
    }

}
