// Read helpers used by public pages and the sitemap. Keeping queries here means
// pages stay thin and a client can change how data is fetched in one place.
import { db } from "./db";

/** Site-wide settings (singleton row). Falls back to blanks if the DB hasn't been seeded. */
export async function getSettings() {
  const s = await db.settings.findUnique({ where: { id: 1 } });
  return (
    s ?? {
      id: 1,
      businessName: "Your Business",
      tagline: "",
      heroTitle: "Welcome",
      heroSubtitle: "",
      heroImageUrl: "",
      whatsappNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
      instagramUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      youtubeUrl: "",
    }
  );
}

export const getAbout = () => db.aboutContent.findUnique({ where: { id: 1 } });
export const getServices = () => db.service.findMany({ orderBy: { createdAt: "asc" } });
export const getFeaturedServices = () =>
  db.service.findMany({ where: { featured: true }, orderBy: { createdAt: "asc" }, take: 6 });
export const getGallery = () => db.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
