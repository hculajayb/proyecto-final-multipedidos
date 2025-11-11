package uk.techiegt.clipe.componenteA.services;

import org.springframework.stereotype.Service;
import uk.techiegt.clipe.componenteA.entities.Pedido;
import uk.techiegt.clipe.componenteA.model.PedidoDto;
import uk.techiegt.clipe.componenteA.model.PedidoInputDto;
import uk.techiegt.clipe.componenteA.repositories.PedidoRepository;
import uk.techiegt.central.dto.Producto;
import uk.techiegt.central.services.OperacionesNegocio;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository repo;

    public PedidoService(PedidoRepository repo) {
        this.repo = repo;
    }

    public PedidoDto crear(PedidoInputDto input) {
        // Convertir productos de modelo OpenAPI a modelo central
        List<Producto> productos = input.getProductos().stream()
                .map(p -> new Producto(p.getNombre(), p.getPrecio()))
                .collect(Collectors.toList());

        double total = OperacionesNegocio.calcularTotal(productos);

        // Crear entidad JPA
        Pedido pedido = Pedido.builder()
                .clienteId(input.getClienteId())
                .total(total)
                .build();

        Pedido guardado = repo.save(pedido);

        // Convertir entidad JPA a modelo OpenAPI (PedidoDto)
        PedidoDto salida = new PedidoDto();
        salida.setId(guardado.getId());
        salida.setClienteId(guardado.getClienteId());
        salida.setTotal(guardado.getTotal());
        salida.setProductos(input.getProductos());

        return salida;
    }

    public List<PedidoDto> listar() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public PedidoDto obtenerPorId(Integer id) {
        return repo.findById(id).map(this::toDto).orElse(null);
    }

    // Conversor de entidad a modelo OpenAPI
    private PedidoDto toDto(Pedido p) {
        PedidoDto dto = new PedidoDto();
        dto.setId(p.getId());
        dto.setClienteId(p.getClienteId());
        dto.setTotal(p.getTotal());
        dto.setProductos(List.of()); // Se podría extender en futuras versiones
        return dto;
    }
}