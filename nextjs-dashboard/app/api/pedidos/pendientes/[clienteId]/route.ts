// /app/api/pedidos/pendientes/[clienteId]/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:8080/pedidos/pendientes";

export async function GET(
  req: Request,
  context: { params: Promise<{ clienteId: string }> }
) {
  try {
    // 🔥 Corrección obligatoria en Next.js 15
    const { clienteId } = await context.params;

    if (!clienteId) {
      return NextResponse.json(
        { error: "clienteId es requerido" },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}/${clienteId}`;
    const response = await fetch(url);

    // Manejo de errores del backend
    if (!response.ok) {
      return NextResponse.json(
        { error: "No se pudo obtener los pedidos pendientes" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Si no hay pedidos, devolvemos un mensaje amigable
    if (Array.isArray(data) && data.length === 0) {
      return NextResponse.json(
        { message: "El cliente no tiene pedidos pendientes", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error interno en /api/pedidos/pendientes:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}