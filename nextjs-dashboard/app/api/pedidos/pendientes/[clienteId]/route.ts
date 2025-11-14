// /app/api/pedidos/pendientes/[clienteId]/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:8080/pedidos/pendientes";

export async function GET(
  req: Request,
  { params }: { params: { clienteId: string } }
) {
  const url = `${BASE_URL}/${params.clienteId}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
