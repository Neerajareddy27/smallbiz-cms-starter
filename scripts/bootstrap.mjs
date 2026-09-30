// Zero-setup helper, runs automatically before `npm run dev` (also `npm run setup`):
//  1. creates .env from .env.example if present (otherwise explains what's needed)
//  2. creates/updates the database schema (prisma db push)
//  3. seeds sample data only if the database is empty
import { copyFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (!existsSync(".env")) {
  if (existsSync(".env.example")) {
    copyFileSync(".env.example", ".env");
    console.log("• Created .env from .env.example (fill in DATABASE_URL and change the admin password!)");
  } else {
    console.error(
      "Missing .env. Create one with DATABASE_URL, DATABASE_URL_UNPOOLED, ADMIN_USERNAME, ADMIN_PASSWORD,\n" +
        "SESSION_SECRET and NEXT_PUBLIC_SITE_URL (see README), or run `vercel env pull .env`.",
    );
    process.exit(1);
  }
}

const run = (args) => {
  const r = spawnSync("npx", args, { stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run(["prisma", "db", "push"]); // also (re)generates the Prisma client
run(["tsx", "prisma/seed.ts", "--if-empty"]);
