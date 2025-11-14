"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";

interface Producto {
  nombre: string;
  precio: number;
}

interface Pedido {
  id: number;
  clienteId: number;
  estado: string;
  total: number;
  fechaCreacion: string;
  productos: Producto[];
}

interface Cliente {
  id: number;
  nombre: string;
}

export default function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCliente, setLoadingCliente] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/pedidos/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error();
        return await r.json();
      })
      .then((pedido: Pedido) => {
        setPedido(pedido);

        setLoadingCliente(true);
        fetch(`/api/clientes/${pedido.clienteId}`)
          .then((r) => r.json())
          .then((data) => setCliente(data))
          .catch(() => console.error("Error loading customer"))
          .finally(() => setLoadingCliente(false));
      })
      .catch(() => setError("Order not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 space-y-6">
      <Link
        href="/dashboard/orders"
        className="text-blue-600 underline hover:text-blue-800"
      >
        ← Back to orders
      </Link>

      <h1 className="text-2xl font-semibold">Order Detail #{pedido?.id}</h1>

      <div className="border rounded-md p-4 bg-gray-50 space-y-1">
        <p>
          <strong>Customer:</strong>{" "}
          {loadingCliente ? "Loading..." : cliente?.nombre}
        </p>
        <p><strong>Status:</strong> {pedido?.estado}</p>
        <p><strong>Total:</strong> Q{pedido?.total.toFixed(2)}</p>
        <p><strong>Created at:</strong> {pedido?.fechaCreacion ?? "N/A"}</p>
      </div>

      <div className="border rounded-md p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">Products</h2>

        {pedido?.productos?.length ? (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {pedido.productos.map((prod, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{prod.nombre}</td>
                  <td className="p-2">Q{prod.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products in this order.</p>
        )}
      </div>
    </div>
  );
}