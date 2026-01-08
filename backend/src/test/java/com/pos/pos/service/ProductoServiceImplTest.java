package com.pos.pos.service;

import com.pos.pos.TestService;
import com.pos.pos.controller.Dto.ProductoRequestDTO;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;
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
    @Autowired
    private ProveedorService proveedorService;

    private ProductoRequestDTO productoDto1;
    private ProductoRequestDTO productoDto2;
    private ProductoRequestDTO productoDto3;
    private ProductoRequestDTO productoDto4;

    private Proveedor proveedor1;

    private List<ProductoRequestDTO> listaP;
    private List<ProductoRequestDTO> listaP2;

    @BeforeEach
    public void setUp(){
        proveedor1 = new Proveedor("Dove","20123412340","Dovi","Bernal","Calle al 123","dove@gmail.com","1112341234");

        proveedorService.create(proveedor1);

        productoDto1 = new ProductoRequestDTO(proveedor1.getId(),"shampoo","a1b2",100d,10,100d,50d);
        productoDto2 = new ProductoRequestDTO(proveedor1.getId(),"jabon","a1b3",75d,15,50d,50d);
        productoDto3 = new ProductoRequestDTO(proveedor1.getId(),"shampoo","a1b2",800d,10,100d,50d);
        productoDto4 = new ProductoRequestDTO(proveedor1.getId(),"jabon blanco","a1b3",75d,15,50d,50d);

        listaP = new ArrayList<>(List.of(productoDto1,productoDto2));
        listaP2 = new ArrayList<>(List.of(productoDto3,productoDto4));
    }

    @Test
    public void ingresarListaDeProductos(){
        productoService.cargarProductos(listaP);

        List<Producto> listaC = productoService.findAll();

        assertEquals(2,listaC.size());
    }

    @Test
    public void ingresarListaDeProductosConUnProductoNuevoYDosExistentes(){
        productoService.cargarProducto(productoDto1);
        productoService.cargarProductos(listaP);

        List<Producto> listaC = productoService.findAll();

        Producto p1 = productoService.findByCode("a1b2").get();
        Producto p2 = productoService.findByCode("a1b3").get();

        assertEquals(2,listaC.size());

        assertEquals(20,p1.getStock());
        assertEquals(15,p2.getStock());
    }

    @Test
    public void ingresarListaDeProductosExistentesConDatosCambiados(){
        productoService.cargarProductos(listaP);

        productoService.cargarProductos(listaP2);

        Producto p1 = productoService.findByCode("a1b2").get();
        Producto p2 = productoService.findByCode("a1b3").get();

        assertEquals(800,p1.getPrecio());
        assertEquals("jabon blanco",p2.getNombre());
    }

    @AfterEach
    void cleanDB(){
        testService.eliminarProductos();
        testService.eliminarProveedores();
    }
}
