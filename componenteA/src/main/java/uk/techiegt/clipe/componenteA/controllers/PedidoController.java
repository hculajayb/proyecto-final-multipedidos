package uk.techiegt.clipe.componenteA.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import uk.techiegt.clipe.componenteA.model.PedidoDto;
import uk.techiegt.clipe.componenteA.model.PedidoInputDto;
import uk.techiegt.clipe.componenteA.services.PedidoService;
import uk.techiegt.clipe.componenteA.spec.PedidosApi;

import java.util.List;

/**
 * Controlador que implementa los endpoints definidos en ClienteApiSpecification.yaml
 * para la gestión de pedidos. Cumple con el contrato OpenAPI generado automáticamente.
 */
@RestController
public class PedidoController implements PedidosApi {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    /**
     * Crea un nuevo pedido.
     * Endpoint: POST /pedidos
     */
    @Override
    public ResponseEntity<PedidoDto> crearPedido(PedidoInputDto pedidoInputDto) {
        try {
            PedidoDto nuevo = pedidoService.crear(pedidoInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Lista todos los pedidos registrados.
     * Endpoint: GET /pedidos
     */
    @Override
    public ResponseEntity<List<PedidoDto>> listarPedidos() {
        List<PedidoDto> lista = pedidoService.listar();
        return ResponseEntity.ok(lista);
    }

    /**
     * Obtiene un pedido por su ID.
     * Endpoint: GET /pedidos/{id}
     */
    @Override
    public ResponseEntity<PedidoDto> obtenerPedidoPorId(Integer id) {
        PedidoDto pedido = pedidoService.obtenerPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}