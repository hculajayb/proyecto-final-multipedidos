import CustomersTable from "@/app/ui/customers/table";
import Link from "next/link";

export default async function CustomersPage() {
  const res = await fetch("http://localhost:8080/clientes", {
    next: { revalidate: 5 },
  });

  const customers = await res.json();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">Customers</h1>
          <Link
              href="/dashboard/customers/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Create Customer
            </Link>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}