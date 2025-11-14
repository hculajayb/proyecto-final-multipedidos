// lib/definitions.ts

// ---------- Componente A: Clientes / Pedidos ----------

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export interface Pedido {
  id: number;
  clienteId: number;
  total: number;
  estado: string; // "PENDIENTE" | "FACTURADO" u otros
}

// Este tipo te servirá si quieres mostrar pedidos "pendientes" por cliente
export interface PedidoPendiente extends Pedido {}

// ---------- Componente B: Proveedores / Facturas ----------

export interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
}

export interface PedidoReferencia {
  pedidoId: number;
  total: number;
}

export interface Factura {
  id: number;
  proveedorId: number;
  clienteId: number;
  totalFactura: number;
  pedidos: PedidoReferencia[];
}

// DTO para crear factura desde el dashboard
export interface CrearFacturaInput {
  proveedorId: number;
  clienteId: number;
}

// ---------- Tipos auxiliares para el dashboard ----------

export interface DashboardMetrics {
  collected: number;        // total facturado
  pending: number;          // suma de pedidos pendientes (estado PENDIENTE)
  totalInvoices: number;    // cantidad de facturas
  totalCustomers: number;   // cantidad de clientes
}