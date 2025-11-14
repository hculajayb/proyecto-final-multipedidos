package uk.techiegt.profa.componenteB.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "factura")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "proveedor_id", nullable = false)
    private Integer proveedorId;

    @Column(name = "cliente_id", nullable = false)
    private Integer clienteId;

    @Column(name = "total_factura", nullable = false)
    private Double totalFactura;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL)
    private List<PedidoReferencia> pedidos = new ArrayList<>();
}
