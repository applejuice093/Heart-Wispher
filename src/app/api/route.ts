import { NextResponse } from "next/server";

/**
 * Lightweight health / readiness endpoint for HeartWhisper.
 * Useful for reverse proxies (see Caddyfile) and uptime checks.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "heart-whisper",
      message: "HeartWhisper API is running",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
