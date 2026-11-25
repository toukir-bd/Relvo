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

  const action = body.action === "receipt" ? "receipt" : body.action === "invoice" ? "invoice" : body.action === "proposal" ? "proposal" : "";
  const recipient = clean(body.recipient, 254);
  const clientName = clean(body.clientName, 120) || "Client";
  const invoiceNumber = clean(body.invoiceNumber, 80);
  const projectName = clean(body.projectName, 180);
  const milestoneName = clean(body.milestoneName, 180);
  const proposalTitle = clean(body.title, 180);
  const proposalVersion = Math.max(1, Number(body.version) || 1);
  const proposalScope = clean(body.scope, 5000);
  const proposalTerms = clean(body.terms, 3000);
  const validUntil = clean(body.validUntil, 40);
  const proposalDueDate = clean(body.dueDate, 40);
  const amount = Number(body.amount);
  if (!action || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || (action === "proposal" ? !proposalTitle : !invoiceNumber) || !Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Check the document details and client email, then try again." }, { status: 400, headers: robotsHeaders });
  }

  const incomingAttachment = body.attachment && typeof body.attachment === "object"
    ? body.attachment as Record<string, unknown>
    : undefined;
  const attachmentContent = clean(incomingAttachment?.content, 8_000_000);
  const attachmentName = clean(incomingAttachment?.filename, 120).replace(/[^a-zA-Z0-9._-]/g, "-");
  if ((action === "proposal" || action === "invoice") && (!attachmentName.endsWith(".pdf") || !/^[A-Za-z0-9+/]*={0,2}$/.test(attachmentContent))) {
    return NextResponse.json({ error: "The PDF could not be attached. Download it and try sending again." }, { status: 400, headers: robotsHeaders });
  }

  const issueDate = clean(body.issueDate, 40);
  const dueDate = clean(body.dueDate, 40);
  const paidDate = clean(body.paidDate, 40);
  const safeName = escapeHtml(clientName);
  const safeInvoice = escapeHtml(invoiceNumber);
  const safeProject = escapeHtml(projectName);
  const safeMilestone = escapeHtml(milestoneName);
  const safeProposalTitle = escapeHtml(proposalTitle);
  const safeProposalScope = escapeHtml(proposalScope).replace(/\n/g, "<br>");
  const safeProposalTerms = escapeHtml(proposalTerms).replace(/\n/g, "<br>");
  const safeAmount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const isProposal = action === "proposal";
  const isReceipt = action === "receipt";
  const subject = isProposal ? `Proposal · ${proposalTitle} (v${proposalVersion})` : isReceipt ? `Payment received · ${invoiceNumber}` : `Invoice ${invoiceNumber} · Relvo`;
  const text = isProposal
    ? `Hi ${clientName},\n\nPlease find our proposal: ${proposalTitle} (version ${proposalVersion}).\n\nCommitment: ${safeAmount}\nInvoice due date: ${proposalDueDate || "—"}\nValid until: ${validUntil || "—"}\n\nScope:\n${proposalScope || "As discussed."}\n\nPayment terms:\n${proposalTerms || "As discussed."}\n\nPlease reply with any changes or to accept this proposal.\n\nRelvo`
    : isReceipt
    ? `Hi ${clientName},\n\nWe have recorded your payment of ${safeAmount} for invoice ${invoiceNumber}${paidDate ? ` on ${paidDate}` : ""}. Thank you for working with Relvo.\n\nProject: ${projectName}\nMilestone: ${milestoneName}\n\nRelvo Accounts`
    : `Hi ${clientName},\n\nPlease find your invoice details below.\n\nInvoice: ${invoiceNumber}\nAmount: ${safeAmount}\nProject: ${projectName}\nMilestone: ${milestoneName}\nIssue date: ${issueDate || "—"}\nDue date: ${dueDate || "—"}\n\nIf you need payment instructions or have a question, reply to this email.\n\nRelvo Accounts`;
  const html = isProposal
    ? `<p>Hi ${safeName},</p><p>Please find our proposal <strong>${safeProposalTitle}</strong> (version ${proposalVersion}).</p><p><strong>Commitment:</strong> ${safeAmount}<br><strong>Invoice due date:</strong> ${escapeHtml(proposalDueDate || "—")}<br><strong>Valid until:</strong> ${escapeHtml(validUntil || "—")}</p><h3>Scope</h3><p>${safeProposalScope || "As discussed."}</p><h3>Payment terms</h3><p>${safeProposalTerms || "As discussed."}</p><p>Please reply with any changes or to accept this proposal.</p><p>Relvo</p>`
    : isReceipt
    ? `<p>Hi ${safeName},</p><p>We have recorded your payment of <strong>${safeAmount}</strong> for invoice <strong>${safeInvoice}</strong>${paidDate ? ` on ${escapeHtml(paidDate)}` : ""}. Thank you for working with Relvo.</p><p><strong>Project:</strong> ${safeProject}<br><strong>Milestone:</strong> ${safeMilestone}</p><p>Relvo Accounts</p>`
    : `<p>Hi ${safeName},</p><p>Please find your invoice details below.</p><table><tr><td><strong>Invoice</strong></td><td>${safeInvoice}</td></tr><tr><td><strong>Amount</strong></td><td>${safeAmount}</td></tr><tr><td><strong>Project</strong></td><td>${safeProject}</td></tr><tr><td><strong>Milestone</strong></td><td>${safeMilestone}</td></tr><tr><td><strong>Issue date</strong></td><td>${escapeHtml(issueDate || "—")}</td></tr><tr><td><strong>Due date</strong></td><td>${escapeHtml(dueDate || "—")}</td></tr></table><p>If you need payment instructions or have a question, reply to this email.</p><p>Relvo Accounts</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Relvo Accounts <hello@relvodev.com>", to: [recipient], reply_to: "hello@relvodev.com", subject, text, html,
        ...(action === "receipt" ? {} : { attachments: [{ filename: attachmentName, content: attachmentContent }] }),
      }),
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
