package com.pos.pos.controller.exception;

public class ParametroIncorrecto extends RuntimeException{
    public ParametroIncorrecto(String mensaje){
        super(mensaje);
    }
}
