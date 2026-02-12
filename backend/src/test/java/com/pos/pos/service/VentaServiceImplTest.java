package com.pos.pos.service;

import com.pos.pos.TestService;
import com.pos.pos.controller.Dto.venta.ItemVentaRequestDTO;
import com.pos.pos.controller.Dto.venta.MedioPagoDTO;
import com.pos.pos.controller.Dto.venta.VentaRequestDTO;
import com.pos.pos.controller.exception.EstadoInvalidoException;
import com.pos.pos.modelo.Producto;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.modelo.Usuario;
import com.pos.pos.modelo.UsuarioRol;
import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.ItemVenta;
import com.pos.pos.modelo.venta.MedioPago;
import com.pos.pos.modelo.venta.Venta;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private TurnoService turnoService;

    private Usuario cajero;

    private Turno turno;

    private MedioPagoDTO medioPagoDTO1;
    private MedioPagoDTO medioPagoDTO2;

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
        cajero = new Usuario("Jorge","1234", UsuarioRol.CAJERO);

        turno = new Turno(cajero,1000d);

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

        medioPagoDTO1 = new MedioPagoDTO(MedioPago.TipoPago.EFECTIVO,250d);
        medioPagoDTO2 = new MedioPagoDTO(MedioPago.TipoPago.TRANSFERENCIA,500d);

        venta1dto = new VentaRequestDTO(List.of(medioPagoDTO1),itemsdtoList);
        venta2dto = new VentaRequestDTO(List.of(medioPagoDTO2),itemsdtoList1);
    }

    @Test
    public void seCrean2VentasYSeRecuperanAmbasFinalizadas(){
        ventaService.create(venta1dto);
        ventaService.create(venta2dto);

        List<Venta> ventas = ventaService.findAll();

        assertEquals(2,ventas.size());

        Venta v0 = ventas.get(0);
        Venta v1 = ventas.get(1);

        assertEquals(EstadoVenta.FINALIZADA,v0.getEstado());
        assertEquals(EstadoVenta.FINALIZADA,v1.getEstado());
    }

    @Test
    public void crearVentaConProductoInexistenteCrea3ItemsSinProducto(){
        ItemVentaRequestDTO itemdtoNoCargado = new ItemVentaRequestDTO(null, 1,100d);

        venta1dto.items().add(itemdtoNoCargado);
        Venta ventaCreada = ventaService.create(venta1dto);
        List<ItemVenta> listaItems = ventaCreada.getItems();
        assertEquals(3,listaItems.size());

        ItemVenta itemVarios = listaItems.stream().filter(i -> i.getProducto() == null)
                .findFirst().orElseThrow();

        assertEquals(1, itemVarios.getCantidad());
        assertNull(itemVarios.getProducto());
        assertEquals(100d, itemVarios.getPrecioUnitario());
    }

    @Test
    public void seAnulaUnaVentaYCambiaEstadoAAnulada(){
        Venta ventaCreada = ventaService.create(venta1dto);

        ventaService.anularVenta(ventaCreada.getId(),"Devolucion completa");

        Venta ventaAnulada = ventaService.findById(ventaCreada.getId()).get();

        assertEquals(EstadoVenta.ANULADA,ventaAnulada.getEstado());
        assertEquals("Devolucion completa",ventaAnulada.getMotivoAnulacion());
    }

    @Test
    public void seAnulaUnaVentaYaAnulada(){
        Venta ventaCreada = ventaService.create(venta1dto);

        ventaService.anularVenta(ventaCreada.getId(),"Devolucion completa");

        assertThrows(EstadoInvalidoException.class,
                ()->{ventaService.anularVenta(ventaCreada.getId(),"cambio de producto");});
    }

    @AfterEach
    void cleanDB(){
        testService.eliminarVentas();
        testService.eliminarProductos();
        testService.eliminarProveedores();
    }
}
