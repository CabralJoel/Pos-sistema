package com.pos.pos;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TestService {

    @PersistenceContext
    private EntityManager entityManager;

    public void eliminarProductos(){
        entityManager.createNativeQuery("DELETE FROM producto").executeUpdate();
    }

    public void eliminarProveedores(){
        entityManager.createNativeQuery("DELETE FROM proveedor").executeUpdate();
    }

    public void eliminarVentas(){
        entityManager.createNativeQuery("DELETE FROM venta").executeUpdate();
    }

}
