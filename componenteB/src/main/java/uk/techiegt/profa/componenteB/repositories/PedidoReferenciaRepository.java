package uk.techiegt.profa.componenteB.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.techiegt.profa.componenteB.entities.Factura;
import uk.techiegt.profa.componenteB.entities.PedidoReferencia;

import java.util.List;

public interface PedidoReferenciaRepository extends JpaRepository<PedidoReferencia, Integer> {

    // Obtiene todas las referencias asociadas a una factura
    List<PedidoReferencia> findByFactura(Factura factura);
}
