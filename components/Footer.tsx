// Shared footer: brand blurb, page links, contact details and social icons.
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import SocialLinks from "./SocialLinks";
import { telLink } from "@/lib/utils";

type Settings = Awaited<ReturnType<typeof import("@/lib/data").getSettings>>;

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold text-brand-700">{settings.businessName}</p>
          <p className="mt-2 max-w-xs text-sm text-stone-600">{settings.tagline}</p>
          <SocialLinks settings={settings} className="mt-4" />
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-stone-700 hover:text-brand-700">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {settings.address && <li>{settings.address}</li>}
            {settings.phoneNumber && <li><a href={telLink(settings.phoneNumber)} className="hover:text-brand-700">{settings.phoneNumber}</a></li>}
            {settings.email && <li><a href={`mailto:${settings.email}`} className="hover:text-brand-700">{settings.email}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
