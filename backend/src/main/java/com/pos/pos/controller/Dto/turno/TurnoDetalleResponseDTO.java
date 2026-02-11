package com.pos.pos.controller.Dto.turno;

import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.turno.EstadoTurno;
import com.pos.pos.modelo.turno.Turno;

import java.time.LocalDateTime;

public record TurnoDetalleResponseDTO(
        Long idTurno,
        Usuario cajero,
        LocalDateTime fechaInicio,
        LocalDateTime  fechaFin,
        Double efectivoInicial,
        Double efectivoFinal,
        Double diferencia,
        EstadoTurno estado
        //Double ingresosTotales
) {
    public static TurnoDetalleResponseDTO desdeModelo(Turno turno){//TODO: terminar y revisar diseño de dto
        return new TurnoDetalleResponseDTO(
                turno.getId(),
                turno.getCajero(),
                turno.getFechaInicio(),
                turno.getFechaFin(),
                turno.getEfectivoInicial(),
                turno.getEfectivoFinal(),
                turno.getDiferencia(),
                turno.getEstado()

        );
    }
}
