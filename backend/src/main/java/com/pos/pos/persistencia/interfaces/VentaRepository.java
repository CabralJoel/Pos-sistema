package com.pos.pos.persistencia.interfaces;

import com.pos.pos.modelo.venta.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta,Long> {
}
