# smallbiz-cms-starter

A reusable 5-page business website with a built-in admin panel. Built with **Next.js (App Router)**, **Tailwind CSS v4** and **Prisma + PostgreSQL (Neon)**, with a free PostgreSQL database (Neon). Sample content is a fictional florist, "Bloom & Co."

## Quick start

```bash
npm install
vercel env pull .env   # or create .env yourself
npm run dev            # http://localhost:3000
```

On `npm run dev`, `scripts/bootstrap.mjs` creates the tables and seeds sample data (only if the DB is empty). On Vercel the `vercel-build` script does the same.

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin (default login `admin` / `change-me-please`, set in `.env`)

## Environment variables (`.env`, never committed)

```
DATABASE_URL, DATABASE_URL_UNPOOLED   PostgreSQL connection strings (Neon)
ADMIN_USERNAME, ADMIN_PASSWORD        admin login
SESSION_SECRET                        random string, e.g. node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXT_PUBLIC_SITE_URL                  public URL, used for sitemap/robots
```

## Features

**Public pages** (all content from the database): Home, About, Services, Gallery (images and videos, MP4 or YouTube), Contact (saves to DB).
**On every page:** floating WhatsApp and Call buttons, mock live-chat widget, social icons, responsive navbar with mobile menu, footer.
**Admin (`/admin`):** dashboard counts, services CRUD, gallery add/remove, About editor, inquiries table with mark-as-read, settings (business info, WhatsApp, phone, social links).
**SEO:** per-page title/description, `/sitemap.xml`, `/robots.txt` (admin is disallowed and `noindex`).

## Folder structure

```
app/
  (public)/        public routes + shared layout (navbar, footer, floating widgets)
  admin/
    login/         login page (unprotected)
    (panel)/       every protected admin screen; layout calls requireAdmin()
  layout.tsx       root layout + global metadata
  sitemap.ts, robots.ts
components/        UI (Navbar, Footer, ChatWidget, GalleryGrid, ...); admin/ = admin-only UI
lib/
  db.ts            Prisma client singleton
  auth.ts          cookie session + requireAdmin()
  data.ts          read queries for public pages
  admin-actions.ts server actions for all admin writes (each checks requireAdmin)
  contact-action.ts public contact-form server action
  nav.ts           nav links   |   utils.ts  wa.me/tel/YouTube/URL helpers
prisma/
  schema.prisma    Settings, AboutContent, Service, GalleryItem, Inquiry
  seed.ts          sample data
scripts/           bootstrap.mjs (auto-setup), generate-samples.mjs (placeholder art)
```

## Starting a new client project

1. Copy the repo, then edit `prisma/seed.ts` (or skip it and edit everything in `/admin`).
2. `npm run db:reset` to wipe the database and reseed.
3. In `.env`, set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, a random `SESSION_SECRET`, and `NEXT_PUBLIC_SITE_URL`.
4. Re-theme by editing the `--color-brand-*` values in `app/globals.css`.
5. Change the pages in the nav in `lib/nav.ts`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | auto-setup, then start the dev server |
| `npm run build` / `npm start` | production build / serve |
| `npm run db:seed` | wipe and reseed sample data |
| `npm run db:reset` | reset the schema and reseed |
| `npm run lint` | type-check |

## Notes and limits

- **Auth is intentionally simple:** one shared login from `.env`, signed httpOnly cookie, 7-day expiry. There is no login rate limiting, so put it behind HTTPS and use a strong password in production.
- **Images/videos are URLs** (no file uploads). Sample art lives in `public/samples/`, and you can also point at any image host. The seeded sample video loads from an external URL, so it needs internet.
- **Live chat is a mock UI** with canned replies, and `components/ChatWidget.tsx` is where to plug in a real provider.
- **Database:** PostgreSQL. Vercel's filesystem isn't writable, so a hosted DB is required there (the Neon integration sets the env vars).
