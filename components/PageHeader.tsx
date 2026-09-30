// Title banner used at the top of inner pages (About, Services, Gallery, Contact).
export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="container-page py-14 text-center sm:py-20">
        <h1 className="font-serif text-4xl font-bold text-stone-900 sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">{subtitle}</p>}
      </div>
    </section>
  );
}
