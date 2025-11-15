"use client";

import { useEffect, useState } from "react";

interface Cliente {
  id: number;
  nombre: string;
}

interface Producto {
  nombre: string;
  precio: number;
}

export default function CreateOrderForm() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);

  const [productos, setProductos] = useState<Producto[]>([
    { nombre: "", precio: 0 }
  ]);

  // Cargar clientes desde el proxy
  useEffect(() => {
    fetch("/api/clientes")
      .then((res) => res.json())
      .then(setClientes)
      .catch(() => console.error("Error loading customers"));
  }, []);

  /** Agregar un producto */
  const addProduct = () => {
    setProductos([...productos, { nombre: "", precio: 0 }]);
  };

  /** Quitar un producto */
  const removeProduct = (index: number) => {
    const updated = [...productos];
    updated.splice(index, 1);
    setProductos(updated);
  };

  /** Actualizar un producto */
  const updateProduct = (index: number, field: string, value: string | number) => {
    const updated = [...productos];
    updated[index] = { ...updated[index], [field]: value };
    setProductos(updated);
  };

  /** Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      clienteId,
      productos
    };

    const resp = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (resp.ok) {
      alert("Order created successfully");
      window.location.href = "/dashboard/orders";
    } else {
      alert("Error creating order");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">

      {/* Selección de Cliente */}
      <div>
        <label className="block mb-1 font-medium">Customer</label>
        <select
          className="border p-2 rounded-md w-full"
          required
          onChange={(e) => setClienteId(Number(e.target.value))}
        >
          <option value="">Select customer</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Productos dinámicos */}
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">Products</h3>

        {productos.map((prod, index) => (
          <div key={index} className="mb-4 border-b pb-3">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <label className="block font-medium">Product #{index + 1}</label>
            <label className="block font-medium">Price</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                type="text"
                placeholder="Product name"
                className="border p-2 rounded-md w-full"
                value={prod.nombre}
                required
                onChange={(e) =>
                  updateProduct(index, "nombre", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded-md w-full"
                min="0"
                step=".01"
                required
                value={prod.precio === 0 ? "" : prod.precio}
                onChange={(e) => {
                  const val = e.target.value;
                  updateProduct(index, "precio", val === "" ? 0 : Number(val));
                }}
              />
            </div>

            {productos.length > 1 && (
              <button
                type="button"
                className="text-red-600 text-sm mt-2 hover:underline"
                onClick={() => removeProduct(index)}
              >
                Remove product
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500"
          onClick={addProduct}
        >
          + Add Product
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
      >
        Create Order
      </button>
    </form>
  );
}
