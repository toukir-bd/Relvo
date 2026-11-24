import { NextResponse, type NextRequest } from "next/server";
import {
  AOS_SESSION_COOKIE,
  createAosSessionToken,
  isAosAuthConfigured,
  verifyAosCredentials,
} from "@/app/aos/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isAosAuthConfigured()) {
    return NextResponse.json(
      { error: "AOS admin credentials are not configured." },
      { status: 503 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof body.username !== "string" ||
    typeof body.password !== "string" ||
    !verifyAosCredentials(body.username, body.password)
  ) {
    return NextResponse.json({ error: "The username or password is incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(AOS_SESSION_COOKIE, createAosSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/aos",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
