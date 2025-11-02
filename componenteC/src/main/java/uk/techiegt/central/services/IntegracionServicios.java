package uk.techiegt.central.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/** Clase que permite al componente C consultar endpoints de A o B. */
public class IntegracionServicios {
    private final HttpClient http = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    /** Obtiene un pedido por ID del Componente A y retorna su "total". */
    public double obtenerTotalPedidoDesdeA(String baseUrlA, long pedidoId) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrlA + "/pedidos/" + pedidoId))
                    .GET().build();
            HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() == 200) {
                JsonNode json = mapper.readTree(res.body());
                return json.path("total").asDouble(0.0);
            }
            return 0.0;
        } catch (Exception e) {
            return 0.0;
        }
    }

    /** Ejemplo alterno: obtener una factura desde B y devolver su totalFactura. */
    public double obtenerTotalFacturaDesdeB(String baseUrlB, long facturaId) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrlB + "/facturas/" + facturaId))
                    .GET().build();
            HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() == 200) {
                JsonNode json = mapper.readTree(res.body());
                return json.path("totalFactura").asDouble(0.0);
            }
            return 0.0;
        } catch (Exception e) {
            return 0.0;
        }
    }
}
