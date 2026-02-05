package com.pos.pos.persistencia.interfaces;

import com.pos.pos.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    @Query("""
               SELECT u FROM Usuario u
               WHERE u.nombre = :nombre AND u.password = :password
            """)
    Optional<Usuario>autenticar(@Param("nombre")String nombre,@Param("password") String password);
}
