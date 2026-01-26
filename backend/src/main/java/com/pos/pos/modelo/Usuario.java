package com.pos.pos.modelo;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.security.PublicKey;

@Setter
@Getter
@ToString
@NoArgsConstructor

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    String nombre;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    UsuarioRol rol;

    public Usuario(String nombre, String password,UsuarioRol rol){
        this.nombre = nombre;
        this.password = password;
        this.rol = rol;
    }
}
