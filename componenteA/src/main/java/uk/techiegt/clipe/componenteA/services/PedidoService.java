package uk.techiegt.clipe.componenteA.services;

import org.springframework.stereotype.Service;
import uk.techiegt.central.dto.Producto;
import uk.techiegt.central.services.OperacionesNegocio;
import uk.techiegt.clipe.componenteA.dto.PedidoInput;
import uk.techiegt.clipe.componenteA.entities.Pedido;
import uk.techiegt.clipe.componenteA.repositories.PedidoRepository;

import java.util.stream.Collectors;

@Service
public class PedidoService {
    private final PedidoRepository repo;

    public PedidoService(PedidoRepository repo) { this.repo = repo; }

    public Pedido crear(PedidoInput input) {
        var productos = input.productos().stream()
                .map(p -> new Producto(p.nombre(), p.precio()))
                .collect(Collectors.toList());

        double total = OperacionesNegocio.calcularTotal(productos);

        Pedido pedido = Pedido.builder()
                .clienteId(input.clienteId())
                .total(total)
                .build();

        return repo.save(pedido);
    }
}
