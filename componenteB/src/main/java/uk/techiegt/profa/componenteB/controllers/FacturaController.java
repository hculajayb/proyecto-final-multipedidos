package uk.techiegt.profa.componenteB.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.techiegt.profa.componenteB.dto.FacturaInput;
import uk.techiegt.profa.componenteB.entities.Factura;
import uk.techiegt.profa.componenteB.repositories.FacturaRepository;
import uk.techiegt.profa.componenteB.services.FacturaService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/facturas")
public class FacturaController {
    private final FacturaService service;
    private final FacturaRepository repo;

    public FacturaController(FacturaService service, FacturaRepository repo) {
        this.service = service; this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Factura> crear(@RequestBody FacturaInput input) {
        Factura f = service.crear(input);
        return ResponseEntity.created(URI.create("/facturas/" + f.getId())).body(f);
    }

    @GetMapping public List<Factura> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Factura> obtener(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}