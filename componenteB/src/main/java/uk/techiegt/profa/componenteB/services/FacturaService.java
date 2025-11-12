package uk.techiegt.profa.componenteB.services;

import org.springframework.stereotype.Service;
import uk.techiegt.profa.componenteB.entities.Factura;
import uk.techiegt.profa.componenteB.model.FacturaDto;
import uk.techiegt.profa.componenteB.model.FacturaInputDto;
import uk.techiegt.profa.componenteB.model.PedidoReferenciaDto;
import uk.techiegt.profa.componenteB.repositories.FacturaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacturaService {

    private final FacturaRepository facturaRepository;

    public FacturaService(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    public FacturaDto crear(FacturaInputDto input) {
        Factura f = new Factura();
        f.setProveedorId(input.getProveedorId());

        // calcular totalFactura (double en entidad) desde los pedidos (BigDecimal en DTO)
        double total = input.getPedidos() != null
                ? input.getPedidos().stream()
                .map(PedidoReferenciaDto::getTotal)
                .mapToDouble(Double::doubleValue)
                .sum()
                : 0.0;
        f.setTotalFactura(total);

        Factura guardada = facturaRepository.save(f);
        return toDto(guardada, input.getPedidos());
    }

    public List<FacturaDto> listar() {
        return facturaRepository.findAll()
                .stream()
                .map(f -> toDto(f, null))
                .collect(Collectors.toList());
    }

    public FacturaDto obtenerPorId(Integer id) {
        Optional<Factura> fact = facturaRepository.findById(id);
        return fact.map(f -> toDto(f, null)).orElse(null);
    }

    private FacturaDto toDto(Factura entity, List<PedidoReferenciaDto> pedidos) {
        FacturaDto dto = new FacturaDto();
        dto.setId(entity.getId() != null ? entity.getId() : null);
        dto.setProveedorId(entity.getProveedorId() != null ? entity.getProveedorId() : null);
        dto.setTotalFactura(entity.getTotalFactura()); // entidad = double → DTO = BigDecimal
        dto.setPedidos(pedidos); // opcional, si quieres devolver eco del request
        return dto;
    }
}
