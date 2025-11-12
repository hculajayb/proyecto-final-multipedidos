package uk.techiegt.clipe.componenteA.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.techiegt.clipe.componenteA.entities.Pedido;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByClienteIdAndEstado(Integer clienteId, String estado);
}