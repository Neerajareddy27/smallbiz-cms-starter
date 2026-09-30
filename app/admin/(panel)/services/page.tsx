// Services list with edit / delete. Add via the "Add service" button.
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "@/lib/admin-actions";
import { db } from "@/lib/db";

export default async function ServicesAdmin() {
  const services = await db.service.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Services</h1>
        <Link href="/admin/services/new" className="btn-primary btn-sm">+ Add service</Link>
      </div>
      <ul className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {services.length === 0 && <li className="p-6 text-sm text-stone-500">No services yet.</li>}
        {services.map((s) => (
          <li key={s.id} className="flex flex-wrap items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {s.imageUrl ? <img src={s.imageUrl} alt="" className="h-14 w-20 rounded-lg object-cover" /> : <div className="h-14 w-20 rounded-lg bg-stone-100" />}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-stone-900">{s.name} {s.featured && <span className="ml-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">Featured</span>}</p>
              <p className="truncate text-sm text-stone-500">{s.price} · {s.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/services/${s.id}`} className="btn-outline btn-sm">Edit</Link>
              <DeleteButton action={deleteService.bind(null, s.id)} confirmText={`Delete "${s.name}"?`} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
