// Gallery manager: add an image/video by URL (+ caption) and delete existing items. No limit.
import AdminForm, { Field } from "@/components/admin/AdminForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { createGalleryItem, deleteGalleryItem } from "@/lib/admin-actions";
import { db } from "@/lib/db";
import { youtubeEmbed } from "@/lib/utils";

export default async function GalleryAdmin() {
  const items = await db.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <h1 className="text-2xl font-bold text-stone-900">Gallery <span className="text-base font-normal text-stone-500">({items.length})</span></h1>

      <AdminForm action={createGalleryItem} submitLabel="Add to gallery" className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
        <div>
          <label htmlFor="type" className="label">Type</label>
          <select id="type" name="type" className="input"><option value="IMAGE">Image</option><option value="VIDEO">Video (.mp4 link or YouTube)</option></select>
        </div>
        <Field label="URL" name="url" required placeholder="https://…" />
        <Field label="Caption" name="caption" />
      </AdminForm>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {it.type === "VIDEO" ? (
              <div className="flex aspect-video items-center justify-center bg-stone-900 text-sm text-white">
                ▶ Video{youtubeEmbed(it.url) ? " (YouTube)" : ""}
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.url} alt={it.caption} className="aspect-video w-full object-cover" />
            )}
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="truncate text-sm text-stone-600">{it.caption || "(no caption)"}</p>
              <DeleteButton action={deleteGalleryItem.bind(null, it.id)} confirmText="Remove this item from the gallery?" label="Remove" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
