import CreateCustomerForm from "@/app/ui/customers/create-form";

export default function CreateCustomerPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">Create Customer</h1>
      <CreateCustomerForm />
    </div>
  );
}
