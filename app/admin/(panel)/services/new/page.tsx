import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "@/lib/admin-actions";

export default function NewService() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Add service</h1>
      <ServiceForm action={createService} />
    </>
  );
}
