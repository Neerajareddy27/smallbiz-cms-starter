// Admin dashboard: headline counts.
import Link from "next/link";
import { db } from "@/lib/db";

export default async function Dashboard() {
  const [inquiries, unread, gallery, services] = await Promise.all([
    db.inquiry.count(),
    db.inquiry.count({ where: { read: false } }),
    db.galleryItem.count(),
    db.service.count(),
  ]);
  const cards = [
    { label: "Total inquiries", value: inquiries, note: `${unread} unread`, href: "/admin/inquiries" },
    { label: "Gallery items", value: gallery, note: "Images & videos", href: "/admin/gallery" },
    { label: "Services", value: services, note: "Products & offerings", href: "/admin/services" },
  ];
  return (
    <>
      <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-brand-300">
            <p className="text-sm text-stone-500">{c.label}</p>
            <p className="mt-2 text-4xl font-bold text-stone-900">{c.value}</p>
            <p className="mt-1 text-xs text-stone-500">{c.note}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
