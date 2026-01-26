package com.pos.pos.service.impl;

import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;
import com.pos.pos.persistencia.interfaces.UsuarioRepository;
import com.pos.pos.service.UsuarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {
    private UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario create(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario update(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> findById(Long idUsuario){
        return usuarioRepository.findById(idUsuario);
    }

    @Override
    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
    }

    @Override
    public void delete(Long idUsuario){
        usuarioRepository.deleteById(idUsuario);
    }

    @Override
    public boolean validarUsuarioRol(Long idUsuario,UsuarioRol rol){
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(()->new ElementoNoEncontrado("El usuario a validar no existe"));

        boolean validacion = usuario.getRol() == rol;

        return validacion;
    }

}
