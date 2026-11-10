# Dataset and source inventory

## Source-kind distinctions

IGNIS does not collapse every NASA link into a dataset. The local index labels each record as one of four source kinds:

- **Research overview** — a NASA overview page that explains a topic or lists investigations.
- **Experiment description** — an overview entry describing an experiment objective or method.
- **Dataset metadata** — a NASA Physical Sciences Informatics investigation record that points to a data-bearing research program, without embedding its rows in this application.
- **Research publication** — a NASA Technical Reports Server metadata record for a paper or report.

The Research Explorer shows a second field for data availability. Current statuses are intentionally conservative: no downloadable measurements in the overview/experiment record; repository metadata with access handled separately for PSI investigations; or public publication metadata with no preview for the NTRS record.

## Curated source records

The local index contains 10 NASA-linked records. Seven are surfaced from NASA Glenn’s combustion overview, two from the NASA PSI repository, and one from NASA NTRS metadata. Each record includes a title, category, source organisation, source kind, documented parameters, original URL, citation and limitation.

NASA Open Data is a prioritised source pathway for future expansion, but no additional combustion dataset is included here without a verified public landing page and provenance. The current inventory is intentionally small and transparent rather than pretending to be exhaustive.

## Synthetic demonstration CSV

`public/sample-combustion.csv` contains 9 illustrative rows with these columns:

- `time_s`
- `temperature_k`
- `flame_radius_mm`
- `oxygen_pct`

The values are synthetic. They exist to exercise upload, quoted-field parsing, validation, missing-value checks, descriptive statistics, filtering, charting and export controls. They must not be cited as NASA measurements, a fitted physical model or an operational fire-safety threshold.

## Adding a real dataset

Place a user-owned CSV in the Data Laboratory or add a documented source record to `lib/research.ts`. Preserve units in the header or accompanying documentation. Record the original source URL, acquisition date, data license, experiment identifier and any missing-value semantics. Do not add a number unless it can be traced to the source file or publication.
