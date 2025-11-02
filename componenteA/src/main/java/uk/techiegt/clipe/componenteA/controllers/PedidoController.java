package uk.techiegt.clipe.componenteA.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.techiegt.clipe.componenteA.dto.PedidoInput;
import uk.techiegt.clipe.componenteA.entities.Pedido;
import uk.techiegt.clipe.componenteA.repositories.PedidoRepository;
import uk.techiegt.clipe.componenteA.services.PedidoService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    private final PedidoService service;
    private final PedidoRepository repo;

    public PedidoController(PedidoService service, PedidoRepository repo) {
        this.service = service; this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Pedido> crear(@RequestBody PedidoInput input) {
        Pedido p = service.crear(input);
        return ResponseEntity.created(URI.create("/pedidos/" + p.getId())).body(p);
    }

    @GetMapping public List<Pedido> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtener(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
