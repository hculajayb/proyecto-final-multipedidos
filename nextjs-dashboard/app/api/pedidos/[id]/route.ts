import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;  // ✔️ Ahora sí

  const resp = await fetch(`http://localhost:8080/pedidos/${id}`);

  const data = await resp.json();
  return Response.json(data);
}

