package uk.techiegt.profa.componenteB.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import uk.techiegt.profa.componenteB.model.FacturaDto;
import uk.techiegt.profa.componenteB.model.FacturaInputDto;
import uk.techiegt.profa.componenteB.services.FacturaService;
import uk.techiegt.profa.componenteB.spec.FacturasApi;

import java.util.List;

@RestController
public class FacturaController implements FacturasApi {

    private final FacturaService facturaService;

    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    /**
     * POST /facturas
     * Crea una nueva factura a partir de los pedidos pendientes del cliente.
     */
    @Override
    public ResponseEntity<FacturaDto> crear(FacturaInputDto facturaInputDto) {
        try {
            FacturaDto nueva = facturaService.crearFactura(facturaInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalStateException e) {
            // No hay pedidos pendientes para ese cliente
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /facturas
     * Lista todas las facturas.
     */
    @Override
    public ResponseEntity<List<FacturaDto>> listar() {
        return ResponseEntity.ok(facturaService.listar());
    }

    /**
     * GET /facturas/{id}
     * Obtiene una factura por ID.
     */
    @Override
    public ResponseEntity<FacturaDto> obtener(Integer id) {
        FacturaDto dto = facturaService.obtenerPorId(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}