import { researchRecords, NASA_COMBUSTION_OVERVIEW, NASA_PSI_REPOSITORY, type ResearchRecord } from '@/lib/research';

export type AssistantResponse = {
  answer: string;
  sources: { title: string; url: string }[];
  mode: 'local-fallback' | 'configured-ai';
  uncertainty: string;
};

const source = (id: string) => researchRecords.find((record) => record.id === id);
const links = (records: ResearchRecord[]) => records.map((record) => ({ title: record.citation, url: record.sourceUrl }));

export function relevantRecords(question: string) {
  const normalized = question.toLowerCase();
  const stopWords = new Set(['what', 'when', 'where', 'which', 'why', 'how', 'does', 'did', 'are', 'is', 'the', 'and', 'for', 'with', 'from', 'about', 'this', 'that', 'can', 'could', 'would', 'should', 'please', 'tell', 'explain']);
  const scored = researchRecords.map((record) => {
    const haystack = `${record.id} ${record.title} ${record.category} ${record.description} ${record.parameters.join(' ')}`.toLowerCase();
    const terms = normalized.split(/[^a-z0-9]+/).filter((term) => term.length > 2 && !stopWords.has(term));
    const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
    return { record, score };
  });
  return scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map((item) => item.record);
}

export function fallbackAnswer(question: string): AssistantResponse {
  const normalized = question.toLowerCase();

  if (normalized.includes('spherical') || normalized.includes('diffusion flame')) {
    const acme = source('acme-cfi-g');
    return {
      answer: 'A spherical diffusion flame is a flame structure that forms around a fuel source when fuel and oxidizer meet by diffusion rather than a premixed flow. In reduced gravity, buoyancy-driven motion is suppressed, so the geometry can be closer to spherical and easier to compare with simplified models. The ACME CFI-G record documents tests that varied fuels, reactant dilutions, flow rates and pressures. IGNIS treats those as documented investigation parameters, not as a claim about a particular measured outcome.',
      sources: acme ? links([acme]) : [],
      mode: 'local-fallback',
      uncertainty: 'The fallback uses the cited investigation description. It does not retrieve the underlying flight data or calculate a new scientific result.',
    };
  }

  if ((normalized.includes('compare') || normalized.includes('difference')) && (normalized.includes('acme') || normalized.includes('flex'))) {
    const records = [source('acme-cfi-g'), source('flex')].filter((record): record is ResearchRecord => Boolean(record));
    return {
      answer: 'The indexed records describe different research objectives. ACME CFI-G focuses on spherical diffusion flames and cool-flame conditions across fuel, dilution, flow and pressure variables. FLEX focuses on inert-gas suppression and limiting oxygen conditions for steady combustion. They can be compared by documented objective and conditions, but the records do not provide a shared measurement table that would support a direct performance ranking.',
      sources: links(records),
      mode: 'local-fallback',
      uncertainty: 'This is a source-record comparison. It is not a cross-experiment statistical analysis.',
    };
  }

  if (normalized.includes('buoy') || normalized.includes('gravity') || normalized.includes('different')) {
    const overview = source('overview-microgravity');
    return {
      answer: 'On Earth, hot gases are less dense than their surroundings, so gravity creates buoyant flow that lifts and stretches flames. NASA explains that this flow can dominate the flame shape and introduce flicker. In reduced gravity, buoyancy is suppressed, allowing researchers to isolate transport and chemistry effects more directly. That simplification is useful for research, but it does not make space fires harmless: spacecraft materials, ventilation, oxygen concentration and detection remain important variables.',
      sources: overview ? links([overview]) : [{ title: 'NASA Glenn Combustion Science overview', url: NASA_COMBUSTION_OVERVIEW }],
      mode: 'local-fallback',
      uncertainty: 'This is a high-level explanation grounded in NASA’s overview. It is not a spacecraft operational procedure or a fire prediction.',
    };
  }

  if (normalized.includes('fire safety') || normalized.includes('spacecraft') || normalized.includes('risk')) {
    const records = [source('flex'), source('saffire'), source('same')].filter((record): record is ResearchRecord => Boolean(record));
    return {
      answer: 'Microgravity combustion research is relevant to spacecraft fire safety because flame spread, smoke production, extinction and detector response can differ when buoyant flow is reduced. NASA identifies FLEX as an investigation of inert-gas suppression and limiting oxygen conditions, Saffire as a spacecraft fire-safety demonstration, and SAME as a study of different smoke types. These records support careful material screening and experiment design; they do not justify a single numerical risk score or certify a spacecraft configuration.',
      sources: links(records),
      mode: 'local-fallback',
      uncertainty: 'The assistant does not infer emergency thresholds from overview pages and does not replace NASA standards, engineering analysis or crew procedures.',
    };
  }

  if (normalized.includes('dataset') || normalized.includes('data')) {
    const records = [source('acme-cfi-g'), source('psi-60')].filter((record): record is ResearchRecord => Boolean(record));
    return {
      answer: 'IGNIS includes a browser-side synthetic demonstration series with temperature, flame radius and oxygen columns so the analysis workflow can be tested locally. It is explicitly labelled illustrative. The research library points to NASA’s Physical Sciences Informatics investigation records for public metadata, including ACME and SPICE-related analysis. The demo does not pretend that the synthetic rows are NASA measurements.',
      sources: links(records),
      mode: 'local-fallback',
      uncertainty: 'Use the linked NASA repository records for primary data access and citation. IGNIS’s local sample is not a validated scientific dataset.',
    };
  }

  const matched = relevantRecords(question);
  if (matched.length > 0) {
    return {
      answer: `I found related indexed records, but the local fallback does not have enough evidence to answer that question safely. Open the cited records and refine the question around a documented objective, parameter or limitation.`,
      sources: links(matched),
      mode: 'local-fallback',
      uncertainty: 'The fallback declines unsupported interpretation rather than inventing a scientific conclusion.',
    };
  }

  return {
    answer: 'I do not have enough indexed evidence to answer that question safely. Try asking why buoyancy changes flame behaviour, what a spherical diffusion flame is, how ACME and FLEX differ, or how spacecraft fire-safety research relates to smoke and suppression.',
    sources: [],
    mode: 'local-fallback',
    uncertainty: 'No relevant source record was selected, so IGNIS intentionally provides no citation.',
  };
}
