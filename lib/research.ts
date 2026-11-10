export type ResearchCategory =
  | 'Foundations'
  | 'Droplet combustion'
  | 'Flame propagation'
  | 'Flame suppression'
  | 'Smoke & soot'
  | 'Spacecraft fire safety';

export type ResearchRecord = {
  id: string;
  title: string;
  category: ResearchCategory;
  sourceOrg: string;
  sourceType: 'NASA overview' | 'NASA experiment' | 'NASA PSI investigation' | 'NASA NTRS record';
  date?: string;
  availability: 'Source page' | 'Public record' | 'Public repository';
  description: string;
  parameters: string[];
  sourceUrl: string;
  citation: string;
  limitation: string;
};

export type RecordKind = 'Research overview' | 'Experiment description' | 'Dataset metadata' | 'Research publication';
export type DatasetStatus = 'No downloadable measurements in this record' | 'Repository metadata; dataset access is separate' | 'Public metadata record; no preview available';

export function recordKind(record: ResearchRecord): RecordKind {
  if (record.sourceType === 'NASA NTRS record') return 'Research publication';
  if (record.sourceType === 'NASA PSI investigation') return 'Dataset metadata';
  if (record.sourceType === 'NASA experiment') return 'Experiment description';
  return 'Research overview';
}

export function datasetStatus(record: ResearchRecord): DatasetStatus {
  if (record.sourceType === 'NASA NTRS record') return 'Public metadata record; no preview available';
  if (record.sourceType === 'NASA PSI investigation') return 'Repository metadata; dataset access is separate';
  return 'No downloadable measurements in this record';
}

export const NASA_COMBUSTION_OVERVIEW =
  'https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/';
export const NASA_REDUCED_GRAVITY_BOOKLET =
  'https://www.nasa.gov/wp-content/uploads/2016/05/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf';
export const NASA_PSI_REPOSITORY = 'https://psi.nasa.gov/physci/repo';

