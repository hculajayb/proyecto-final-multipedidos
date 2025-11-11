package uk.techiegt.clipe.componenteA.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.techiegt.clipe.componenteA.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {}