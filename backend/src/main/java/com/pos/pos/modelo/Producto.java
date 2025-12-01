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
    @Id
    private String code;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer stock;

    public Producto(String codigo,String nombre, Double precio, Integer stock){
        this.code = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }


    public void sumarStock(Integer cantidad){
        this.stock = stock + cantidad;
    }
}
