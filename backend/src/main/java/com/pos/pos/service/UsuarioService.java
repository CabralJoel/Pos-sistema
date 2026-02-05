package com.pos.pos.service;

import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario create(Usuario usuario);
    Usuario update(Usuario usuario);
    Optional<Usuario> findById(Long id);
    List<Usuario> findAll();
    void delete(Long id);
    Usuario autenticar(String nombre,String password);
    boolean validarUsuarioRol(Long idUsuario,UsuarioRol rol);
}
