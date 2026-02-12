package com.pos.pos.controller;

import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.controller.Dto.venta.VentaResponseDTO;
import com.pos.pos.controller.Dto.venta.VentaResponseResumenDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.venta.Venta;
import com.pos.pos.service.VentaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/ventas")
public class VentaController {

    private VentaService ventaService;

    public VentaController(VentaService ventaService){
        this.ventaService = ventaService;
    }

    @GetMapping
    public ResponseEntity<Set<VentaResponseResumenDTO>> getAllVentas(){
        return ResponseEntity.ok(this.ventaService.findAll().stream()
                .map(VentaResponseResumenDTO :: desdeModelo).collect(Collectors.toSet()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VentaResponseDTO> buscarVenta(@PathVariable Long id){
        Optional<Venta> optionalVenta = ventaService.findById(id);
        if(optionalVenta.isEmpty())throw new ElementoNoEncontrado("La venta no existe");

        Venta ventaRecuperada = optionalVenta.get();

        return ResponseEntity.ok(VentaResponseDTO.desdeModelo(ventaRecuperada));
    }

    @PostMapping("/{idTurno}/registrarVenta")
    public ResponseEntity<VentaResponseDTO> registrarVenta(@PathVariable Long idTurno,
                                                               @RequestBody VentaRequestDTO dto){
        Venta ventaRegistrada = ventaService.create(idTurno,dto);

        return ResponseEntity.ok(VentaResponseDTO.desdeModelo(ventaRegistrada));
    }

}
