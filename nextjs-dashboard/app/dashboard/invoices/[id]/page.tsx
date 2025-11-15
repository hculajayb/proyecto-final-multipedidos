"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface PedidoReferencia {
  pedidoId: number;
  total: number;
}

interface Factura {
  id: number;
  clienteId: number;
  proveedorId: number;
  totalFactura: number;
  fechaCreacion: string;
  pedidos: PedidoReferencia[];
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const facturaId = params?.id;

  const [factura, setFactura] = useState<Factura | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facturaId) return;

    fetch(`/api/facturas/${facturaId}`)
      .then((res) => res.json())
      .then(setFactura)
      .finally(() => setLoading(false));
  }, [facturaId]);

  if (loading) return <p>Loading...</p>;
  if (!factura) return <p className="text-red-600">Invoice not found.</p>;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/invoices" className="text-blue-600 hover:underline">
        ← Back to Invoices
      </Link>

      <h1 className="text-2xl font-semibold">Invoice #{factura.id}</h1>

      <div className="border p-4 rounded-md bg-gray-50">
        <p><strong>Cliente:</strong> {factura.clienteId}</p>
        <p><strong>Proveedor:</strong> {factura.proveedorId}</p>
        <p><strong>Total:</strong> Q{factura.totalFactura.toFixed(2)}</p>
        <p><strong>Fecha:</strong> {new Date(factura.fechaCreacion).toLocaleString()}</p>
      </div>

      <h2 className="text-xl font-semibold">Pedidos incluidos</h2>

      {factura.pedidos.length === 0 ? (
        <p className="text-gray-600">No orders associated with this invoice.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Pedido ID</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {factura.pedidos.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.pedidoId}</td>
                <td className="p-3">${p.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}