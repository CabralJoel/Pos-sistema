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
        APERTURA(Tipo.INGRESO),GASTO(Tipo.EGRESO),RETIRO(Tipo.EGRESO);

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

    @Column(nullable = false)
    private Double monto;

    @Column(nullable = false)
    private String descripcion;

    public MovimientoCaja(Turno turno,Concepto concepto,Double monto,String descripcion){
        this.turno = turno;
        this.concepto = concepto;
        this.monto = monto;
        this.descripcion = descripcion;
    }
}
