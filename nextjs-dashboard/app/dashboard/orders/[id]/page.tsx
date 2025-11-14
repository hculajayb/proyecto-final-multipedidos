"use client";

import { useEffect, useState } from "react";
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

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/pedidos/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Not found");
        return await res.json();
      })
      .then(setPedido)
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

      {/* Basic info */}
      <div className="border rounded-md p-4 bg-gray-50">
        <p><strong>Customer ID:</strong> {pedido?.clienteId}</p>
        <p><strong>Status:</strong> {pedido?.estado}</p>
        <p><strong>Total:</strong> Q{pedido?.total.toFixed(2)}</p>
        <p><strong>Created at:</strong> {pedido?.fechaCreacion}</p>
      </div>

      {/* Product list */}
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
              {pedido?.productos.map((prod, idx) => (
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