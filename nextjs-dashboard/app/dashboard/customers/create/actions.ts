"use server";

export async function crearCliente(formData: FormData) {
  const nombre = formData.get("nombre");
  const correo = formData.get("correo");

  const body = {
    nombre,
    correo,
  };

  const resp = await fetch("http://localhost:8080/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw new Error("Error al crear el cliente");
  }

  return await resp.json();
}
