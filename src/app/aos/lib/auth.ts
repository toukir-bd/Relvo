import "server-only";
import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export const AOS_SESSION_COOKIE = "relvo_aos_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 12;

export function isAosAuthConfigured() {
  return Boolean(
    process.env.AOS_ADMIN_USERNAME &&
      process.env.AOS_ADMIN_PASSWORD &&
      process.env.AOS_SESSION_SECRET &&
      process.env.AOS_SESSION_SECRET.length >= 32,
  );
}

function signature(payload: string) {
  const secret = process.env.AOS_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("AOS session secret is not configured.");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function constantTimeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash) && left === right;
}

export function verifyAosCredentials(username: string, password: string) {
  const expectedUsername = process.env.AOS_ADMIN_USERNAME;
  const expectedPassword = process.env.AOS_ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword || !isAosAuthConfigured()) return false;
  return constantTimeEqual(username, expectedUsername) && constantTimeEqual(password, expectedPassword);
}

export function createAosSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS }),
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyAosSessionToken(token?: string | null) {
  if (!token || !isAosAuthConfigured()) return false;
  const [payload, tokenSignature] = token.split(".");
  if (!payload || !tokenSignature) return false;
  try {
    if (!constantTimeEqual(signature(payload), tokenSignature)) return false;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
    return typeof session.exp === "number" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
