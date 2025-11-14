"use client";

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
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}