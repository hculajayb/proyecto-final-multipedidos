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

    @Override
    public ResponseEntity<FacturaDto> crear(FacturaInputDto facturaInputDto) {
        try {
            FacturaDto nueva = facturaService.crear(facturaInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public ResponseEntity<List<FacturaDto>> listar() {
        return ResponseEntity.ok(facturaService.listar());
    }

    @Override
    public ResponseEntity<FacturaDto> obtener(Integer id) {
        FacturaDto dto = facturaService.obtenerPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
