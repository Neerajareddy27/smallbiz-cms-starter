import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { updateService } from "@/lib/admin-actions";
import { db } from "@/lib/db";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const service = Number.isInteger(id) ? await db.service.findUnique({ where: { id } }) : null;
  if (!service) notFound();
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Edit service</h1>
      <ServiceForm action={updateService.bind(null, id)} service={service} />
    </>
  );
}
