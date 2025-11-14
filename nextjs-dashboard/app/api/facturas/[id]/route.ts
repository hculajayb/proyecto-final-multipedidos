export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ✔️ Ahora sí

  try {
    const response = await fetch(`http://localhost:8081/facturas/${id}`);

    if (!response.ok) {
      return new Response("Factura no encontrada", { status: 404 });
    }

    const factura = await response.json();
    return Response.json(factura);
  } catch (e) {
    return new Response("Error interno", { status: 500 });
  }
}
