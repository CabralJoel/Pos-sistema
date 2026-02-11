package com.pos.pos.controller;

import com.pos.pos.controller.Dto.usuario.UsuarioCreateDTORequest;
import com.pos.pos.controller.Dto.usuario.UsuarioDTOResponse;
import com.pos.pos.controller.Dto.usuario.UsuarioRequestDTO;
import com.pos.pos.modelo.Usuario;
import com.pos.pos.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/usuario")
public class UsuarioController {
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }
    @PostMapping("/create")
    public ResponseEntity<UsuarioDTOResponse> create(@RequestBody UsuarioCreateDTORequest dto){
        Usuario usuario = usuarioService.create(dto.aModelo());

        return ResponseEntity.ok(UsuarioDTOResponse.desdeModelo(usuario));
    }

    @GetMapping("/login")
    public ResponseEntity<UsuarioDTOResponse> loginAdmin(@RequestBody UsuarioRequestDTO dto){
        Usuario usuario = usuarioService.autenticar(dto.nombre(),dto.password());

        return ResponseEntity.ok(UsuarioDTOResponse.desdeModelo(usuario));
    }

    @PostMapping("/login/turno")
    public ResponseEntity<UsuarioDTOResponse> findCajero(@RequestBody UsuarioRequestDTO dto){
        Usuario usuario = usuarioService.autenticar(dto.nombre(),dto.password());

        return ResponseEntity.ok(UsuarioDTOResponse.desdeModelo(usuario));
    }
}
