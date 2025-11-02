package uk.techiegt.profa.componenteB.dto;

import java.util.List;
public record FacturaInput(Long proveedorId, List<PedidoReferencia> pedidos) {}
