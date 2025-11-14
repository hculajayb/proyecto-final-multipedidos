// app/dashboard/(overview)/page.tsx

import { getDashboardMetrics } from '@/app/lib/api';
import Cards from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export default async function Page() {

  // 🔥 Llamada real a las APIs Java (A & B)
  const metrics = await getDashboardMetrics();

  return (
    <main>
      {/* Tarjetas superiores */}
      <Cards
        collected={metrics.collected}
        pending={metrics.pending}
        totalInvoices={metrics.totalInvoices}
        totalCustomers={metrics.totalCustomers}
      />

      {/* Ingresos recientes */}
      <section className="mt-8">
        <RevenueChart />
      </section>

      {/* Últimas facturas */}
      <section className="mt-8">
        <LatestInvoices />
      </section>
    </main>
  );
}
