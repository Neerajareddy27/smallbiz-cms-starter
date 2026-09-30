// CONTACT: inquiry form (saved to DB) + contact details from Settings.
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/data";
import { telLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Send us a message, we'd love to hear from you.",
};

export default async function ContactPage() {
  const s = await getSettings();
  return (
    <>
      <PageHeader title="Contact us" subtitle="Questions, quotes or just want to say hello? Drop us a line." />
      <section className="container-page mt-4 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2"><ContactForm /></div>
        <aside className="space-y-6 text-stone-700">
          {s.address && <div><h2 className="font-semibold text-stone-900">Visit</h2><p className="mt-1">{s.address}</p></div>}
          {s.phoneNumber && <div><h2 className="font-semibold text-stone-900">Call</h2><a className="mt-1 block hover:text-brand-700" href={telLink(s.phoneNumber)}>{s.phoneNumber}</a></div>}
          {s.email && <div><h2 className="font-semibold text-stone-900">Email</h2><a className="mt-1 block hover:text-brand-700" href={`mailto:${s.email}`}>{s.email}</a></div>}
        </aside>
      </section>
    </>
  );
}
