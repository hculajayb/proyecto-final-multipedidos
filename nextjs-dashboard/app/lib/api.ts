// lib/api.ts

import {
  Cliente,
  Pedido,
  PedidoPendiente,
  Proveedor,
  Factura,
  CrearFacturaInput,
  DashboardMetrics,
} from './definitions';

const API_A =
  process.env.NEXT_PUBLIC_API_A || 'http://localhost:8080';
const API_B =
  process.env.NEXT_PUBLIC_API_B || 'http://localhost:8081';

/**
 * Helper genérico para hacer fetch y parsear JSON
 */
async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    // Evitar cache en server components para tener datos frescos
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `Error al llamar ${url}: ${res.status} ${res.statusText} ${body}`,
    );
  }

  return (await res.json()) as T;
}

// ---------------------------------------------------------------------------
//                       COMONENTE A — CLIENTES / PEDIDOS
// ---------------------------------------------------------------------------

export async function getClientes(): Promise<Cliente[]> {
  return fetchJson<Cliente[]>(`${API_A}/clientes`);
}

export async function getClientePorId(
  id: number,
): Promise<Cliente | null> {
  try {
    return await fetchJson<Cliente>(`${API_A}/clientes/${id}`);
  } catch (e) {
    // si tu API devuelve 404, esto te permite manejarlo como null
    return null;
  }
}

export async function getPedidos(): Promise<Pedido[]> {
  return fetchJson<Pedido[]>(`${API_A}/pedidos`);
}

export async function getPedidoPorId(
  id: number,
): Promise<Pedido | null> {
  try {
    return await fetchJson<Pedido>(`${API_A}/pedidos/${id}`);
  } catch (e) {
    return null;
  }
}

// Pedidos pendientes por cliente
export async function getPedidosPendientesPorCliente(
  clienteId: number,
): Promise<PedidoPendiente[]> {
  return fetchJson<PedidoPendiente[]>(
    `${API_A}/pedidos/pendientes/${clienteId}`,
  );
}

// ---------------------------------------------------------------------------
//                       COMPONENTE B — PROVEEDORES / FACTURAS
// ---------------------------------------------------------------------------

export async function getProveedores(): Promise<Proveedor[]> {
  return fetchJson<Proveedor[]>(`${API_B}/proveedores`);
}

export async function getProveedorPorId(
  id: number,
): Promise<Proveedor | null> {
  try {
    return await fetchJson<Proveedor>(`${API_B}/proveedores/${id}`);
  } catch (e) {
    return null;
  }
}

export async function getFacturas(): Promise<Factura[]> {
  return fetchJson<Factura[]>(`${API_B}/facturas`);
}

export async function getFacturaPorId(
  id: number,
): Promise<Factura | null> {
  try {
    return await fetchJson<Factura>(`${API_B}/facturas/${id}`);
  } catch (e) {
    return null;
  }
}

// Crear una factura (usa la lógica que ya implementaste en el backend)
export async function crearFactura(
  input: CrearFacturaInput,
): Promise<Factura> {
  return fetchJson<Factura>(`${API_B}/facturas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

// ---------------------------------------------------------------------------
//                       MÉTRICAS PARA EL DASHBOARD
// ---------------------------------------------------------------------------

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [clientes, pedidos, facturas] = await Promise.all([
    getClientes(),
    getPedidos(),
    getFacturas(),
  ]);

  const totalCustomers = clientes.length;
  const totalInvoices = facturas.length;

  const collected = facturas.reduce(
    (acc, f) => acc + (f.totalFactura ?? 0),
    0,
  );

  const pending = pedidos
    .filter((p) => p.estado === 'PENDIENTE')
    .reduce((acc, p) => acc + (p.total ?? 0), 0);

  return {
    collected,
    pending,
    totalInvoices,
    totalCustomers,
  };
}