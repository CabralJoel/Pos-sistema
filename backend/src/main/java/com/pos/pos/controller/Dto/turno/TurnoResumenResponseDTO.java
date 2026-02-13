package com.pos.pos.controller.Dto.turno;

import com.pos.pos.controller.Dto.venta.VentaResponseResumenDTO;
import com.pos.pos.modelo.turno.Turno;
import com.pos.pos.modelo.venta.EstadoVenta;
import com.pos.pos.modelo.venta.Venta;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public record TurnoResumenResponseDTO(
        Long idTurno,
        LocalDateTime fechaInicio,
        String nombreCajero,
        int cantVentasConfirmadas,
        int cantVentasAnuladas,
        double total,
        List<VentaResponseResumenDTO> ventas
) {
    public static TurnoResumenResponseDTO desdeModelo(Turno turno){
        int cantConfirmadas = 0;
        int cantAnuladas = 0;
        double total = 0;
        List<VentaResponseResumenDTO> ventasConfirmadas = new ArrayList<>();

        for(Venta venta : turno.getVentas()){
            if(venta.getEstado()== EstadoVenta.ANULADA){
                cantAnuladas++;
            }else{
                VentaResponseResumenDTO ventaDTO = VentaResponseResumenDTO.desdeModelo(venta);
                total = total + venta.getTotal();
                cantConfirmadas++;
                ventasConfirmadas.add(ventaDTO);
            }
        }

        return new TurnoResumenResponseDTO(
                turno.getId(),
                turno.getFechaInicio(),
                turno.getCajero().getNombre(),
                cantConfirmadas,
                cantAnuladas,
                total,
                ventasConfirmadas
            );
    }
}
