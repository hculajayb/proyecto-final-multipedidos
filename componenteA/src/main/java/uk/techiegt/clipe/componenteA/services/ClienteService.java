package uk.techiegt.clipe.componenteA.services;

import org.springframework.stereotype.Service;
import uk.techiegt.clipe.componenteA.entities.Cliente;
import uk.techiegt.clipe.componenteA.model.ClienteDto;
import uk.techiegt.clipe.componenteA.model.ClienteInputDto;
import uk.techiegt.clipe.componenteA.repositories.ClienteRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio encargado de la lógica de negocio relacionada con la gestión de clientes.
 * Implementa la conversión entre entidades JPA y modelos OpenAPI (ClienteDto / ClienteInputDto).
 */
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    /**
     * Crea un nuevo cliente a partir de los datos del modelo OpenAPI (ClienteInputDto).
     *
     * @param input Datos del cliente a registrar.
     * @return ClienteDto con el cliente creado.
     */
    public ClienteDto crear(ClienteInputDto input) {
        Cliente nuevo = Cliente.builder()
                .nombre(input.getNombre())
                .correo(input.getCorreo())
                .build();

        Cliente guardado = clienteRepository.save(nuevo);

        return toDto(guardado);
    }

    /**
     * Lista todos los clientes registrados en la base de datos.
     *
     * @return Lista de clientes en formato OpenAPI (ClienteDto).
     */
    public List<ClienteDto> listar() {
        return clienteRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene un cliente por su ID.
     *
     * @param id Identificador del cliente.
     * @return ClienteDto si existe, o null si no se encuentra.
     */
    public ClienteDto obtenerPorId(Integer id) {
        return clienteRepository.findById(id)
                .map(this::toDto)
                .orElse(null);
    }

    // =====================
    // Métodos privados
    // =====================

    private ClienteDto toDto(Cliente cliente) {
        ClienteDto dto = new ClienteDto();
        dto.setId(cliente.getId());
        dto.setNombre(cliente.getNombre());
        dto.setCorreo(cliente.getCorreo());
        return dto;
    }
}
