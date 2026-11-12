import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;

type ContactSubmission = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  services?: unknown;
  project?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export async function POST(request: Request) {
  let submission: ContactSubmission;

  try {
    submission = (await request.json()) as ContactSubmission;
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so bots don't learn whether they were filtered.
  if (cleanText(submission.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const name = cleanText(submission.name, 120);
  const email = cleanText(submission.email, 254);
  const phone = cleanText(submission.phone, 80);
  const project = cleanText(submission.project);
  const services = Array.isArray(submission.services)
    ? submission.services
        .filter((service): service is string => typeof service === "string")
        .map((service) => cleanText(service, 100))
        .filter(Boolean)
        .slice(0, 12)
    : [];

  if (!name || !email || !EMAIL_PATTERN.test(email) || !phone || !project || !services.length) {
    return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form could not send: RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: "The contact form is temporarily unavailable. Please email hello@relvodev.com." }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeServices = services.map(escapeHtml);
  const safeProject = escapeHtml(project);
  const subjectName = name.replace(/[\r\n]/g, " ").slice(0, 120);
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Interested in: ${services.join(", ")}`,
    "",
    "About the project:",
    project,
  ].join("\n");
  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Interested in:</strong> ${safeServices.join(", ")}</p>
    <p><strong>About the project:</strong></p>
    <p>${safeProject.replace(/\n/g, "<br>")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Relvo Website <hello@relvodev.com>",
        to: ["hello@relvodev.com"],
        reply_to: email,
        subject: `Project inquiry from ${subjectName}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Resend rejected contact form email:", response.status, providerError);
      return NextResponse.json({ error: "We couldn’t send your message. Please try again or email hello@relvodev.com." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email request failed:", error);
    return NextResponse.json({ error: "We couldn’t send your message. Please try again or email hello@relvodev.com." }, { status: 502 });
  }
}
