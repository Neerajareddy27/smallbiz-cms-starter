"use server";
// All admin mutations live here as Server Actions. Every one starts with requireAdmin()
// because a Server Action is a public POST endpoint that must be guarded independently
// of the page/layout that renders its form.
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession, requireAdmin } from "./auth";
import { db } from "./db";
import { digitsOnly, safeUrl } from "./utils";

export type FormState = { error?: string; ok?: boolean } | undefined;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Public pages are rendered on demand, but this also clears any cached copies. */
const refreshSite = () => revalidatePath("/", "layout");

// ---------- Auth ----------
export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!checkCredentials(str(fd, "username"), String(fd.get("password") ?? ""))) {
    return { error: "Invalid username or password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ---------- Services ----------
function readService(fd: FormData) {
  return {
    name: str(fd, "name"),
    description: str(fd, "description"),
    price: str(fd, "price"),
    imageUrl: safeUrl(str(fd, "imageUrl")),
    featured: fd.get("featured") === "on",
  };
}

export async function createService(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const data = readService(fd);
  if (!data.name || !data.description) return { error: "Name and description are required." };
  await db.service.create({ data });
  refreshSite();
  redirect("/admin/services");
}

export async function updateService(id: number, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const data = readService(fd);
  if (!data.name || !data.description) return { error: "Name and description are required." };
  await db.service.update({ where: { id }, data });
  refreshSite();
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await requireAdmin();
  await db.service.deleteMany({ where: { id } });
  refreshSite();
}

// ---------- Gallery ----------
export async function createGalleryItem(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const url = safeUrl(str(fd, "url"));
  if (!url) return { error: "Enter a valid http(s) URL." };
  const type = str(fd, "type") === "VIDEO" ? "VIDEO" : "IMAGE";
  await db.galleryItem.create({ data: { url, type, caption: str(fd, "caption") } });
  refreshSite();
  return { ok: true };
}

export async function deleteGalleryItem(id: number) {
  await requireAdmin();
  await db.galleryItem.deleteMany({ where: { id } });
  refreshSite();
}

// ---------- About ----------
export async function saveAbout(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const title = str(fd, "title");
  const body = str(fd, "body");
  if (!title || !body) return { error: "Title and body are required." };
  const data = { title, body, imageUrl: safeUrl(str(fd, "imageUrl")) };
  await db.aboutContent.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });
  refreshSite();
  return { ok: true };
}

// ---------- Settings ----------
export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const businessName = str(fd, "businessName");
  if (!businessName) return { error: "Business name is required." };
  const data = {
    businessName,
    tagline: str(fd, "tagline"),
    heroTitle: str(fd, "heroTitle"),
    heroSubtitle: str(fd, "heroSubtitle"),
    heroImageUrl: safeUrl(str(fd, "heroImageUrl")),
    whatsappNumber: digitsOnly(str(fd, "whatsappNumber")),
    phoneNumber: str(fd, "phoneNumber"),
    email: str(fd, "email"),
    address: str(fd, "address"),
    instagramUrl: safeUrl(str(fd, "instagramUrl")),
    facebookUrl: safeUrl(str(fd, "facebookUrl")),
    twitterUrl: safeUrl(str(fd, "twitterUrl")),
    youtubeUrl: safeUrl(str(fd, "youtubeUrl")),
  };
  await db.settings.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });
  refreshSite();
  return { ok: true };
}

// ---------- Inquiries ----------
export async function toggleInquiryRead(id: number, read: boolean) {
  await requireAdmin();
  await db.inquiry.updateMany({ where: { id }, data: { read } });
  revalidatePath("/admin", "layout");
}
