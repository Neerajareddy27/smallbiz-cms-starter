// /sitemap.xml, generated from the list of public routes.
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/services", priority: 0.9 },
  { path: "/gallery", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified: new Date(), priority: r.priority }));
}
