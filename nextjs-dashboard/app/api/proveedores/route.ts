// /app/api/proveedores/route.ts
import { NextResponse } from "next/server";

const API_URL = "http://localhost:8081/proveedores";

export async function GET() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
