import Link from "next/link";
import { EditCustomerButton, DeleteCustomerButton } from "./buttons";

interface Customer {
  id: number;
  nombre: string;
  correo: string;
}

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">ID</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">Email</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">{c.id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">{c.nombre}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">{c.correo}</td>

                  <div className="flex justify-end gap-2">
                    <EditCustomerButton id={c.id} />
                    <DeleteCustomerButton id={c.id} />
                  </div>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}