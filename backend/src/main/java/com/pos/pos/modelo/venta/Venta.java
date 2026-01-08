package com.pos.pos.modelo.venta;

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

}
