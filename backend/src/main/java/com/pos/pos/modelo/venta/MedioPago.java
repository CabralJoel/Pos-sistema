package com.pos.pos.modelo.venta;

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
public class MedioPago{
    public enum TipoPago {
        EFECTIVO,
        TRANSFERENCIA,
        DEBITO,
        CREDITO,
        MIXTO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;

    @Column(nullable = false)
    private Double monto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPago tipoPago;

    public MedioPago(TipoPago tipoPago,Double monto){
        this.tipoPago = tipoPago;
        this.monto = monto;
    }
}
