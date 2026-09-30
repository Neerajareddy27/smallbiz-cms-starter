"use server";
// Public Contact form handler: validates input and stores it as an Inquiry.
import { db } from "./db";

export type ContactState = { error?: string; ok?: boolean } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Honeypot: real users never see/fill this hidden field, most bots do.
  if (String(fd.get("website") ?? "")) return { ok: true };

  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  if (!name || !email || !message) return { error: "Please fill in your name, email and message." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  if (name.length > 100 || email.length > 200 || phone.length > 40 || message.length > 3000) {
    return { error: "One of the fields is too long." };
  }

  await db.inquiry.create({ data: { name, email, phone, message } });
  return { ok: true };
}
