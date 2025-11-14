"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OrdersTable from "@/app/ui/orders/table";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/list")
      .then((res) => res.json())
      .then(setOrders)
      .catch(() => console.error("Error loading orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">Orders</h1>
          <Link
              href="/dashboard/orders/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Create Order
            </Link>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}