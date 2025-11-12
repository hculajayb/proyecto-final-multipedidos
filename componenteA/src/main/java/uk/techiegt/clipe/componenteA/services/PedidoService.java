package uk.techiegt.clipe.componenteA.services;

import org.springframework.stereotype.Service;
import uk.techiegt.clipe.componenteA.entities.Pedido;
import uk.techiegt.clipe.componenteA.entities.PedidoDetalle;
import uk.techiegt.clipe.componenteA.model.PedidoDto;
import uk.techiegt.clipe.componenteA.model.PedidoInputDto;
import uk.techiegt.clipe.componenteA.model.ProductoDto;
import uk.techiegt.clipe.componenteA.repositories.PedidoRepository;
import uk.techiegt.central.dto.Producto;
import uk.techiegt.central.services.OperacionesNegocio;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository repo;

    public PedidoService(PedidoRepository repo) {
        this.repo = repo;
    }

    /**
     * Crea un nuevo pedido con productos.
     */
    public PedidoDto crear(PedidoInputDto input) {
        // Convertir lista de productos DTO → lista de objetos del componente C
        List<Producto> productos = input.getProductos().stream()
                .map(p -> new Producto(p.getNombre(), p.getPrecio()))
                .collect(Collectors.toList());

        // Calcular total usando la lógica central del componente C
        double totalCalculado = OperacionesNegocio.calcularTotal(productos);

        // Crear entidad Pedido
        Pedido pedido = new Pedido();
        pedido.setClienteId(input.getClienteId());
        //pedido.setEstado(input.getEstado() != null ? input.getEstado() : "PENDIENTE");
        pedido.setTotal(totalCalculado);

        // Crear detalles de pedido
        List<PedidoDetalle> detalles = input.getProductos().stream()
                .map(p -> PedidoDetalle.builder()
                        .nombre(p.getNombre())
                        .precio(p.getPrecio())
                        .pedido(pedido)
                        .build())
                .collect(Collectors.toList());

        pedido.setDetalles(detalles);

        // Guardar en base de datos
        Pedido guardado = repo.save(pedido);

        // Convertir a DTO para la respuesta
        return toDto(guardado);
    }

    /**
     * Lista todos los pedidos.
     */
    public List<PedidoDto> listar() {
        return repo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene un pedido por su ID.
     */
    public PedidoDto obtenerPorId(Integer id) {
        return repo.findById(id)
                .map(this::toDto)
                .orElse(null);
    }

    /**
     * Obtiene los pedidos pendientes de un cliente.
     */
    public List<PedidoDto> obtenerPendientesPorCliente(Integer clienteId) {
        return repo.findByClienteIdAndEstado(clienteId, "PENDIENTE").stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Actualiza el estado de un pedido.
     */
    public boolean actualizarEstado(Integer id, String nuevoEstado) {
        Optional<Pedido> opt = repo.findById(id);
        if (opt.isPresent()) {
            Pedido pedido = opt.get();
            pedido.setEstado(nuevoEstado);
            repo.save(pedido);
            return true;
        }
        return false;
    }

    /**
     * Conversión Entidad → DTO
     */
    private PedidoDto toDto(Pedido pedido) {
        PedidoDto dto = new PedidoDto();
        dto.setId(pedido.getId());
        dto.setClienteId(pedido.getClienteId());
        dto.setTotal(pedido.getTotal());
        dto.setEstado(pedido.getEstado());

        // Convertir detalles → lista de ProductoDto
        List<ProductoDto> productos = pedido.getDetalles().stream()
                .map(d -> {
                    ProductoDto p = new ProductoDto();
                    p.setNombre(d.getNombre());
                    p.setPrecio(d.getPrecio());
                    return p;
                })
                .collect(Collectors.toList());

        dto.setProductos(productos);
        return dto;
    }
}