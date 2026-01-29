package com.pos.pos.modelo.turno;

import com.pos.pos.modelo.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString

@Entity
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Usuario cajero;

//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private Caja caja;

    @Column(nullable = false)
    private LocalDateTime fechaInicio;

    @Column
    private LocalDateTime fechaFin;

    @Column(nullable = false)
    private Double efectivoInicial;

    @Column
    private Double efectivoFinal;

    @Column
    private Double diferencia;

    @Enumerated(EnumType.STRING)
    @Column
    private EstadoTurno estado;

    @OneToMany(mappedBy = "turno",cascade = CascadeType.ALL)
    private List<MovimientoCaja> movimientos = new ArrayList<>();

    public Turno(Usuario cajero,Double efectivoInicial){
        this.cajero = cajero;
//        this.caja = caja;
        this.efectivoInicial = efectivoInicial;
        this.fechaInicio = LocalDateTime.now();
        this.estado = EstadoTurno.ABIERTO;
    }

    public void cerrarTurno(Double efectivoFisico){
        //TODO:calcular efectivo esperado
        this.efectivoFinal = efectivoFisico;
        this.diferencia = efectivoInicial - efectivoFisico;

        this.fechaFin = LocalDateTime.now();
        this.estado = EstadoTurno.CERRADO;
    }

    public void agregarMovimiento(MovimientoCaja movimiento){
        movimiento.setTurno(this);
        movimientos.add(movimiento);
    }

}
