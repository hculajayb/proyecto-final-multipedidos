package uk.techiegt.clipe.componenteA.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import uk.techiegt.clipe.componenteA.model.ClienteDto;
import uk.techiegt.clipe.componenteA.model.ClienteInputDto;
import uk.techiegt.clipe.componenteA.services.ClienteService;
import uk.techiegt.clipe.componenteA.spec.ClientesApi;

import java.util.List;

/**
 * Implementación del contrato OpenAPI (ClientesApi)
 * para la gestión de clientes.
 */
@RestController
public class ClienteController implements ClientesApi {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    /**
     * Crear un cliente (POST /clientes)
     */
    @Override
    public ResponseEntity<ClienteDto> crearCliente(ClienteInputDto clienteInputDto) {
        try {
            ClienteDto nuevo = clienteService.crear(clienteInputDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Listar todos los clientes (GET /clientes)
     */
    @Override
    public ResponseEntity<List<ClienteDto>> listarClientes() {
        List<ClienteDto> lista = clienteService.listar();
        return ResponseEntity.ok(lista);
    }

    /**
     * Obtener cliente por ID (GET /clientes/{id})
     */
    @Override
    public ResponseEntity<ClienteDto> obtenerClientePorId(Integer id) {
        ClienteDto cliente = clienteService.obtenerPorId(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
