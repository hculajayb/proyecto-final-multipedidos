"use client";

import Link from "next/link";
import { deleteCustomer } from "@/app/lib/actions";

export function EditCustomerButton({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      Edit
    </Link>
  );
}

export function DeleteCustomerButton({ id }: { id: number }) {
  const action = deleteCustomer.bind(null, id);

  return (
    <form action={action}>
      <button className="rounded-md border p-2 hover:bg-red-100 text-red-600">
        Delete
      </button>
    </form>
  );
}