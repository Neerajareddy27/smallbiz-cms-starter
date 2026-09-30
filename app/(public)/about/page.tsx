// ABOUT: title, image and story text come from the AboutContent row (edit in /admin/about).
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getAbout, getSettings } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return {
    title: "About us",
    description: about?.body.split("\n\n")[0].slice(0, 160) || "Learn more about our story.",
  };
}

export default async function AboutPage() {
  const [about, s] = await Promise.all([getAbout(), getSettings()]);
  const paragraphs = (about?.body ?? "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHeader title={`About ${s.businessName}`} subtitle={about?.title} />
      <section className="container-page mt-4 grid items-center gap-10 md:grid-cols-2">
        {about?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={about.imageUrl} alt={`About ${s.businessName}`} className="aspect-square w-full rounded-3xl object-cover" />
        )}
        <div className={`space-y-4 text-lg leading-relaxed text-stone-700 ${about?.imageUrl ? "" : "md:col-span-2 mx-auto max-w-3xl"}`}>
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>
    </>
  );
}
