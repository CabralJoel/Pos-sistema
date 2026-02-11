package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.turno.TurnoRequestDto;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.controller.exception.RolInvalidoException;
import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;
import com.pos.pos.persistencia.interfaces.TurnoRepository;
import com.pos.pos.service.TurnoService;
import com.pos.pos.service.UsuarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TurnoServiceImpl implements TurnoService {

    private TurnoRepository turnoRepository;
    private UsuarioService usuarioService;

    public TurnoServiceImpl(TurnoRepository turnoRepository,UsuarioService usuarioService){
        this.turnoRepository = turnoRepository;
        this.usuarioService = usuarioService;
    }

    @Override
    public Turno create(TurnoRequestDto turnoDto){
        Usuario cajero = usuarioService.findById(turnoDto.idCajero())
                .orElseThrow(() -> new ElementoNoEncontrado("El Cajero asignado no existe"));
        /*
        if(!usuarioService.validarUsuarioRol(turnoDto.idCajero(), UsuarioRol.CAJERO)){
            throw new RolInvalidoException("Un cajero debe iniciar el turno");
        }*/
        Turno turno = turnoDto.aModelo(cajero);

        return turnoRepository.save(turno);
    }

    @Override
    public Turno update(Turno turno){
        return turnoRepository.save(turno);
    }

    @Override
    public Optional<Turno> findById(Long idTurno){
        return turnoRepository.findById(idTurno);
    }

    @Override
    public Turno cerrarTurno(Long idTurno, Double efectivoEnCaja){
        if(efectivoEnCaja<0){new ParametroIncorrecto("El monto no puede ser negativo");}

        Turno turnoRecuperdado = turnoRepository.findById(idTurno)
                .orElseThrow(()->new ElementoNoEncontrado("El turno buscado no existe"));

        turnoRecuperdado.cerrarTurno(efectivoEnCaja);

        return turnoRepository.save(turnoRecuperdado);
    }
}
