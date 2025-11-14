import OrdersTable from "@/app/ui/orders/table";

export default async function OrdersPage() {
  const res = await fetch("http://localhost:3000/api/pedidos", {
    next: { revalidate: 5 },
  });

  const orders = await res.json();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <a
          href="/dashboard/orders/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Create Order
        </a>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
