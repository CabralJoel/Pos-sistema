package com.pos.pos.service;

import com.pos.pos.TestService;
import com.pos.pos.modelo.Producto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ProductoServiceImplTest {
    @Autowired
    private TestService testService;
    @Autowired
    private ProductoService productoService;

    private Producto producto1;
    private Producto producto2;
    private Producto producto3;

    private List<Producto> listaP;

    @BeforeEach
    public void setUp(){
        producto1 = new Producto("a1b2","shampoo",1000d,10);
        producto2 = new Producto("a1b3","jabon",500d,15);
        producto3 = new Producto("a1b4","perfume",500d,5);

        listaP = new ArrayList<>(List.of(producto1,producto2));
    }

    @Test
    public void ingresarListaDeProductos(){
        productoService.cargarProductos(listaP);

        List<Producto> listaC = productoService.findAll();

        assertEquals(2,listaC.size());
    }

    @Test
    public void ingresarListaDeProductosConUnProductoNuevoYDosExistentes(){
        productoService.cargarProductos(List.of(producto1));
        productoService.cargarProductos(listaP);

        List<Producto> listaC = productoService.findAll();

        Producto p1 = productoService.findById("a1b2").get();
        Producto p2 = productoService.findById("a1b3").get();

        assertEquals(2,listaC.size());

        assertEquals(20,p1.getStock());
        assertEquals(15,p2.getStock());
    }

    @Test
    public void ingresarListaDeProductosExistentesConDatosCambiados(){
        productoService.cargarProductos(listaP);

        producto1.setPrecio(800d);
        producto2.setNombre("jabon blanco");

        productoService.cargarProductos(listaP);

        Producto p1 = productoService.findById("a1b2").get();
        Producto p2 = productoService.findById("a1b3").get();

        assertEquals(800,p1.getPrecio());
        assertEquals("jabon blanco",p2.getNombre());
    }

    @AfterEach
    void cleanDB(){
        testService.eliminarProductos();
    }
}
