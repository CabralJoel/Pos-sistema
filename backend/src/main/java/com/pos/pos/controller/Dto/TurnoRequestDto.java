package com.pos.pos.controller.Dto;

import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.modelo.Usuario;

public record TurnoRequestDto(
        Double efectivoInicial,
        Long idCajero)
    {
        public Turno aModelo(Usuario usuario){
            return new Turno(usuario,efectivoInicial) ;
        }
}
