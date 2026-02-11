package com.pos.pos.modelo.turno;

import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.venta.MedioPago;
import com.pos.pos.modelo.venta.Venta;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
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
    private List<Venta> ventas = new ArrayList<>();

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
        Double efectivoEsperado = this.calcularEfectivoEsperado() + efectivoInicial;

        this.efectivoFinal = efectivoFisico;
        this.diferencia = efectivoEsperado - efectivoFisico;

        this.fechaFin = LocalDateTime.now();
        this.estado = EstadoTurno.CERRADO;
    }

    public void agregarVenta(Venta venta){
        venta.setTurno(this);
        ventas.add(venta);
    }

    public void agregarMovimiento(MovimientoCaja movimiento){
        movimiento.setTurno(this);
        movimientos.add(movimiento);
    }

    private Double calcularEfectivoEsperado(){
        Double efectivoVentas = ventas.stream().flatMap(v->v.getMediosDePago().stream())
                .filter(mp->mp.getTipoPago() == MedioPago.TipoPago.EFECTIVO)
                .mapToDouble(MedioPago::getMonto).sum();

        Double ingresosMovimientos = movimientos.stream()
                .filter(m->m.getConcepto().getTipo() == MovimientoCaja.Tipo.INGRESO)
                .mapToDouble(MovimientoCaja::getMonto).sum();

        Double egresosMovimientos = movimientos.stream()
                .filter(m->m.getConcepto().getTipo() == MovimientoCaja.Tipo.EGRESO)
                .mapToDouble(MovimientoCaja::getMonto).sum();

        return efectivoVentas + ingresosMovimientos - egresosMovimientos;
    }
}
