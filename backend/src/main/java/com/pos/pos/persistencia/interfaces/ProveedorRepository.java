package com.pos.pos.persistencia.interfaces;

import com.pos.pos.modelo.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor,Long> {
    boolean existsByCode(String code);

    boolean existsByCuit(String cuit);

    boolean existsByCodeAndIdNot(String code, Long id);

    boolean existsByCuitAndIdNot(String cuit, Long id);
}
