"use client";

import Link from "next/link";

interface Order {
  id: number;
  clienteNombre: string;
  total: number;
  estado: string;
  fechaCreacion: string;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="border-b text-gray-500 text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{o.id}</td>

                <td className="px-4 py-3">{o.clienteNombre}</td>

                <td className="px-4 py-3">${o.total.toFixed(2)}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      o.estado === "PENDIENTE"
                        ? "bg-yellow-500"
                        : o.estado === "FACTURADO"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {o.estado}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {new Date(o.fechaCreacion).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}