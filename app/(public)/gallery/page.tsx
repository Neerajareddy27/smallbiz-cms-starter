// GALLERY: all images/videos from the GalleryItem table, newest first, no cap.
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at our recent work, in photos and video.",
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader title="Gallery" subtitle="A look at our recent work." />
      <section className="container-page mt-4">
        {items.length === 0 ? <p className="text-center text-stone-500">Nothing here yet, check back soon.</p> : <GalleryGrid items={items} />}
      </section>
    </>
  );
}
