"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCustomerForm() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      nombre,
      correo,
    };

    try {
      const res = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error();
      }

      router.push("/dashboard/customers");
      router.refresh();
    } catch (err) {
      setError("Failed to create customer. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
      >
        Save Customer
      </button>
    </form>
  );
}
