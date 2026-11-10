# IGNIS

**Intelligent Guidance & NASA Insights System**  
*Understanding Fire Beyond Gravity.*

IGNIS is a portable Next.js research cockpit for exploring microgravity combustion and spacecraft fire-safety context. It combines a curated NASA-linked source index with browser-side CSV analysis, documented-parameter comparison, responsible qualitative safety interpretation, scientific visualization, and an optional server-side OpenAI-compatible research assistant.

## What is included

The application provides these routes:

- `/` — overview dashboard with indexed-record counts, category distribution, synthetic demo telemetry and recent records.
- `/research` — searchable, filterable research explorer with source metadata, parameters, limitations and original links.
- `/lab` — local CSV upload, preview, column detection, missing-value checks, descriptive statistics, filtering, charts and export.
- `/compare` — multi-record comparison using documented parameters only.
- `/assistant` — evidence-aware assistant with a local fallback and optional external AI adapter.
- `/safety` — qualitative fire-safety intelligence with explicit interpretation boundaries.
- `/visualize` — chart controls, visible units, hover inspection and downloadable CSV summary.
- `/about` — methodology, integrity practices, architecture choices and portability notes.

The default dataset and charts are synthetic and labelled as illustrative. They are included to make the application usable without a NASA account, database, API key or hosted service.

## Run locally

Requirements: Node.js 18.17+ or 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For a production check:

```bash
npm run typecheck
npm run build
npm start
```

No environment variables are required for local mode.

## Optional AI configuration

Copy `.env.example` to `.env.local` and set the following only if you want the assistant to call an independently managed OpenAI-compatible endpoint:

```bash
AI_API_KEY=your-key
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

The key is read only by `app/api/assistant/route.ts`. It is never imported into client components. If the key is missing or the upstream request fails, the API returns the bounded local fallback. The fallback is the default and is fully functional.

## GitHub and Vercel

1. Create an empty GitHub repository.
2. From this folder, run `git init`, `git add .`, `git commit -m "Build IGNIS research cockpit"`, `git branch -M main`, `git remote add origin <your-repository-url>`, and `git push -u origin main`.
3. Import the repository in Vercel. Framework preset: **Next.js**. Build command: `npm run build`. Install command: `npm install`. No output-directory override is required.
4. Add `AI_API_KEY`, `AI_BASE_URL` and `AI_MODEL` in Vercel only if external AI is desired. Do not commit `.env` files.
5. Deploy. The default application is independent of Manus hosting, authentication and database services.

## Portability

The project uses standard Next.js, React, TypeScript, Tailwind CSS, Recharts and Lucide React packages. It contains no Manus imports, proprietary runtime calls, hardcoded Manus URLs or required managed service. Static research records are stored in `lib/research.ts`; the local parser and calculations are in `lib/data-utils.ts`; the optional AI adapter is a conventional Next.js API route.

A database is not required for this build. If persistent user datasets or research annotations are added later, connect an independently managed PostgreSQL/Supabase service through a server-only `DATABASE_URL` and add a migration layer. See `docs/DATABASE.md`.

## Scientific integrity

IGNIS does not claim to certify spacecraft fire safety, predict emergencies or replace NASA standards and mission procedures. The curated records link to NASA Glenn Research Center, NASA Physical Sciences Informatics and NASA Technical Reports Server sources. A record establishes what the source page documents; it does not create a new measurement. Synthetic data is labelled in the UI and in the documentation.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Research methodology](docs/RESEARCH-METHODOLOGY.md)
- [Dataset and source inventory](docs/DATASET-INVENTORY.md)
- [API](docs/API.md)
- [Environment](docs/ENVIRONMENT.md)
- [Database note](docs/DATABASE.md)
- [Testing report](docs/TESTING.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Known limitations](docs/LIMITATIONS.md)
- [Presentation outline](docs/PRESENTATION-OUTLINE.md)
- [Privacy and data flow](docs/PRIVACY.md)
- [Terms and use limitations](docs/TERMS.md)
- [Scientific disclaimer](docs/SCIENTIFIC-DISCLAIMER.md)

## License note

This repository is application source code. NASA source material remains subject to the source organization’s public-use and citation terms. Keep original source links and attribution when extending the inventory.
