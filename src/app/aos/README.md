# Relvo Agency Operating System

The AOS lives under this folder and is served at `/aos`. It has its own page, auth handlers, modules, and UI; it does not use the public site header, footer, cursor, door loader, or smooth-scroll behavior. Removing this folder and the small `/aos` bypasses in `src/components/layout/MainLayout.tsx`, `src/components/props/DoorLoader.tsx`, and `src/components/providers/SmoothScroll.tsx` removes the private app integration.

## Owner-only sign in

Set these environment variables for local development and the Vercel project:

- `AOS_ADMIN_USERNAME`: the one owner login name
- `AOS_ADMIN_PASSWORD`: a unique, long password
- `AOS_SESSION_SECRET`: a random secret with at least 32 characters

Example local setup: copy the values into the root `.env.local`. Do not commit actual credentials. The session is a 12-hour, HTTP-only, same-site cookie scoped to `/aos`.

## Current data storage

Records are stored in the signed-in browser's local storage. Use **Download workspace backup** regularly and **Import a workspace backup** to move the data to another browser. This first version does not sync records across devices and is not a replacement for accounting, tax, or contract-signing software. For multi-device access, connect a managed database before relying on it as the agency's only record system.

## Modules

Overview, clients, proposals, contracts, projects, delivery/payment milestones, invoices, team costs, operating expenses, and a cash-based profit summary.
