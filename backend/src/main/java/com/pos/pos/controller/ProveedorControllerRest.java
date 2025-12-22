package com.pos.pos.controller;

import com.pos.pos.controller.Dto.ProveedorRequestDTO;
import com.pos.pos.controller.Dto.ProveedorResponseDTO;
import com.pos.pos.controller.Dto.ProveedorUpdatedRequestDTO;
import com.pos.pos.controller.exception.DTOResponseError;
import com.pos.pos.controller.exception.ProveedorNoEncontrado;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.service.ProveedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/proveedores")
public class ProveedorControllerRest {
    private ProveedorService proveedorService;

    public ProveedorControllerRest(ProveedorService proveedorService){
        this.proveedorService = proveedorService;
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
