# IGNIS delivery TODO

## Portable application foundation
- [ ] Provide a standard Next.js App Router, React, TypeScript and Tailwind CSS project with package manifest, lockfile, configuration files, source files, public assets, `.env.example`, and no proprietary Manus runtime dependency.
- [ ] Support `npm install`, `npm run dev`, and `npm run build`; keep the app compatible with standard Node.js and Vercel.
- [ ] Provide functional navigation, route manifest, responsive layouts, accessible controls, loading/error/empty states, and visible feedback for interactions.

## Command dashboard and research explorer
- [ ] Deliver the IGNIS overview dashboard with branding, microgravity context, statistics derived from the indexed local records, dataset availability indicators, recent records, categories, and insights without invented numerical claims.
- [ ] Deliver research search, category filtering, experiment/publication metadata, documented parameters, source organisation, dates when available, and original source links.

## Combustion Data Lab
- [ ] Support CSV upload with size limits, preview, automatic column detection, validation, missing-value identification, descriptive statistics, filtering/sorting, relevant scientific visualizations, and data export.
- [ ] Include a synthetic demonstration dataset that is explicitly labelled illustrative and never presented as NASA measurement data.

## Assistant and comparison
- [ ] Deliver a source-aware research assistant with source links, uncertainty language, unsupported-question handling, server-only optional AI configuration, and a useful local fallback when credentials are unavailable.
- [ ] Deliver experiment comparison with documented parameters only, comparison table, interactive charting, differences/similarities, source references, and limitations.

## Fire-safety and visualization modules
- [ ] Deliver fire-safety intelligence organized by flame behaviour, heat transfer, combustion conditions, fuel, oxygen, experimental limitations, and spacecraft fire-safety relevance without inventing a numerical risk score.
- [ ] Deliver the visualization studio with time-series charts, experiment comparisons, parameter filtering, legends, inspection, chart export, and downloadable summaries with units and sources visible.

## Documentation and scientific integrity
- [ ] Include project motivation, scientific background, methodology, data sources, analysis techniques, AI methodology, limitations, integrity practices, contributors and acknowledgements.
- [ ] Include README, architecture documentation, research methodology, dataset/source inventory, API documentation, environment guide, database note, testing report, deployment guide, known limitations, and presentation outline.
- [ ] Verify that NASA records, experiment identifiers, measurements, links, and conclusions are not fabricated; distinguish curated source records from synthetic demo data.

## Verification and export
- [ ] Test route rendering, dashboard, research search/filtering, dataset loading, CSV parsing/statistics, charts, comparison, assistant fallback/API errors, responsive layout, broken links and production build.
- [ ] Prepare a complete source export/ZIP suitable for GitHub upload and direct Vercel import without rebuilding the application from scratch.
