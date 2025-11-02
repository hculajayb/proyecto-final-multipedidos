package uk.techiegt.clipe.componenteA.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.techiegt.clipe.componenteA.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {}
