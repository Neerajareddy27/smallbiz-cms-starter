"use client";
// Admin sidebar (top bar on mobile). `unread` shows a badge on Inquiries.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/admin-actions";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/about", label: "About page" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav({ unread, businessName }: { unread: number; businessName: string }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  return (
    <aside className="border-b border-stone-200 bg-white md:min-h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between px-4 py-4 md:block">
        <p className="font-serif text-lg font-bold text-brand-700">{businessName}</p>
        <p className="hidden text-xs text-stone-500 md:block">Admin panel</p>
        <form action={logout} className="md:hidden"><button className="text-sm text-stone-600 underline">Log out</button></form>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0" aria-label="Admin">
        {ITEMS.map((i) => (
          <Link key={i.href} href={i.href}
            className={`flex items-center justify-between whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${active(i.href) ? "bg-brand-50 text-brand-700" : "text-stone-600 hover:bg-stone-100"}`}>
            {i.label}
            {i.href === "/admin/inquiries" && unread > 0 && <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">{unread}</span>}
          </Link>
        ))}
        <Link href="/" target="_blank" className="rounded-lg px-3 py-2 text-sm text-stone-500 hover:bg-stone-100 md:mt-4">View site ↗</Link>
      </nav>
      <form action={logout} className="hidden px-3 py-4 md:block">
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-stone-600 hover:bg-stone-100">Log out</button>
      </form>
    </aside>
  );
}
