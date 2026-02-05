package com.pos.pos.controller.Dto.usuario;

import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;

public record UsuarioCreateDTORequest(
        String nombre,
        String password,
        UsuarioRol rol
) {
    public Usuario aModelo(){
        return(new Usuario(nombre,password,rol));
    }
}
