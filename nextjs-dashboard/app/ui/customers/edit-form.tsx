"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

export default function EditCustomerForm({ id }: Props) {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 1. Cargar datos del cliente al iniciar
  useEffect(() => {
    async function loadCustomer() {
      try {
        const res = await fetch(`http://localhost:8080/clientes/${id}`);
        if (!res.ok) throw new Error("Error loading customer");

        const data = await res.json();
        setNombre(data.nombre);
        setCorreo(data.correo);
      } catch (err) {
        setError("Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [id]);

  // 🔹 2. Guardar cambios
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      nombre,
      correo,
    };

    try {
      const res = await fetch(`http://localhost:8080/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      router.push("/dashboard/customers");
      router.refresh();
    } catch {
      setError("Failed to update customer.");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg"
      >
        Update Customer
      </button>
    </form>
  );
}