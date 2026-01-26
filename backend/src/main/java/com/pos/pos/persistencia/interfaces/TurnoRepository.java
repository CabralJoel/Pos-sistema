package com.pos.pos.persistencia.interfaces;

import com.pos.pos.modelo.turno.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnoRepository extends JpaRepository<Turno,Long> {
}
