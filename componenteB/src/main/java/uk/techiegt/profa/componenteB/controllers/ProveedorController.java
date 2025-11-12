package uk.techiegt.profa.componenteB.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import uk.techiegt.profa.componenteB.model.ProveedorDto;
import uk.techiegt.profa.componenteB.model.ProveedorInputDto;
import uk.techiegt.profa.componenteB.services.ProveedorService;
import uk.techiegt.profa.componenteB.spec.ProveedoresApi;

import java.util.List;

@RestController
public class ProveedorController implements ProveedoresApi {

    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @Override
    public ResponseEntity<ProveedorDto> crear(ProveedorInputDto proveedorInputDto) {
        try {
            ProveedorDto nuevo = proveedorService.crear(proveedorInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public ResponseEntity<List<ProveedorDto>> listar() {
        return ResponseEntity.ok(proveedorService.listar());
    }
}
