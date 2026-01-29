package com.pos.pos.service;

import com.pos.pos.TestService;
import com.pos.pos.controller.Dto.ProveedorUpdatedRequestDTO;
import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.controller.exception.ElementoNoEncontrado;
import com.pos.pos.modelo.Proveedor;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class ProveedorServiceImplTest {
    @Autowired
    private TestService testService;
    @Autowired
    private ProveedorService proveedorService;

    private Proveedor proveedor1;
    private Proveedor proveedor2;

    private ProveedorUpdatedRequestDTO updatedDTO;

    @BeforeEach
    public void setUp(){
        proveedor1 = new Proveedor("Alfa","20123456789","Lavanderia SA","Bernal",
                "Belgrano 123","lavanderia@gmail.com","1112341234","detergentes y cloro");
        proveedor2 = new Proveedor("Beta","20987654321","Jabones Varios","Quilmes",
                "15 de mayo 321","jabones@gmail.com","1112345678");

        updatedDTO = new ProveedorUpdatedRequestDTO("Beta","20123456789","Lavanderia SA","Bernal",
                "Belgrano 321","lavanderia@gmail.com","1112341234","detergentes,desodorantes y cloro");
    }
    //TODO realizar tests

    @Test
    public void crearDosProveedorMismoCodigoLanzaError(){
        proveedorService.create(proveedor1);
        proveedor2.setCode("Alfa");

        assertThrows(ParametroIncorrecto.class,()->{proveedorService.create(proveedor2);});
    }

    @Test
    public void crearDosProveedorMismoCUITLanzaError(){
        proveedorService.create(proveedor1);
        proveedor2.setCuit("20123456789");

        assertThrows(ParametroIncorrecto.class,()->{proveedorService.create(proveedor2);});
    }

    @Test
    public void seActualizanDatosDeUnProveedor(){
        proveedorService.create(proveedor1);

        proveedorService.update(proveedor1.getId(),updatedDTO);

        Proveedor recuperado = proveedorService.findById(proveedor1.getId()).get();

        assertEquals("Beta",recuperado.getCode());
        assertEquals("Belgrano 321",recuperado.getDireccion());
        assertEquals("detergentes,desodorantes y cloro",recuperado.getDescripcion());
    }

    @Test
    public void intentaActualizarUnProveedorInexistenteLanzaError(){
        assertThrows(ElementoNoEncontrado.class,()->{proveedorService.update(-1L,updatedDTO);});
    }

    @Test
    public void actualizarProveedorConCodeYaExistenteLanzaError(){
        proveedorService.create(proveedor1);
        proveedorService.create(proveedor2);

        assertThrows(ParametroIncorrecto.class,()->{proveedorService.update(proveedor1.getId(),updatedDTO);});
    }

    @Test
    public void actualizarProveedorConCuitYaExistenteLanzaError(){
        proveedorService.create(proveedor1);
        proveedorService.create(proveedor2);

        assertThrows(ParametroIncorrecto.class,()->{proveedorService.update(proveedor2.getId(),updatedDTO);});
    }

    @AfterEach
    void cleanDB (){
        testService.eliminarProveedores();
    }
}
