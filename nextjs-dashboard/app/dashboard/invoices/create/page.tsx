import CreateFacturaForm from "@/app/ui/invoices/create-form";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Factura</h1>
      <CreateFacturaForm />
    </div>
  );
}
