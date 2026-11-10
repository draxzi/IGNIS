# IGNIS implementation plan

## Product scope

IGNIS is a portable Next.js App Router application for exploring microgravity combustion research. It combines a verified, curated NASA source inventory with a browser-side data laboratory, experiment comparison, responsible research assistance, fire-safety interpretation, and scientific visualization. The application runs in local demonstration mode without authentication, a database, or an AI key. Optional AI requests are handled by a server route using independently configurable OpenAI-compatible environment variables.

## Architecture

- **Frontend**: Next.js App Router, React, TypeScript, Tailwind CSS, Recharts, and Lucide React. Each major module has its own route and shares a responsive AppShell.
- **Data layer**: Static typed research records in `lib/research.ts`, with source URLs and explicit source-kind labels. Synthetic demonstration series live in the same module but are marked illustrative and never presented as NASA measurements.
- **Data processing**: Browser-side CSV parsing and validation in `lib/data-utils.ts`. The lab detects common scientific columns by normalized names, identifies missing values, calculates descriptive statistics, filters rows, and renders only relevant chart series.
- **AI adapter**: `app/api/assistant/route.ts` validates input, uses a configurable OpenAI-compatible endpoint when `AI_API_KEY` is present, and otherwise returns a local evidence-aware fallback. No browser bundle receives a secret.
- **Persistence**: None required for the demo. The README documents how to add Supabase or another independently managed PostgreSQL service later without changing the core UI.
- **Deployment**: Standard `npm install`, `npm run dev`, and `npm run build`; no Manus imports, URLs, SDKs, or authentication. Vercel can build the repository directly.

## Information architecture

- `/` — command dashboard with verified record counts, category distribution, dataset readiness, recent records, and a compact temperature series from labelled synthetic data.
- `/research` — research explorer with search, category filters, source badges, metadata, and original links.
- `/lab` — CSV upload/data preview/statistics/filtering and relevant charts, plus a clearly labelled synthetic sample.
- `/compare` — documented experiment comparison matrix with optional parameter charting.
- `/assistant` — source-aware assistant with fallback answers and optional server AI.
- `/safety` — qualitative evidence cards for flame behaviour, heat transfer, conditions, fuel/oxygen, limitations, and spacecraft relevance. It does not create a fire-risk score.
- `/visualize` — focused visualization workspace with chart controls and export/download actions.
- `/about` — methodology, integrity, limitations, stack, and deployment notes.

## Design system

### Candidate styles

- **Orbital instrument panel** — 0.06 probability: dark lab surfaces, precise telemetry, amber signal accents.
- **Mission-control editorial** — 0.07 probability: restrained blue-black UI with research-first typography and crisp data cards.
- **Solaris observatory** — 0.04 probability: luminous cyan/amber markers over an almost-black scientific canvas.

### Chosen style: Orbital instrument panel

- **Design movement**: contemporary aerospace mission-control UI with editorial scientific restraint.
- **Core principles**: evidence before ornament; clear hierarchy; compact telemetry with generous breathing room; every action has visible feedback.
- **Color philosophy**: midnight navy and charcoal reduce visual noise, cyan marks active instrumentation, and amber is reserved for combustion signals and cautions.
- **Layout paradigm**: a persistent left rail on wide screens and an anchored horizontal mobile rail; content uses offset bands and instrument bays rather than a generic centered card grid.
- **Signature elements**: a concentric IGNIS mark; thin orbital hairlines; small uppercase telemetry labels with amber/cyan signal dots.
- **Interaction philosophy**: interactions feel like switching an instrument channel—selection is explicit, states are readable, and defaults are safe.
- **Animation**: only low-amplitude pulse/fade for live-looking status dots and chart entry; respect reduced-motion preferences and avoid decorative motion.
- **Typography system**: Geist/Inter-style sans-serif for UI and IBM Plex Mono fallback for measurement labels, IDs, and metadata. Strong display headings are compact and sentence-cased.
- **Brand essence**: a research cockpit for understanding fire beyond gravity; precise, calm, accountable.
- **Brand voice**: headlines are direct and scientific; CTAs say what the user can inspect. Example lines: “Trace the variables that shape a flame.” and “Open the source record before drawing a conclusion.”
- **Wordmark & logo**: custom SVG orbit-and-ember symbol paired with the IGNIS wordmark; the ember sits inside an interrupted orbital ring to signal combustion within a controlled experimental frame.
- **Signature brand color**: `#57d3c7`, a cool instrument cyan that stays distinct from NASA-blue conventions while pairing with amber evidence markers.

## Project structure

```text
app/
  api/assistant/route.ts     optional server-side AI adapter
  about/page.tsx
  assistant/page.tsx
  compare/page.tsx
  lab/page.tsx
  research/page.tsx
  safety/page.tsx
  visualize/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  app-shell.tsx              navigation and shared shell
  charts.tsx                 Recharts wrappers
  icons.tsx                  IGNIS mark and status glyphs
  section-header.tsx         reusable page header
  ui.tsx                     small shadcn-style primitives
lib/
  assistant.ts               fallback answers and source matching
  data-utils.ts              CSV parser and statistics
  research.ts                verified records and documented parameters
public/
  ignis-mark.svg
  manus-routes.json
  sample-combustion.csv
  favicon.svg
  ...
docs/
  ARCHITECTURE.md
  API.md
  DATASET-INVENTORY.md
  DEPLOYMENT.md
  ENVIRONMENT.md
  LIMITATIONS.md
  PRESENTATION-OUTLINE.md
  RESEARCH-METHODOLOGY.md
  TESTING.md
```

## Portability decisions

The project uses only public npm packages and native browser/server APIs. It has no Manus imports, no platform URLs, no required managed database, no required managed auth, and no build-time secret. `.env.example` documents optional AI variables and an optional future database URL. All copyable scientific records are static source files. The README includes GitHub, Vercel, local development, configuration, build, and troubleshooting instructions.
