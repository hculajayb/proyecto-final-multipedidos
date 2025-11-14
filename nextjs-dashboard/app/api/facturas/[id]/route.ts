import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const facturaId = params.id;

  try {
    // Llamamos al Componente B en el puerto 8081
    const res = await fetch(`http://localhost:8081/facturas/${facturaId}`);

    if (!res.ok) {
      return NextResponse.json({ message: "Factura no encontrada" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Error al consultar la factura" },
      { status: 500 }
    );
  }
}