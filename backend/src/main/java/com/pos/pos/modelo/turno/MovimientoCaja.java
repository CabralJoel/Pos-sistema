package com.pos.pos.modelo.turno;

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
public class MovimientoCaja {

    public enum Tipo{
        INGRESO,EGRESO
    }

    public enum Concepto{
        INGRESO_MANUAL(Tipo.INGRESO),GASTO(Tipo.EGRESO),RETIRO(Tipo.EGRESO),
        PAGO_PROVEEDOR(Tipo.EGRESO),DEVOLUCION(Tipo.EGRESO),AJUSTE(null);

        private final Tipo tipo;

        Concepto(Tipo tipo){this.tipo = tipo;}
        public Tipo getTipo(){return tipo;}
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turno_id", nullable = false)
    private Turno turno;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Concepto concepto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @Column(nullable = false)
    private Double monto;

    @Column(nullable = false)
    private String descripcion;
    //constructor para movimientos con tipo fijo
    public MovimientoCaja(Turno turno,Concepto concepto,Double monto,String descripcion){
        if(concepto.getTipo() == null){
            throw new IllegalArgumentException("El concepto " + concepto + " requiere especificar el tipo");
        }
        this.turno = turno;
        this.concepto = concepto;
        this.tipo = getTipo();
        this.monto = monto;
        this.descripcion = descripcion;
    }
    //constructor para ajuste
    public MovimientoCaja(Turno turno,Concepto concepto,Tipo tipo,Double monto,String descripcion){
        if(concepto.getTipo() != null){
            throw new IllegalArgumentException("El concepto " + concepto + " ya tiene tipo fijo");
        }
        this.turno = turno;
        this.concepto = concepto;
        this.tipo = tipo;
        this.monto = monto;
        this.descripcion = descripcion;
    }
}
