package com.pos.pos.controller.Dto.usuario;

import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;

public record UsuarioDTOResponse(
        Long idUsuario,
        String nombre,
        UsuarioRol rol
) {
    public static UsuarioDTOResponse desdeModelo(Usuario usuario){
        return new UsuarioDTOResponse(usuario.getId(), usuario.getNombre(),usuario.getRol());
    }
}
