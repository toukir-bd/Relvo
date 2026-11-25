import { NextResponse, type NextRequest } from "next/server";
import { AOS_SESSION_COOKIE, verifyAosSessionToken } from "@/app/aos/lib/auth";

const robotsHeaders = { "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet" };

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

export async function POST(request: NextRequest) {
  if (!verifyAosSessionToken(request.cookies.get(AOS_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Please sign in to the private workspace." }, { status: 401, headers: robotsHeaders });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured yet. Add RESEND_API_KEY in Vercel." }, { status: 503, headers: robotsHeaders });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid email request." }, { status: 400, headers: robotsHeaders });
  }

  const action = body.action === "receipt" ? "receipt" : body.action === "invoice" ? "invoice" : "";
  const recipient = clean(body.recipient, 254);
  const clientName = clean(body.clientName, 120) || "Client";
  const invoiceNumber = clean(body.invoiceNumber, 80);
  const projectName = clean(body.projectName, 180);
  const milestoneName = clean(body.milestoneName, 180);
  const amount = Number(body.amount);
  if (!action || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || !invoiceNumber || !Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Check the invoice details and client email, then try again." }, { status: 400, headers: robotsHeaders });
  }

  const issueDate = clean(body.issueDate, 40);
  const dueDate = clean(body.dueDate, 40);
  const paidDate = clean(body.paidDate, 40);
  const safeName = escapeHtml(clientName);
  const safeInvoice = escapeHtml(invoiceNumber);
  const safeProject = escapeHtml(projectName);
  const safeMilestone = escapeHtml(milestoneName);
  const safeAmount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const isReceipt = action === "receipt";
  const subject = isReceipt ? `Payment received · ${invoiceNumber}` : `Invoice ${invoiceNumber} · Relvo`;
  const text = isReceipt
    ? `Hi ${clientName},\n\nWe have recorded your payment of ${safeAmount} for invoice ${invoiceNumber}${paidDate ? ` on ${paidDate}` : ""}. Thank you for working with Relvo.\n\nProject: ${projectName}\nMilestone: ${milestoneName}\n\nRelvo Accounts`
    : `Hi ${clientName},\n\nPlease find your invoice details below.\n\nInvoice: ${invoiceNumber}\nAmount: ${safeAmount}\nProject: ${projectName}\nMilestone: ${milestoneName}\nIssue date: ${issueDate || "—"}\nDue date: ${dueDate || "—"}\n\nIf you need payment instructions or have a question, reply to this email.\n\nRelvo Accounts`;
  const html = isReceipt
    ? `<p>Hi ${safeName},</p><p>We have recorded your payment of <strong>${safeAmount}</strong> for invoice <strong>${safeInvoice}</strong>${paidDate ? ` on ${escapeHtml(paidDate)}` : ""}. Thank you for working with Relvo.</p><p><strong>Project:</strong> ${safeProject}<br><strong>Milestone:</strong> ${safeMilestone}</p><p>Relvo Accounts</p>`
    : `<p>Hi ${safeName},</p><p>Please find your invoice details below.</p><table><tr><td><strong>Invoice</strong></td><td>${safeInvoice}</td></tr><tr><td><strong>Amount</strong></td><td>${safeAmount}</td></tr><tr><td><strong>Project</strong></td><td>${safeProject}</td></tr><tr><td><strong>Milestone</strong></td><td>${safeMilestone}</td></tr><tr><td><strong>Issue date</strong></td><td>${escapeHtml(issueDate || "—")}</td></tr><tr><td><strong>Due date</strong></td><td>${escapeHtml(dueDate || "—")}</td></tr></table><p>If you need payment instructions or have a question, reply to this email.</p><p>Relvo Accounts</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Relvo Accounts <hello@relvodev.com>", to: [recipient], reply_to: "hello@relvodev.com", subject, text, html }),
    });
    if (!response.ok) {
      console.error("Resend rejected AOS invoice email:", response.status, await response.text());
      return NextResponse.json({ error: "Resend could not send the email. Check the sender domain and API key." }, { status: 502, headers: robotsHeaders });
    }
    return NextResponse.json({ success: true }, { headers: robotsHeaders });
  } catch (error) {
    console.error("AOS invoice email request failed:", error);
    return NextResponse.json({ error: "The email service could not be reached. Try again." }, { status: 502, headers: robotsHeaders });
  }
}
