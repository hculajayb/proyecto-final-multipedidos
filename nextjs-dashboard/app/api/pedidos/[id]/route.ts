import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const resp = await fetch(`http://localhost:8080/pedidos/${id}`);

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: resp.status }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
