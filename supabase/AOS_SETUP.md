# Private AOS database setup

1. Create a Supabase project in your own account.
2. In its SQL Editor, run [`aos_workspace.sql`](./aos_workspace.sql).
3. In the project's **Connect** dialog or **Settings → API Keys**, copy the project URL and create/copy a **Secret key** (`sb_secret_...`).
4. Add these as server-only environment variables in Vercel Project Settings:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
5. Also set `AOS_ADMIN_USERNAME`, a unique strong `AOS_ADMIN_PASSWORD`, and a newly generated random `AOS_SESSION_SECRET` (at least 32 characters). Redeploy after saving the variables.

Never prefix the secret key with `NEXT_PUBLIC_`, commit it, or paste it into chat. The database table has RLS enabled and no public or authenticated-user policies. Only the authenticated AOS server routes use the server-side secret key. The AOS screen requires the single admin username and password before data routes will return or accept data.

On the first successful connection, existing AOS records in that browser are migrated once if the hosted workspace is empty. After that, records load from and save to the hosted database; they are no longer written to browser local storage. If the database is unavailable, AOS stops before loading data and shows a connection error.

For local development, put the same variables in the ignored `.env.local` file. Keep production database credentials out of Preview deployments unless you intentionally want previews to share production data.
