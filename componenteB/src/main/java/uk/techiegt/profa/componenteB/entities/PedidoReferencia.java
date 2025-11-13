package uk.techiegt.profa.componenteB.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pedido_referencia")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoReferencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer pedidoId;

    private Integer clienteId;

    private Double total;

    // 🔥 RELACIÓN NECESARIA PARA .factura() EN EL BUILDER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factura_id")
    private Factura factura;
}
