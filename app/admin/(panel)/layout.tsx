// Layout for all PROTECTED admin screens. The "(panel)" route group adds no URL segment,
// it just lets us guard everything except /admin/login with one requireAdmin() call.
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/data";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [unread, settings] = await Promise.all([db.inquiry.count({ where: { read: false } }), getSettings()]);
  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <AdminNav unread={unread} businessName={settings.businessName} />
      <div className="flex-1 p-4 sm:p-8"><div className="mx-auto max-w-4xl">{children}</div></div>
    </div>
  );
}
