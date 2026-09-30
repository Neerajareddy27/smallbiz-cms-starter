// Minimal cookie-session auth for the admin panel (no auth provider).
//
// How it works:
//  - Credentials come from ADMIN_USERNAME / ADMIN_PASSWORD in .env.
//  - On login we set an httpOnly cookie containing "<expiryMs>.<HMAC signature>".
//  - The signature is made with SESSION_SECRET, so the cookie can't be forged or extended.
//  - `requireAdmin()` is called in the admin layout AND at the top of every admin server
//    action (layouts don't protect actions on their own).
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET is not set");
  return "dev-only-secret-change-me";
}

const sign = (value: string) => crypto.createHmac("sha256", secret()).update(value).digest("hex");

/** Constant-time string comparison (hashes first so lengths always match). */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Evaluate both so timing doesn't reveal which one was wrong.
  const okUser = safeEqual(username, u);
  const okPass = safeEqual(password, p);
  return okUser && okPass;
}

export async function createSession() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const jar = await cookies();
  jar.set(COOKIE_NAME, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const [expires, signature] = raw.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

/** Call at the top of admin pages/layouts/actions. Redirects to the login page if not signed in. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
