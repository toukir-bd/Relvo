-- Run this in the Supabase SQL Editor before connecting the AOS application.
create table if not exists public.aos_workspace_data (
  id text primary key check (id = 'owner'),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.aos_workspace_data enable row level security;
revoke all on table public.aos_workspace_data from anon, authenticated;
grant all on table public.aos_workspace_data to service_role;

-- No client-facing policies are defined. The server-only service-role key is
-- used by authenticated AOS API routes and must never be exposed to the browser.
