import { updateCustomer } from "@/app/lib/actions";

export default async function EditCustomer({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:8080/clientes/${params.id}`);
  const customer = await res.json();

  async function action(formData: FormData) {
    "use server";

    await updateCustomer(Number(params.id), {
      nombre: formData.get("nombre") as string,
      correo: formData.get("correo") as string,
    });
  }

  return (
    <form action={action} className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Edit Customer</h1>

      <h2 className="text-lg">Name:</h2>  
      <input
        name="nombre"
        defaultValue={customer.nombre}
        className="border p-2 w-full"
      />
      
      <h2 className="text-lg">Email:</h2>
      <input
        name="correo"
        defaultValue={customer.correo}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save
      </button>
    </form>
  );
}
