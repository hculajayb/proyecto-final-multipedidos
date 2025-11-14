import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Pedidos desde Componente A
    const resPedidos = await fetch("http://localhost:8080/pedidos");
    const pedidos = await resPedidos.json();

    // Clientes desde Componente A
    const resClientes = await fetch("http://localhost:8080/clientes");
    const clientes = await resClientes.json();

    // Index rápido de clientes por ID
    const clienteMap = new Map(
      clientes.map((c: any) => [c.id, c.nombre])
    );

    // Enriquecer pedidos con clienteNombre
    const enriched = pedidos.map((p: any) => ({
      id: p.id,
      clienteId: p.clienteId,
      clienteNombre: clienteMap.get(p.clienteId) ?? "Desconocido",
      total: p.total,
      estado: p.estado,
      fechaCreacion: p.fechaCreacion,
    }));

    return NextResponse.json(enriched);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load orders" },
      { status: 500 }
    );
  }
}