"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Factura {
  id: number;
  clienteId: number;
  proveedorId: number;
  totalFactura: number;
  fechaCreacion: string;
}

export default function InvoicesPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/facturas")
      .then((res) => res.json())
      .then((data) => setFacturas(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>

        <Link
          href="/dashboard/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Create Invoice
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : facturas.length === 0 ? (
        <p className="text-gray-600">No invoices found.</p>
      ) : (
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">ID</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Proveedor</th>
              <th className="p-3">Total</th>
              <th className="p-3">Fecha</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{f.id}</td>
                <td className="p-3">{f.clienteId}</td>
                <td className="p-3">{f.proveedorId}</td>
                <td className="p-3">Q{f.totalFactura.toFixed(2)}</td>
                <td className="p-3">{new Date(f.fechaCreacion).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <Link
                    href={`/dashboard/invoices/${f.id}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}