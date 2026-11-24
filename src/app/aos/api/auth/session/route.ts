import { NextResponse, type NextRequest } from "next/server";
import { AOS_SESSION_COOKIE, isAosAuthConfigured, verifyAosSessionToken } from "@/app/aos/lib/auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    configured: isAosAuthConfigured(),
    authenticated: verifyAosSessionToken(request.cookies.get(AOS_SESSION_COOKIE)?.value),
  });
}
