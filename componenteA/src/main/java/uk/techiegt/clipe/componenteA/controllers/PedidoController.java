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
 * para la gestión de pedidos con detalle de productos.
 */
@RestController
public class PedidoController implements PedidosApi {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    /**
     * POST /pedidos
     * Crea un nuevo pedido con sus productos.
     */
    @Override
    public ResponseEntity<PedidoDto> crearPedido(PedidoInputDto pedidoInputDto) {
        try {
            PedidoDto nuevo = pedidoService.crear(pedidoInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * GET /pedidos
     * Lista todos los pedidos registrados (con sus productos).
     */
    @Override
    public ResponseEntity<List<PedidoDto>> listarPedidos() {
        List<PedidoDto> lista = pedidoService.listar();
        return ResponseEntity.ok(lista);
    }

    /**
     * GET /pedidos/{id}
     * Obtiene un pedido por su ID (incluyendo detalle de productos).
     */
    @Override
    public ResponseEntity<PedidoDto> obtenerPedidoPorId(Integer id) {
        PedidoDto pedido = pedidoService.obtenerPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * GET /pedidos/pendientes/{clienteId}
     * Obtiene los pedidos pendientes de un cliente.
     */
    @Override
    public ResponseEntity<List<PedidoDto>> obtenerPedidosPendientesPorCliente(Integer clienteId) {
        List<PedidoDto> pendientes = pedidoService.obtenerPendientesPorCliente(clienteId);
        return ResponseEntity.ok(pendientes);
    }

    /**
     * PUT /pedidos/{id}/estado
     * Actualiza el estado de un pedido (por ejemplo, FACTURADO).
     * Este endpoint no está en el contrato OpenAPI, pero se deja disponible para uso interno del Componente B.
     */
    @org.springframework.web.bind.annotation.PutMapping("/pedidos/{id}/estado")
    public ResponseEntity<Void> actualizarEstado(
            @org.springframework.web.bind.annotation.PathVariable Integer id,
            @org.springframework.web.bind.annotation.RequestParam String estado) {
        boolean actualizado = pedidoService.actualizarEstado(id, estado);
        return actualizado
                ? ResponseEntity.ok().build()
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}