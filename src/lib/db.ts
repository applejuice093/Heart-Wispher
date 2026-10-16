import { PrismaClient } from "@prisma/client";

/**
 * Shared Prisma client for HeartWhisper.
 *
 * In Next.js (especially with hot reload in development) a naive
 * `new PrismaClient()` creates too many connections. We stash the
 * instance on `globalThis` outside production.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logLevel: Array<"query" | "error" | "warn"> =
  process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logLevel,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
