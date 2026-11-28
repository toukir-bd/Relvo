import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { AOS_SESSION_COOKIE, verifyAosSessionToken } from "@/app/aos/lib/auth";
import { normalizeAosData } from "@/app/aos/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isAuthorized(request: NextRequest) {
  return verifyAosSessionToken(request.cookies.get(AOS_SESSION_COOKIE)?.value);
}

function databaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

function databaseHeaders(key: string) {
  return {
    apikey: key,
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
    "Content-Type": "application/json",
  };
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return json({ error: "Unauthorized." }, 401);
  const config = databaseConfig();
  if (!config) return json({ error: "Hosted database is not configured." }, 503);

  try {
    const response = await fetch(`${config.url}/rest/v1/aos_workspace_data?select=data&id=eq.owner&limit=1`, {
      headers: databaseHeaders(config.key), cache: "no-store",
    });
    if (!response.ok) return json({ error: "Could not load the private workspace data." }, 502);
    const rows = await response.json() as { data?: unknown }[];
    return json({ initialized: rows.length > 0, data: rows[0] ? normalizeAosData(rows[0].data as Record<string, unknown>) : null });
  } catch {
    return json({ error: "Could not connect to the hosted database." }, 502);
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) return json({ error: "Unauthorized." }, 401);
  const config = databaseConfig();
  if (!config) return json({ error: "Hosted database is not configured." }, 503);

  try {
    const body = await request.json() as { data?: unknown };
    if (!body.data || typeof body.data !== "object" || Array.isArray(body.data)) {
      return json({ error: "Invalid workspace data." }, 400);
    }
    const response = await fetch(`${config.url}/rest/v1/aos_workspace_data?on_conflict=id`, {
      method: "POST",
      headers: { ...databaseHeaders(config.key), Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ id: "owner", data: normalizeAosData(body.data as Record<string, unknown>), updated_at: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) return json({ error: "Could not save the private workspace data." }, 502);
    return json({ saved: true });
  } catch {
    return json({ error: "Could not connect to the hosted database." }, 502);
  }
}
