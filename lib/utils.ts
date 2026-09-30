// Small pure helpers shared by components.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Keep digits only: "+1 (555) 123-4567" -> "15551234567". wa.me requires this format. */
export const digitsOnly = (v: string) => v.replace(/\D/g, "");

export const whatsappLink = (number: string, text = "Hi! I'd like to know more.") =>
  `https://wa.me/${digitsOnly(number)}?text=${encodeURIComponent(text)}`;

export const telLink = (number: string) => `tel:+${digitsOnly(number)}`;

/** Returns a YouTube embed URL if `url` is a YouTube link, otherwise null. */
export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

/** Only allow http(s) or site-relative URLs (blocks javascript: and friends in admin-entered URLs). */
export function safeUrl(url: string): string {
  const v = url.trim();
  if (!v) return "";
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : "";
  } catch {
    return "";
  }
}
