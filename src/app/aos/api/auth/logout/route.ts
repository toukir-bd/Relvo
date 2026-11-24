import { NextResponse } from "next/server";
import { AOS_SESSION_COOKIE } from "@/app/aos/lib/auth";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(AOS_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/aos",
    maxAge: 0,
  });
  return response;
}
