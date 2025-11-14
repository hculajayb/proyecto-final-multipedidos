import CreateOrderForm from "@/app/ui/orders/create-form";

export default function CreateOrderPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create Order</h1>

      <CreateOrderForm />
    </div>
  );
}
