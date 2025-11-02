package uk.techiegt.profa.componenteB.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import uk.techiegt.central.services.IntegracionServicios;
import uk.techiegt.profa.componenteB.dto.FacturaInput;
import uk.techiegt.profa.componenteB.dto.PedidoReferencia;
import uk.techiegt.profa.componenteB.entities.Factura;
import uk.techiegt.profa.componenteB.repositories.FacturaRepository;

@Service
public class FacturaService {
    private final FacturaRepository repo;
    private final IntegracionServicios integracion = new IntegracionServicios();

    @Value("${app.componenteA.base-url}")
    private String baseUrlA;

    public FacturaService(FacturaRepository repo) { this.repo = repo; }

    public Factura crear(FacturaInput input) {
        double total = 0.0;
        for (PedidoReferencia pr : input.pedidos()) {
            double t = (pr.total() != null)
                    ? pr.total()
                    : integracion.obtenerTotalPedidoDesdeA(baseUrlA, pr.pedidoId());
            total += t;
        }
        Factura f = Factura.builder()
                .proveedorId(input.proveedorId())
                .totalFactura(Math.round(total * 100.0) / 100.0)
                .build();
        return repo.save(f);
    }
}