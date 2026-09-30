// Root layout: wraps BOTH the public site and /admin. Sets global metadata defaults
// (title template + metadataBase) from the Settings table.
import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic"; // content comes from the DB and is edited live in /admin

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${s.businessName} | ${s.tagline}`, template: `%s | ${s.businessName}` },
    description: s.heroSubtitle || s.tagline,
    openGraph: { siteName: s.businessName, type: "website" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
