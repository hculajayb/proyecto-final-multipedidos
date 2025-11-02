package uk.techiegt.clipe.componenteA.dto;

import java.util.List;

public record PedidoInput(Long clienteId, List<ProductoDto> productos) {}
