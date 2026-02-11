package com.pos.pos.controller;

import com.pos.pos.controller.Dto.turno.TurnoCierreRequestDTO;
import com.pos.pos.controller.Dto.turno.TurnoDetalleResponseDTO;
import com.pos.pos.controller.Dto.turno.TurnoRequestDto;
import com.pos.pos.controller.Dto.turno.TurnoResponseDTO;
import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.service.TurnoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/turno")
public class TurnoController {

    private TurnoService turnoService;

    public TurnoController(TurnoService turnoService){
        this.turnoService = turnoService;
    }

    @PostMapping
    public ResponseEntity<TurnoResponseDTO> createTurno(@RequestBody TurnoRequestDto dto){
        Turno turnoNuevo = turnoService.create(dto);

        return ResponseEntity.ok(TurnoResponseDTO.desdeModelo(turnoNuevo));
    }

    @PatchMapping("/cierre")
    public ResponseEntity<TurnoDetalleResponseDTO> cierreTurno(@RequestBody TurnoCierreRequestDTO dto){
        Turno turnoCerrado = turnoService.cerrarTurno(dto.idTurno(), dto.efectivoFinal());

        return ResponseEntity.ok(TurnoDetalleResponseDTO.desdeModelo(turnoCerrado));
    }
}
