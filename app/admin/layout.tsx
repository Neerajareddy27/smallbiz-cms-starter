// Wrapper for everything under /admin (including the login page): keep it out of search engines.
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
