package com.pos.pos.controller;

import com.pos.pos.controller.Dto.producto.ProveedorRequestDTO;
import com.pos.pos.controller.Dto.producto.ProveedorResponseDTO;
import com.pos.pos.controller.Dto.producto.ProveedorUpdatedRequestDTO;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.service.ProveedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/proveedores")
public class ProveedorControllerRest {
    private ProveedorService proveedorService;

    public ProveedorControllerRest(ProveedorService proveedorService){
        this.proveedorService = proveedorService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveedorResponseDTO> getProveedor(@PathVariable Long id){
        Optional<Proveedor> opProveedor = this.proveedorService.findById(id);
        if(opProveedor.isEmpty())throw new ElementoNoEncontrado("El proveedor no existe");
        Proveedor recuperado = opProveedor.get();
        return ResponseEntity.ok(ProveedorResponseDTO.desdeModelo(recuperado));
    }

    @GetMapping
    public ResponseEntity<Set<ProveedorResponseDTO>> getAllProveedores(){
        return ResponseEntity.ok(this.proveedorService.findAll().stream()
                .map(ProveedorResponseDTO :: desdeModelo).collect(Collectors.toSet()));
    }

    @PostMapping("/crear")
    public ResponseEntity<ProveedorResponseDTO> crearProveedor(@RequestBody ProveedorRequestDTO requestDTO){

        Proveedor proveedor = requestDTO.aModelo();
        Proveedor response = this.proveedorService.create(proveedor);

        return ResponseEntity.status(HttpStatus.CREATED).body(ProveedorResponseDTO.desdeModelo(response));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProveedorResponseDTO> updateProveedor(@PathVariable Long id,
                                                            @RequestBody ProveedorUpdatedRequestDTO updatedDTO){

        Proveedor updated = proveedorService.update(id, updatedDTO);

        return ResponseEntity.ok(ProveedorResponseDTO.desdeModelo(updated));
    }

}
