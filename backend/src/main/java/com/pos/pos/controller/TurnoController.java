package com.pos.pos.controller;

import com.pos.pos.controller.Dto.TurnoRequestDto;
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

//    @PostMapping()
//    public ResponseEntity<TurnoResponseDto> createTurno(@RequestBody TurnoRequestDto dto){}
}
