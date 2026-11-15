'use client';

import { useMemo, useState } from 'react';
import {
  Check,
  ExternalLink,
  GitCompareArrows,
  Minus,
  Plus,
  Scale,
  Layers,
} from 'lucide-react';
import { ComparisonChart } from '@/components/charts';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import { researchRecords } from '@/lib/research';

const comparable = researchRecords.filter(
  (record) => record.sourceType !== 'NASA overview'
);

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([
    'acme-cfi-g',
    'flex',
    'saffire',
  ]);

  const records = selected
    .map((id) => researchRecords.find((r) => r.id === id))
    .filter((r): r is (typeof researchRecords)[number] => Boolean(r));

  const parameterData = useMemo(
    () =>
      records.map((record) => ({
        name: record.id.slice(0, 12),
        value: record.parameters.length,
      })),
    [records]
  );

  function toggle(id: string) {
    setSelected((curr) =>
      curr.includes(id)
        ? curr.filter((item) => item !== id)
        : curr.length < 4
        ? [...curr, id]
        : curr
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="04 / comparison bay"
        title="Experiment Comparison Studio"
        description="Select up to four flight experiments or investigations. IGNIS places verified source parameters side-by-side, surfacing distinct testing regimes without synthesizing missing experimental variables."
        status="Documented Fields Only"
      />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        {/* Record Selection Column */}
        <GlassCard tier="raised" className="p-6 h-fit">
          <div className="flex items-center justify-between border-b border-cosmic/60 pb-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                Experiment Picker
              </p>
              <h3 className="mt-1 font-display text-base font-bold text-cream">
                Select Investigations
              </h3>
            </div>
            <Badge tone="amber">{selected.length}/4</Badge>
          </div>

          <div className="mt-4 space-y-2">
            {comparable.map((record) => {
              const isSelected = selected.includes(record.id);
              return (
                <button
                  key={record.id}
                  onClick={() => toggle(record.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-rose/40 bg-rose/15 shadow-[0_0_15px_rgba(209,169,167,0.15)]'
                      : 'border-cosmic/60 bg-void/40 hover:border-rose/25 hover:bg-rose/5'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${
                      isSelected
                        ? 'border-rose bg-rose text-void'
                        : 'border-cosmic text-muted'
                    }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-cream">
                      {record.title}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-wider text-muted">
                      {record.sourceOrg}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-5 border-t border-cosmic/50 pt-4 text-[11px] leading-relaxed text-muted">
            Comparisons evaluate documented parameters (fuel type, reactant dilution, flow, suppressant). Different test rigs are not interchangeable.
          </p>
        </GlassCard>

        {/* Right Comparison Matrix & Charts */}
        <div className="space-y-6">
          {records.length === 0 ? (
            <GlassCard tier="raised" className="py-16 text-center">
              <Scale className="mx-auto h-8 w-8 text-rose" />
              <p className="mt-4 font-display text-base font-semibold text-cream">
                Select at least one record to initiate comparison
              </p>
            </GlassCard>
          ) : (
            <>
              {/* Matrix Table */}
              <GlassCard tier="raised" className="p-6">
                <div className="flex items-center justify-between border-b border-cosmic/60 pb-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                      Parameter Comparison Matrix
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold text-cream">
                      Documented Investigation Specifications
                    </h3>
                  </div>
                  <Badge tone="rose">{records.length} selected</Badge>
                </div>

                <div className="mt-4 scrollbar-thin overflow-x-auto rounded-2xl border border-cosmic/70">
                  <table className="min-w-[650px] w-full text-left text-xs">
                    <thead className="bg-void/60 text-[10px] uppercase tracking-wider text-muted font-mono">
                      <tr className="border-b border-cosmic/70">
                        <th className="px-4 py-3 font-semibold w-40">Field</th>
                        {records.map((r) => (
                          <th key={r.id} className="px-4 py-3 text-rose font-semibold">
                            {r.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cosmic/50">
                      {[
                        'Source Organisation',
                        'Category',
                        'Availability',
                        'Documented Parameters',
                        'Limitation Note',
                      ].map((field) => (
                        <tr key={field} className="hover:bg-rose/[0.02] transition-colors">
                          <td className="px-4 py-3.5 font-mono text-[10px] uppercase tracking-wider text-muted font-medium">
                            {field}
                          </td>
                          {records.map((r) => (
                            <td key={r.id} className="px-4 py-3.5 align-top leading-relaxed text-cream/90">
                              {field === 'Source Organisation' && r.sourceOrg}
                              {field === 'Category' && (
                                <Badge tone="rose">{r.category}</Badge>
                              )}
                              {field === 'Availability' && (
                                <span className="text-amber font-mono text-[10px]">
                                  {r.availability}
                                </span>
                              )}
                              {field === 'Documented Parameters' && (
                                <div className="flex flex-wrap gap-1">
                                  {r.parameters.map((p) => (
                                    <span
                                      key={p}
                                      className="rounded-lg border border-cosmic bg-void/60 px-2 py-0.5 font-mono text-[9px] text-muted"
                                    >
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {field === 'Limitation Note' && (
                                <span className="text-muted text-[11px]">{r.limitation}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              {/* Interpretation and Coverage Chart */}
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <GlassCard tier="raised" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                    Analytical Interpretation
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-cream">
                    Similarities &amp; Boundaries
                  </h3>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted">
                    <p className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-rose mt-0.5" />
                      All selected investigations isolate microgravity combustion transport phenomena by suppressing buoyancy.
                    </p>
                    <p className="flex items-start gap-2">
                      <Minus className="h-4 w-4 shrink-0 text-amber mt-0.5" />
                      Each mission explores distinct objectives: ACME examines cool flames; FLEX evaluates inert quench; Saffire monitors spacecraft-scale fabric flammability.
                    </p>
                    <p className="flex items-start gap-2">
                      <GitCompareArrows className="h-4 w-4 shrink-0 text-rose mt-0.5" />
                      The parameter coverage metric indicates documented index density, not relative experimental merit.
                    </p>

                    <div className="mt-5 border-t border-cosmic/60 pt-3 space-y-2">
                      {records.map((r) => (
                        <a
                          key={r.id}
                          href={r.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-[10px] text-rose hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> {r.citation}
                        </a>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                <GlassCard tier="raised" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                    Parameter Coverage
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-cream">
                    Documented Fields Per Record
                  </h3>

                  <div className="mt-4">
                    <ComparisonChart
                      data={parameterData}
                      dataKey="value"
                      label="Documented parameters"
                      color="#F3A65B"
                    />
                  </div>
                  <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-muted">
                    Higher bar indicates greater parameter granularity in the source record
                  </p>
                </GlassCard>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
