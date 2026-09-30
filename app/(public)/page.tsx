// HOME: hero, featured highlights (services marked "featured" in admin) and CTA banner.
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { WhatsAppIcon } from "@/components/Icons";
import { getFeaturedServices, getSettings } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export default async function HomePage() {
  const [s, featured] = await Promise.all([getSettings(), getFeaturedServices()]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-50">
        {s.heroImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.heroImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="container-page relative py-20 text-center sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">{s.tagline}</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-6xl">{s.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-700">{s.heroSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className="btn-primary">Explore our services</Link>
            <Link href="/contact" className="btn-outline">Get in touch</Link>
          </div>
        </div>
      </section>

      {/* Featured highlights */}
      {featured.length > 0 && (
        <section className="container-page mt-20">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Our highlights</h2>
            <p className="mt-3 text-stone-600">A few of the things we&apos;re best known for.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((svc) => <ServiceCard key={svc.id} service={svc} />)}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-outline">See everything we offer</Link>
          </div>
        </section>
      )}

      {/* Call-to-action banner */}
      <section className="container-page mt-20">
        <div className="rounded-3xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl font-bold">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">Send us a message and we&apos;ll get back to you within one business day.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn bg-white text-brand-700 hover:bg-brand-50">Contact us</Link>
            {s.whatsappNumber && (
              <a href={whatsappLink(s.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="btn border border-white/60 text-white hover:bg-white/10">
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
