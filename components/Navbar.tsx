"use client";
// Shared responsive navbar. Client component only because of the mobile menu toggle
// and active-link highlighting (usePathname). Data comes in via props from the layout.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import SocialLinks from "./SocialLinks";
import { NAV_LINKS } from "@/lib/nav";

type Props = {
  businessName: string;
  social: { instagramUrl: string; facebookUrl: string; twitterUrl: string; youtubeUrl: string };
};

export default function Navbar({ businessName, social }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-brand-700" onClick={() => setOpen(false)}>
          {businessName}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-stone-600 hover:text-brand-700"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <SocialLinks settings={social} className="hidden lg:flex" />

        {/* Mobile menu button */}
        <button type="button" className="rounded-md p-2 text-stone-700 md:hidden" aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-stone-200 bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-stone-700"}`}>
                {l.label}
              </Link>
            ))}
            <SocialLinks settings={social} className="px-3 pt-3" />
          </nav>
        </div>
      )}
    </header>
  );
}
