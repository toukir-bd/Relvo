# Relvo Agency Operating System

The private workspace is served at `/aos`. It has a separate page and auth handlers, skips the public site chrome, and is excluded from the sitemap with `noindex`/`nofollow` metadata. No public navigation links to it. Removing `src/app/aos` and the `/aos` bypasses in `MainLayout.tsx`, `DoorLoader.tsx`, and `SmoothScroll.tsx` removes the integration.

## Owner sign-in

Configure these values in local `.env.local` and the Vercel project environment:

- `AOS_ADMIN_USERNAME` — the owner login
- `AOS_ADMIN_PASSWORD` — a unique, long password
- `AOS_SESSION_SECRET` — a random secret with at least 32 characters

The session uses a 12-hour HTTP-only, same-site cookie scoped to `/aos`. Do not commit real credentials.

## Workflow

1. **Clients** — create a client with contact details and an email address.
2. **Projects** — add one or more projects for each client.
3. **Milestones** — add delivery and payment checkpoints to projects.
4. **Proposals** — edit scope, terms, and the manual commitment. Setting a proposal to **Approved** copies its amount to the linked milestone.
5. **Invoices** — create an invoice from an approved proposal, review the amount, and email it to the linked client. After receiving payment, mark it paid to record the date and email a receipt.
6. **Account** — review collected/outstanding amounts and expenses, and import or export a workspace backup.

A project has multiple milestones and changes to **Done** once it has at least one milestone and all its milestones are marked **Done**. Reopening a milestone changes a completed project to **In progress**. Records with linked children cannot be deleted until those children are removed.

## Invoice email

Email delivery uses Resend with `hello@relvodev.com` as the sender. Set `RESEND_API_KEY` in Vercel and verify the sender domain in Resend. The key stays server-side. Sending fails with a clear message if the key is missing or Resend rejects the request.

## Data storage

Records are currently saved in the signed-in browser's local storage. They do not sync between devices or browser profiles. Use **Download workspace backup** regularly and import it when moving browsers. This is an initial internal workflow tool, not accounting, tax, or contract-signing software; connect a managed database before using it as the agency's only record system.
