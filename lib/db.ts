// Prisma client singleton. In dev, Next.js hot-reloads modules, so we cache the
// client on globalThis to avoid opening a new connection on every reload.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
