# Development guide

## Naming

- **GitHub repository**: `applejuice093/Heart-Wispher` (keep this spelling; do not rename the remote).
- **Product / UI branding**: HeartWhisper.

## Local workflow

1. Copy `.env.example` → `.env`.
2. Install with Bun (`bun install`) or npm (`npm install`). Both lockfiles currently exist; Bun is preferred in scripts (`start` uses Bun).
3. Generate Prisma client and push the SQLite schema: `bun run db:generate && bun run db:push`.
4. Run `bun run dev` and open http://localhost:3000.
5. Before opening a PR: `bun run lint` and `bun run typecheck`.

## Architecture notes

- `src/app/page.tsx` is a client-side demo UI. Emotion / ECG / voice data are **simulated**.
- Shared demo constants live in `src/lib/heart-whisper-data.ts`.
- Prisma models in `prisma/schema.prisma` are scaffolding for future persistence; the demo does not require a DB to render the landing experience.
- Health check: `GET /api` returns JSON `{ ok: true, service: "heart-whisper", ... }`.

## Reverse proxy

`Caddyfile` listens on port 81 and proxies to `localhost:3000`, with an optional `XTransformPort` query override for ephemeral ports.

## What not to commit

- Real `.env` files
- `*.db` / `*.db-journal`
- `.next/`, `node_modules/`, `server.log`
- GitHub Actions workflow files unless the token has `workflow` scope
