package com.pos.pos.controller;

import com.pos.pos.controller.Dto.ProductoRequestDTO;
import com.pos.pos.controller.Dto.ProductoResponseDTO;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.service.ProductoService;
import com.pos.pos.service.ProveedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/productos")
public class ProductoControllerRest {
    private final ProductoService productoService;
    private final ProveedorService proveedorService;

    public ProductoControllerRest(ProductoService productoService,ProveedorService proveedorService) {
        this.productoService = productoService;
        this.proveedorService = proveedorService;
    }

    @PostMapping("/cargar")
    public ResponseEntity<List<ProductoResponseDTO>> cargarProductos(@RequestBody List<ProductoRequestDTO> dtos) {

        List<Producto> saved = productoService.cargarProductos(dtos);

        List<ProductoResponseDTO> savedDto = saved.stream().map(ProductoResponseDTO::desdeModelo).toList();
        return ResponseEntity.ok(savedDto);
    }
}
