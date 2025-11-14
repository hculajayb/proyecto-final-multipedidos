import { getFacturas } from '@/app/lib/api';

export default async function LatestInvoices() {
  const facturas = await getFacturas();

  // Mostrar solo las últimas 5
  const ultimas = facturas.slice(-5).reverse();

  return (
    <div className="card p-4">
      <h2 className="text-xl mb-4">Latest Invoices</h2>

      <ul className="space-y-3">
        {ultimas.map((f) => (
          <li key={f.id} className="flex justify-between">
            <span>Factura #{f.id}</span>
            <span>${f.totalFactura.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