export const researchRecords: ResearchRecord[] = [
  {
    id: 'overview-microgravity',
    title: 'Combustion Science: Why Microgravity Matters',
    category: 'Foundations',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA overview',
    date: '2025-09-04',
    availability: 'Source page',
    description:
      'NASA describes reduced gravity as a way to suppress buoyancy so researchers can study combustion phenomena that are obscured by gravity-driven flow on Earth.',
    parameters: ['gravity regime', 'buoyancy', 'density gradients', 'flame structure'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, Combustion Science overview.',
    limitation: 'An overview page, not a machine-readable experiment dataset.',
  },
  {
    id: 'acme-cfi-g',
    title: 'ACME CFI-G: Cool Flames Investigation with Gases',
    category: 'Foundations',
    sourceOrg: 'NASA Physical Sciences Informatics',
    sourceType: 'NASA PSI investigation',
    availability: 'Public repository',
    description:
      'The PSI record describes ISS spherical diffusion flame tests using multiple fuels, reactant dilutions, flow rates and pressures to study cool diffusion flames.',
    parameters: ['propane, n-butane, n-pentane', 'reactant dilution', 'flow rate', 'pressure', 'normal/inverse diffusion'],
    sourceUrl: NASA_PSI_REPOSITORY,
    citation: 'NASA PSI-159, Advanced Combustion via Microgravity Experiments / Cool Flames Investigation with Gases.',
    limitation: 'The PSI landing page documents the investigation; this demo does not claim to reproduce its flight data.',
  },
  {
    id: 'acme-flame-design',
    title: 'ACME / Flame Design',
    category: 'Flame propagation',
    sourceOrg: 'NASA Physical Sciences Informatics',
    sourceType: 'NASA PSI investigation',
    availability: 'Public repository',
    description:
      'The PSI record describes soot-inception limits for quasi-steady spherical diffusion flames across flow, mixture and inert-gas conditions.',
    parameters: ['soot inception', 'flow rate', 'Zst', 'inert dilution', 'pressure'],
    sourceUrl: NASA_PSI_REPOSITORY,
    citation: 'NASA PSI-10, Advanced Combustion via Microgravity Experiments / Flame Design.',
    limitation: 'Only documented parameters are surfaced; no numerical values are asserted here.',
  },
  {
    id: 'sofie',
    title: 'SoFIE: Solid Fuel Ignition and Extinction',
    category: 'Flame propagation',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA experiment',
    availability: 'Source page',
    description:
      'NASA identifies SoFIE as an investigation of ignition, extinction and flammability behaviour of solid materials in reduced gravity, with relevance to crewed-spacecraft fire hazards.',
    parameters: ['solid fuel', 'ignition', 'extinction', 'flammability', 'reduced gravity'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, SoFIE entry in Current Combustion Experiments.',
    limitation: 'The overview does not expose a downloadable row-level dataset.',
  },
  {
    id: 'flare',
    title: 'FLARE: Flammability Limits At Reduced-g',
    category: 'Flame propagation',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA experiment',
    availability: 'Source page',
    description:
      'FLARE develops a methodology to relate material flammability limits in normal gravity and microgravity, with an international research team.',
    parameters: ['flammability limits', 'material type', 'gravity level', 'oxygen conditions'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, FLARE entry in Current Combustion Experiments.',
    limitation: 'IGNIS uses this as a documented research record, not as a calibrated flammability predictor.',
  },
  {
    id: 'flex',
    title: 'FLEX: Flame Extinguishment Experiment',
    category: 'Flame suppression',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA experiment',
    availability: 'Source page',
    description:
      'FLEX assessed inert-gas suppressant effectiveness in microgravity and investigated limiting oxygen conditions for steady combustion.',
    parameters: ['inert-gas suppressant', 'limiting oxygen index', 'steady combustion', 'microgravity'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, FLEX entry in Archived Combustion Experiments.',
    limitation: 'No suppressant performance values are inferred from the overview record.',
  },
  {
    id: 'saffire',
    title: 'Saffire: Spacecraft Fire Safety Demonstration',
    category: 'Spacecraft fire safety',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA experiment',
    availability: 'Source page',
    description:
      'NASA presents Saffire as a spacecraft fire-safety demonstration supporting safer crewed missions and broader understanding of flame behaviour in space.',
    parameters: ['spacecraft fire safety', 'material flammability', 'flame spread', 'microgravity'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, Saffire entry in Archived Combustion Experiments.',
    limitation: 'This record does not state an operational fire-risk score or emergency threshold.',
  },
  {
    id: 'same',
    title: 'SAME: Smoke Aerosol Measurement Experiment',
    category: 'Smoke & soot',
    sourceOrg: 'NASA Glenn Research Center',
    sourceType: 'NASA experiment',
    availability: 'Source page',
    description:
      'SAME addresses the fact that spacecraft smoke detectors must detect different smoke types, including soot from hydrocarbon fuels and condensed polymer fragments from plastics.',
    parameters: ['smoke type', 'soot', 'polymer fragments', 'detector response'],
    sourceUrl: NASA_COMBUSTION_OVERVIEW,
    citation: 'NASA Glenn Research Center, SAME entry in Archived Combustion Experiments.',
    limitation: 'The overview provides context, not detector calibration data.',
  },
  {
    id: 'psi-60',
    title: 'Computational and Experimental Analysis of SPICE Data Sets',
    category: 'Smoke & soot',
    sourceOrg: 'NASA Physical Sciences Informatics',
    sourceType: 'NASA PSI investigation',
    availability: 'Public repository',
    description:
      'The PSI record describes image processing, experimental diagnostics and soot modelling applied to Smoke Point in Coflow Experiment data.',
    parameters: ['SPICE imagery', 'color channels', 'soot volume fraction', 'image processing', 'soot modelling'],
    sourceUrl: NASA_PSI_REPOSITORY,
    citation: 'NASA PSI-60, Computational and Experimental Analysis of SPICE Data Sets.',
    limitation: 'The public repository entry is a project record; the demo does not embed its image files.',
  },
  {
    id: 'ntrs-fire-safety',
    title: 'Spacecraft Fire Safety and Microgravity Combustion',
    category: 'Spacecraft fire safety',
    sourceOrg: 'NASA Glenn Research Center / NASA NTRS',
    sourceType: 'NASA NTRS record',
    date: '2001-01-01',
    availability: 'Public record',
    description:
      'A publicly available NASA Technical Reports Server record for a 2001 conference paper on spacecraft fire-safety research and microgravity combustion.',
    parameters: ['spacecraft fire safety', 'microgravity combustion', 'materials screening'],
    sourceUrl: 'https://ntrs.nasa.gov/citations/20020028886',
    citation: 'NASA NTRS document 20020028886; conference paper, publication date 2001-01-01.',
    limitation: 'The NTRS landing page reports metadata and no preview; users should open the original record for citation work.',
  },
];

export const syntheticSeries = [
  { time_s: 0, temperature_k: 410, flame_radius_mm: 2.4, oxygen_pct: 21.0 },
  { time_s: 5, temperature_k: 660, flame_radius_mm: 3.3, oxygen_pct: 20.4 },
  { time_s: 10, temperature_k: 910, flame_radius_mm: 4.2, oxygen_pct: 19.7 },
  { time_s: 15, temperature_k: 1130, flame_radius_mm: 5.0, oxygen_pct: 19.1 },
  { time_s: 20, temperature_k: 1270, flame_radius_mm: 5.7, oxygen_pct: 18.6 },
  { time_s: 25, temperature_k: 1320, flame_radius_mm: 6.1, oxygen_pct: 18.2 },
  { time_s: 30, temperature_k: 1335, flame_radius_mm: 6.2, oxygen_pct: 17.9 },
  { time_s: 35, temperature_k: 1324, flame_radius_mm: 6.1, oxygen_pct: 17.7 },
  { time_s: 40, temperature_k: 1302, flame_radius_mm: 5.9, oxygen_pct: 17.5 },
];

export const categoryCounts = researchRecords.reduce<Record<string, number>>((acc, record) => {
  acc[record.category] = (acc[record.category] ?? 0) + 1;
  return acc;
}, {});

export const recentRecords = [...researchRecords]
  .filter((record) => record.date)
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  .slice(0, 4);
