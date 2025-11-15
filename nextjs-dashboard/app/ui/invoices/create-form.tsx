"use client";

import { useState, useEffect } from "react";

interface Cliente {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
}

interface PedidoPendiente {
  id: number;
  total: number;
  estado: string;
}

export default function CreateFacturaForm() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [pedidos, setPedidos] = useState<PedidoPendiente[]>([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [errorPedidos, setErrorPedidos] = useState("");

  // 🔵 Cargar clientes
  useEffect(() => {
    fetch("/api/clientes")
      .then((res) => res.json())
      .then(setClientes)
      .catch(() => console.error("Error al cargar clientes"));
  }, []);

  // 🟣 Cargar proveedores (componente B)
  useEffect(() => {
    fetch("/api/proveedores")
      .then((res) => res.json())
      .then(setProveedores)
      .catch(() => console.error("Error al cargar proveedores"));
  }, []);

  // 🟠 Cargar pedidos pendientes cuando cambia el cliente
  useEffect(() => {
  if (!selectedCliente) return;

  setLoadingPedidos(true);
  setErrorPedidos("");
  setPedidos([]);

  fetch(`/api/pedidos/pendientes/${selectedCliente}`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error al cargar pedidos");
      const data = await res.json();

      // 🚀 Manejo correcto cuando Componente A devuelve []
      if (!data || data.length === 0) {
        setErrorPedidos("No hay pedidos pendientes para este cliente.");
        return [];
      }

      return data;
    })
    .then((data) => {
      setPedidos(data);
    })
    .catch(() => {
      setErrorPedidos("No hay pedidos pendientes para este cliente.");
    })
    .finally(() => setLoadingPedidos(false));
}, [selectedCliente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const proveedorId = (document.getElementById("proveedor") as HTMLSelectElement).value;

    const body = {
      clienteId: selectedCliente,
      proveedorId: Number(proveedorId),
    };

    const resp = await fetch("/api/facturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (resp.ok) {
      alert("Factura creada exitosamente");
      window.location.href = "/dashboard/invoices";
    } else {
      alert("Error al crear factura");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-xl">

      {/* Select Cliente */}
      <div>
        <label className="block mb-1 font-medium">Cliente</label>
        <select
          className="border p-2 w-full rounded-md"
          onChange={(e) => setSelectedCliente(Number(e.target.value))}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* Select Proveedor */}
      <div>
        <label className="block mb-1 font-medium">Proveedor</label>
        <select id="proveedor" className="border p-2 w-full rounded-md" required>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tabla de pedidos pendientes */}
      <div className="border rounded-md p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">Pedidos pendientes</h3>

        {loadingPedidos && <p>Cargando pedidos...</p>}

        {errorPedidos && (
          <p className="text-red-600 text-sm">{errorPedidos}</p>
        )}

        {!loadingPedidos && pedidos.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Total</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">Q{p.total.toFixed(2)}</td>
                  <td className="p-2">{p.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
      >
        Crear Factura
      </button>
    </form>
  );
}