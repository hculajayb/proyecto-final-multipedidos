package uk.techiegt.profa.componenteB.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "factura")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Nuevo campo necesario para la factura
    @Column(name = "cliente_id", nullable = false)
    private Integer clienteId;

    @Column(name = "proveedor_id", nullable = false)
    private Integer proveedorId;

    @Column(name = "total_factura", nullable = false)
    private Double totalFactura;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "factura_id")
    private List<PedidoReferencia> pedidos;
}
