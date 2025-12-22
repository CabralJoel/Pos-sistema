package com.pos.pos.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ParametroIncorrecto.class)
    public DTOResponseError datosInvalidos(ParametroIncorrecto e){
        return new DTOResponseError(e.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler (ProveedorNoEncontrado.class)
    public DTOResponseError proveedorNoEncontrado(ProveedorNoEncontrado e){
        return new DTOResponseError(e.getMessage());
    }
}
