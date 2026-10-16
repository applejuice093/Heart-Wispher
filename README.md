# HeartWhisper

> Repo name on GitHub: **Heart-Wispher** (historical spelling). The product name in the app and docs is **HeartWhisper**.

A privacy-first, Valentine's-themed emotional connection demo built with Next.js. The UI simulates real-time emotion sensing, romantic prompting, device pairing, and consent controls — all client-side for the demo (no real biometric capture).

## Features

- Valentine-themed landing hero with animated hearts
- Emotion detection dashboard (simulated heart rate / ECG + voice charts)
- Gentle romantic prompt library with category filters
- Privacy & consent controls (on-device badge, mutual consent, emergency stop)
- Connection modes: Date Night, Long-Distance, Friendship, Reflection
- Device pairing simulation (phone + watch)

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Charts / motion | Recharts, Framer Motion |
| ORM | Prisma + SQLite |
| Package managers | Bun (preferred) or npm |

## Prerequisites

- Node.js 20+ (or Bun 1.1+)
- Optional: Caddy if you use the included reverse-proxy config

## Quick start

```bash
# 1. Clone
git clone https://github.com/applejuice093/Heart-Wispher.git
cd Heart-Wispher

# 2. Install (pick one)
bun install
# or: npm install

# 3. Environment
cp .env.example .env

# 4. Database (creates local SQLite from Prisma schema)
bun run db:generate
bun run db:push
# or: npm run db:generate && npm run db:push

# 5. Develop
bun run dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
bun run build
bun start
# or: npm run build && npm start
```

The `build` script produces a Next.js **standalone** output under `.next/standalone`.

## Scripts

| Script | Purpose |
| --- | --- |
| `dev` | Next.js dev server on port 3000 |
| `build` | Production build + copy static/public into standalone |
| `start` | Run the standalone server (Bun) |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` |
| `db:generate` | Generate Prisma client |
| `db:push` | Push schema to SQLite (no migration files) |
| `db:migrate` | Prisma migrate (dev) |
| `db:reset` | Reset DB (destructive) |

## Project structure

```
src/
├── app/                 # App Router (page, layout, API)
├── components/ui/       # shadcn/ui primitives
├── hooks/               # Shared React hooks
└── lib/                 # Utilities, Prisma client, demo data
prisma/                  # Prisma schema
db/                      # Local SQLite (gitignored *.db)
public/                  # Static assets
```

## Environment

See [`.env.example`](./env.example) — primarily `DATABASE_URL` for Prisma SQLite.

## Notes

- Emotion / heart-rate / voice panels are **simulated** for demo and UX exploration.
- Many UI dependencies (dnd-kit, next-auth, next-intl, etc.) ship with the scaffold and may not yet be used by the main page.
- Prefer **not** committing real `.env` files or `*.db` binaries.

## License

See [LICENSE](./LICENSE) (MIT).
