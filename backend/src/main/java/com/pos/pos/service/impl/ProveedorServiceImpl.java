package com.pos.pos.service.impl;

import com.pos.pos.controller.Dto.ProveedorUpdatedRequestDTO;
import com.pos.pos.controller.exception.ParametroIncorrecto;
import com.pos.pos.controller.exception.ProveedorNoEncontrado;
import com.pos.pos.modelo.Proveedor;
import com.pos.pos.persistencia.interfaces.ProveedorRepository;
import com.pos.pos.service.ProveedorService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProveedorServiceImpl implements ProveedorService {

    private ProveedorRepository proveedorRepository;

    public ProveedorServiceImpl(ProveedorRepository proveedorRepository){
        this.proveedorRepository = proveedorRepository;
    }

    @Override
    public Proveedor create(Proveedor proveedor){
        if(proveedorRepository.existsByCode(proveedor.getCode())){throw new ParametroIncorrecto("el Codigo ya existe");}
        if(proveedorRepository.existsByCuit(proveedor.getCuit())){throw new ParametroIncorrecto("el CUIT ya existe");}

        return this.proveedorRepository.save(proveedor);
    }
    //TANTO EN CREATE COMO UPDATE PUEDEN TENER PROBLEMAS DE CONCURRENCIA AL VERIFICAR QUE NO SE REPITAN CODE Y CUIT?
    @Override
    public Proveedor update(Long id, ProveedorUpdatedRequestDTO proveedorDTO) {

        Optional<Proveedor> optProveedor = this.proveedorRepository.findById(id);
        if (optProveedor.isEmpty()) throw new ProveedorNoEncontrado("No existe el proveedor que se quiere modificar.");

        Proveedor recuperado = optProveedor.get();

        if(proveedorRepository.existsByCodeAndIdNot(proveedorDTO.code(),id)){throw new ParametroIncorrecto("el Codigo ya existe");}
        if(proveedorRepository.existsByCuitAndIdNot(proveedorDTO.cuit(),id)){throw new ParametroIncorrecto("el CUIT ya existe");}

        proveedorDTO.aModelo(recuperado);

        return this.proveedorRepository.save(recuperado);
    }

    @Override
    public Optional<Proveedor> findById(Long id){
        return this.proveedorRepository.findById(id);
    }

    @Override
    public List<Proveedor> findAll(){
        return this.proveedorRepository.findAll();
    }

    @Override
    public void delete(Long id){
        this.proveedorRepository.deleteById(id);
    }
}
