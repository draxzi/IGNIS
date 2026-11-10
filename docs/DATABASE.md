# Database documentation

The current IGNIS build intentionally has no database dependency. Source records, synthetic data and UI configuration are static and the Data Laboratory operates in the browser. This keeps GitHub export, local development and Vercel deployment simple and reproducible.

If persistence is needed later, use an independently managed PostgreSQL or Supabase project. Add a server-only `DATABASE_URL`, create migrations for research annotations and saved analyses, and put all reads/writes behind Next.js server code. Do not import a database client into a client component. Add ownership and row-level authorization before storing user data. The existing UI should continue to work when `DATABASE_URL` is absent.
