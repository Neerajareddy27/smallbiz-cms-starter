// SERVICES: every row in the Service table, no cap.
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services & pricing",
  description: "Browse everything we offer, with descriptions and prices.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader title="Our services" subtitle="Everything we offer, with transparent pricing." />
      <section className="container-page mt-4">
        {services.length === 0 ? (
          <p className="text-center text-stone-500">No services have been added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => <ServiceCard key={svc.id} service={svc} />)}
          </div>
        )}
        <div className="mt-12 text-center">
          <p className="text-stone-600">Not sure what you need?</p>
          <Link href="/contact" className="btn-primary mt-3">Ask us a question</Link>
        </div>
      </section>
    </>
  );
}
