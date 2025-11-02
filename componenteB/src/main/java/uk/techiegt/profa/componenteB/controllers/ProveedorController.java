package uk.techiegt.profa.componenteB.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.techiegt.profa.componenteB.dto.ProveedorInput;
import uk.techiegt.profa.componenteB.entities.Proveedor;
import uk.techiegt.profa.componenteB.repositories.ProveedorRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    private final ProveedorRepository repo;

    public ProveedorController(ProveedorRepository repo) { this.repo = repo; }

    @PostMapping
    public ResponseEntity<Proveedor> crear(@RequestBody ProveedorInput input) {
        Proveedor p = repo.save(Proveedor.builder().nombre(input.nombre()).correo(input.correo()).build());
        return ResponseEntity.created(URI.create("/proveedores/" + p.getId())).body(p);
    }

    @GetMapping public List<Proveedor> listar() { return repo.findAll(); }
}
