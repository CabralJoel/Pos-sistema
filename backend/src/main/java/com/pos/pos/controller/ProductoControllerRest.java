package com.pos.pos.controller;

import com.pos.pos.controller.Dto.ProductoRequestDTO;
import com.pos.pos.controller.Dto.ProductoResponseDTO;
import com.pos.pos.modelo.Producto;
import com.pos.pos.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoControllerRest {
    private final ProductoService productoService;

    public ProductoControllerRest(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping("/cargar")
    public ResponseEntity<List<ProductoResponseDTO>> crearProducto(@RequestBody List<ProductoRequestDTO> dtos) {

        List<Producto> productos = dtos.stream().map(ProductoRequestDTO::aModelo).toList();
        List<Producto> saved = productoService.cargarProductos(productos);

        List<ProductoResponseDTO> savedDto = saved.stream().map(ProductoResponseDTO::desdeModelo).toList();
        return ResponseEntity.ok(savedDto);
    }
}
