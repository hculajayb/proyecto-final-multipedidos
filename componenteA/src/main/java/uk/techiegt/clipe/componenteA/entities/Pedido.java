package uk.techiegt.clipe.componenteA.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cliente_id", nullable = false)
    private Integer clienteId;

    @Column(nullable = false)
    private double total;

    @Builder.Default
    @Column(length = 50)
    private String estado = "PENDIENTE";

    @Builder.Default
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PedidoDetalle> detalles = new ArrayList<>();

    public void agregarDetalle(PedidoDetalle detalle) {
        detalle.setPedido(this);
        this.detalles.add(detalle);
    }
}
