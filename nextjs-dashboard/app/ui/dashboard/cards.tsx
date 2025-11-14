'use client';

export default function Cards({
  collected,
  pending,
  totalInvoices,
  totalCustomers,
}: {
  collected: number;
  pending: number;
  totalInvoices: number;
  totalCustomers: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="card">
        <h3>Collected</h3>
        <p>${collected.toLocaleString()}</p>
      </div>

      <div className="card">
        <h3>Pending</h3>
        <p>${pending.toLocaleString()}</p>
      </div>

      <div className="card">
        <h3>Total Invoices</h3>
        <p>{totalInvoices}</p>
      </div>

      <div className="card">
        <h3>Total Customers</h3>
        <p>{totalCustomers}</p>
      </div>
    </div>
  );
}