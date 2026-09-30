// Renders gallery items in a responsive masonry-style (CSS columns) layout.
// IMAGE -> <img>; VIDEO -> YouTube iframe if it's a YouTube link, else a native <video>.
import { youtubeEmbed } from "@/lib/utils";

type Item = { id: number; type: string; url: string; caption: string };

export default function GalleryGrid({ items }: { items: Item[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((it) => {
        const yt = it.type === "VIDEO" ? youtubeEmbed(it.url) : null;
        return (
          <figure key={it.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {it.type === "VIDEO" ? (
              yt ? (
                <iframe src={yt} title={it.caption || "Video"} loading="lazy" allowFullScreen className="aspect-video w-full" />
              ) : (
                <video src={it.url} controls preload="metadata" className="w-full" />
              )
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.url} alt={it.caption || "Gallery image"} loading="lazy" className="w-full" />
            )}
            {it.caption && <figcaption className="px-4 py-3 text-sm text-stone-600">{it.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}
