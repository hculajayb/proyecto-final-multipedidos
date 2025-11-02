package uk.techiegt.clipe.componenteA.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.techiegt.clipe.componenteA.dto.ClienteInput;
import uk.techiegt.clipe.componenteA.entities.Cliente;
import uk.techiegt.clipe.componenteA.repositories.ClienteRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    private final ClienteRepository repo;

    public ClienteController(ClienteRepository repo) { this.repo = repo; }

    @PostMapping
    public ResponseEntity<Cliente> crear(@RequestBody ClienteInput input) {
        Cliente c = repo.save(Cliente.builder().nombre(input.nombre()).correo(input.correo()).build());
        return ResponseEntity.created(URI.create("/clientes/" + c.getId())).body(c);
    }

    @GetMapping public List<Cliente> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtener(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}