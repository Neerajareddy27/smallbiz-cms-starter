// Card for one service/product. Used on Home (featured) and Services (all).
type Service = { id: number; name: string; description: string; price: string; imageUrl: string };

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      {service.imageUrl ? (
        // Plain <img> on purpose: admins paste arbitrary URLs, which next/image would need whitelisted.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={service.imageUrl} alt={service.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="aspect-[4/3] w-full bg-brand-50" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold text-stone-900">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{service.description}</p>
        {service.price && <p className="mt-4 text-lg font-semibold text-brand-700">{service.price}</p>}
      </div>
    </article>
  );
}
