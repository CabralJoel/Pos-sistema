package com.pos.pos.service;

import com.pos.pos.TestService;
import com.pos.pos.controller.Dto.venta.ItemVentaRequestDTO;
import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.modelo.venta.MedioPago;
import com.pos.pos.modelo.venta.Venta;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class VentaServiceImplTest {

    @Autowired
    private TestService testService;
    @Autowired
    private VentaService ventaService;
    @Autowired
    private  ProveedorService proveedorService;
    @Autowired
    private ProductoService productoService;

    private VentaRequestDTO venta1dto;
    private VentaRequestDTO venta2dto;

    private ItemVentaRequestDTO item1dto;
    private ItemVentaRequestDTO item2dto;
    private ItemVentaRequestDTO item3dto;

    private Proveedor proveedor;

    private Producto producto1;
    private Producto producto2;

    @BeforeEach
    public void setUp(){
        proveedor = new Proveedor("prueba","20123412340","provPrueba","Quilmes"
                ,"calle al 123","email@gmail.com","1112341234");

        proveedorService.create(proveedor);

        producto1 = new Producto("a1b1","shampoo",100d,10,proveedor);
        producto2 = new Producto("a2b2","jabon",50d,15,proveedor);

        productoService.create(producto1);
        productoService.create(producto2);

        item1dto = new ItemVentaRequestDTO(producto1.getId(), 1,100d);
        item2dto = new ItemVentaRequestDTO(producto2.getId(), 3,50d);
        item3dto = new ItemVentaRequestDTO(producto1.getId(),5,100d);

        List<ItemVentaRequestDTO> itemsdtoList = new ArrayList<>(List.of(item1dto,item2dto));
        List<ItemVentaRequestDTO> itemsdtoList1 = new ArrayList<>(List.of(item3dto));

        venta1dto = new VentaRequestDTO(MedioPago.EFECTIVO,itemsdtoList);
        venta2dto = new VentaRequestDTO(MedioPago.TRANSFERENCIA,itemsdtoList1);
    }

    @Test
    public void seCrean2VentasYSeRecuperanAmbas(){
        ventaService.create(venta1dto);
        ventaService.create(venta2dto);

        List<Venta> ventas = ventaService.findAll();

        assertEquals(2,ventas.size());
    }

    //@AfterEach
    void cleanDB(){
        testService.eliminarVentas();
        testService.eliminarProductos();
        testService.eliminarProveedores();
    }
}
