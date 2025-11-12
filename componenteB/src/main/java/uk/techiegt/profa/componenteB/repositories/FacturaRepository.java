package uk.techiegt.profa.componenteB.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.techiegt.profa.componenteB.entities.Factura;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {}
