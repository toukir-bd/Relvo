# Relvo Agency Operating System

The private workspace is served at `/aos`. It has a separate page and auth handlers, skips the public site chrome, and is excluded from the sitemap with `noindex`/`nofollow` metadata. No public navigation links to it. Removing `src/app/aos` and the `/aos` bypasses in `MainLayout.tsx`, `DoorLoader.tsx`, and `SmoothScroll.tsx` removes the integration.

## Owner sign-in

Configure these values in local `.env.local` and the Vercel project environment:

- `AOS_ADMIN_USERNAME` — the owner login
- `AOS_ADMIN_PASSWORD` — a unique, long password
- `AOS_SESSION_SECRET` — a random secret with at least 32 characters

The session uses a 12-hour HTTP-only, same-site cookie scoped to `/aos`. Do not commit real credentials.

## Workflow

1. **Clients** — add the client you spoke with and their email address.
2. **Proposals** — prepare the scope, fee, terms, and invoice due date. Download the PDF or email it with the PDF attached. If the client requests changes, edit it and resend the new version. The client accepts by replying outside the workspace; then mark the proposal **Approved**.
3. **Invoices** — approval automatically creates a draft invoice with the proposal amount and due date. Download the invoice PDF or email it with the PDF attached. After payment arrives, mark it paid to record the date and email a receipt. Invoices past their due date appear as **Overdue**.
4. **Account** — review collected/outstanding amounts and expenses, and import or export a workspace backup.

Proposal and invoice PDFs are generated in the browser and downloaded directly.

## Invoice email

Email delivery uses Resend with `hello@relvodev.com` as the sender. Set `RESEND_API_KEY` in Vercel and verify the sender domain in Resend. The key stays server-side. Sending fails with a clear message if the key is missing or Resend rejects the request.

## Data storage

Records are currently saved in the signed-in browser's local storage. They do not sync between devices or browser profiles. Use **Download workspace backup** regularly and import it when moving browsers. This is an initial internal workflow tool, not accounting, tax, or contract-signing software; connect a managed database before using it as the agency's only record system.
