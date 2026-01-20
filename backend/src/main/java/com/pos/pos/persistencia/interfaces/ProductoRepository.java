package com.pos.pos.persistencia.interfaces;

import com.pos.pos.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    boolean existsByCode(String code);
    Optional<Producto> findByCode(String code);
    @Query("""
            SELECT p FROM Producto p
            WHERE LOWER(p.code) LIKE LOWER(CONCAT(:texto,'%'))
            OR LOWER(p.nombre) LIKE LOWER(CONCAT(:texto,'%'))
            ORDER BY p.nombre ASC
            """)
    List<Producto> buscarPorNombreOCode(@Param("texto")String texto);
}
