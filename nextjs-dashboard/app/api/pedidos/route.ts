import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:8080/pedidos", {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const resp = await fetch("http://localhost:8080/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}