package com.pos.pos.controller.Dto.turno;

import com.pos.pos.controller.Dto.usuario.UsuarioDTOResponse;
import com.pos.pos.modelo.turno.Turno;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TurnoResponseDTO(
        Long idTurno,
        UsuarioDTOResponse cajero,
        LocalDateTime fechaInicio,
        Double efectivoInicial
        ) {
    public static TurnoResponseDTO desdeModelo(Turno turno){
        return new TurnoResponseDTO(
                turno.getId(),
                UsuarioDTOResponse.desdeModelo(turno.getCajero()),
                turno.getFechaInicio(),
                turno.getEfectivoInicial()
        );
    }
}
