package uk.techiegt.profa.componenteB.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uk.techiegt.profa.componenteB.entities.Factura;
import uk.techiegt.profa.componenteB.entities.PedidoReferencia;
import uk.techiegt.profa.componenteB.model.FacturaDto;
import uk.techiegt.profa.componenteB.model.FacturaInputDto;
import uk.techiegt.profa.componenteB.model.PedidoReferenciaDto;
import uk.techiegt.profa.componenteB.repositories.FacturaRepository;
import uk.techiegt.profa.componenteB.repositories.PedidoReferenciaRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacturaService {

    private final FacturaRepository facturaRepository;
    private final PedidoReferenciaRepository pedidoRefRepository;
    private final RestTemplate restTemplate;

    @Value("${componenteA.url:http://localhost:8080}")
    private String componenteAUrl;

    public FacturaService(FacturaRepository facturaRepository,
                          PedidoReferenciaRepository pedidoRefRepository) {
        this.facturaRepository = facturaRepository;
        this.pedidoRefRepository = pedidoRefRepository;
        this.restTemplate = new RestTemplate();
    }

    /**
     * Crea una factura:
     * - Consulta pedidos pendientes de un cliente en el Componente A
     * - Calcula el total de la factura
     * - Persiste la factura
     * - Guarda pedido_referencia para cada pedido
     * - Actualiza el estado de los pedidos (FACTURADO)
     */
    public FacturaDto crearFactura(FacturaInputDto input) {

        if (input.getProveedorId() == null || input.getClienteId() == null) {
            throw new IllegalArgumentException("proveedorId y clienteId son obligatorios");
        }

        Integer clienteId = input.getClienteId();

        // 1️⃣ Obtener pedidos pendientes desde Componente A
        String url = componenteAUrl + "/pedidos/pendientes/" + clienteId;
        PedidoDesdeA[] respuesta = restTemplate.getForObject(url, PedidoDesdeA[].class);

        if (respuesta == null || respuesta.length == 0) {
            throw new IllegalStateException("No hay pedidos pendientes para el cliente con id " + clienteId);
        }

        List<PedidoDesdeA> pedidosPendientes = Arrays.asList(respuesta);

        // 2️⃣ Sumar el total de los pedidos
        double totalFactura = pedidosPendientes.stream()
                .mapToDouble(PedidoDesdeA::getTotal)
                .sum();

        // 3️⃣ Crear y guardar factura
        Factura factura = new Factura();
        factura.setProveedorId(input.getProveedorId());
        factura.setClienteId(clienteId);
        factura.setTotalFactura(totalFactura);

        Factura guardada = facturaRepository.save(factura);

        // 4️⃣ Guardar pedido_referencia (detalle)
        List<PedidoReferencia> referencias = pedidosPendientes.stream()
                .map(p -> PedidoReferencia.builder()
                        .pedidoId(p.getId())
                        .clienteId(clienteId)
                        .total(p.getTotal())
                        .factura(guardada)
                        .build())
                .toList();

        pedidoRefRepository.saveAll(referencias);

        // 5️⃣ Actualizar estado en Componente A
        pedidosPendientes.forEach(p -> {
            String urlActualizar = componenteAUrl
                    + "/pedidos/" + p.getId()
                    + "/estado?estado=FACTURADO";

            restTemplate.put(urlActualizar, null);
        });

        // 6️⃣ Construir DTO final
        return toDto(guardada, referencias);
    }

    public List<FacturaDto> listar() {
        return facturaRepository.findAll()
                .stream()
                .map(f -> toDto(f, pedidoRefRepository.findByFactura(f)))
                .collect(Collectors.toList());
    }

    public FacturaDto obtenerPorId(Integer id) {
        return facturaRepository.findById(id)
                .map(f -> toDto(f, pedidoRefRepository.findByFactura(f)))
                .orElse(null);
    }

    private FacturaDto toDto(Factura factura, List<PedidoReferencia> referencias) {
        FacturaDto dto = new FacturaDto();
        dto.setId(factura.getId());
        dto.setProveedorId(factura.getProveedorId());
        dto.setClienteId(factura.getClienteId());
        dto.setTotalFactura(factura.getTotalFactura());

        List<PedidoReferenciaDto> pedidos = new ArrayList<>();

        if (referencias != null) {
            for (PedidoReferencia r : referencias) {
                PedidoReferenciaDto ref = new PedidoReferenciaDto();
                ref.setPedidoId(r.getPedidoId());
                ref.setTotal(r.getTotal());
                pedidos.add(ref);
            }
        }

        dto.setPedidos(pedidos);

        return dto;
    }

    /**
     * Clase interna usada para consumir la respuesta del Componente A
     * Debe coincidir con PedidoDto del componente A para id y total
     */
    private static class PedidoDesdeA {
        private Integer id;
        private Double total;

        public Integer getId() { return id; }

        public void setId(Integer id) { this.id = id; }

        public Double getTotal() { return total; }

        public void setTotal(Double total) { this.total = total; }
    }
}