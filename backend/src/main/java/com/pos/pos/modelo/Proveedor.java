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
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique=true)
    private String code;

    @Column(nullable = false, unique = true)
    private  String cuit;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String localidad;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telefono;

    @Column
    private String descripcion = "";

    public Proveedor (String code,String cuit,String nombre, String localidad,
                      String direccion,String email,String telefono){
        this.code = code;
        this.cuit = cuit;
        this.nombre = nombre;
        this.localidad = localidad;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
    }

    public Proveedor (String code,String cuit,String nombre, String localidad,
                      String direccion,String email,String telefono,String descripcion){//constructor con descripcion
        this.code = code;
        this.cuit = cuit;
        this.nombre = nombre;
        this.localidad = localidad;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.descripcion = descripcion;
    }



}
