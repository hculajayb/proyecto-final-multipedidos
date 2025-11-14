import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✔️ Corrección obligatoria

    const response = await fetch(`http://localhost:8080/clientes/${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    const cliente = await response.json();
    return NextResponse.json(cliente);
  } catch (err) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}