import CustomersTable from "@/app/ui/customers/table";

export default async function CustomersPage() {
  const res = await fetch("http://localhost:8080/clientes", {
    next: { revalidate: 5 },
  });

  const customers = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Customers</h1>

      <CustomersTable customers={customers} />
    </div>
  );
}