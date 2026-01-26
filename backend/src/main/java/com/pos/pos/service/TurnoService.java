package com.pos.pos.service;

import com.pos.pos.controller.Dto.TurnoRequestDto;
import com.pos.pos.modelo.turno.Turno;

import java.util.Optional;

public interface TurnoService {
    Turno create(TurnoRequestDto turnoDto);
    Turno update(Turno turno);
    Optional<Turno> findById(Long id);
    Turno cerrarTurno(Long idTurno, Double efectivo);
}
