package uk.techiegt.central.services;

import uk.techiegt.central.dto.Producto;
import java.util.List;
import java.util.UUID;

public class OperacionesNegocio {

    /** 12% IVA por defecto (ajústalo si tu caso requiere otro valor) */
    public static double calcularTotal(List<Producto> productos) {
        double subtotal = productos.stream().mapToDouble(Producto::getPrecio).sum();
        return Math.round(subtotal * 1.12 * 100.0) / 100.0;
    }

    public static String generarCodigoUnico(String tipoEntidad) {
        return tipoEntidad.toUpperCase() + "-" + UUID.randomUUID().toString().substring(0, 8);
    }
}
