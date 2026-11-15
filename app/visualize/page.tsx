'use client';

import { useMemo, useState } from 'react';
import { Download, Eye, FileDown, Info, Sliders, LineChart as ChartIcon } from 'lucide-react';
import { TelemetryChart } from '@/components/charts';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, EmptyState, Select } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import { datasetStatus, researchRecords, syntheticSeries } from '@/lib/research';

const series = {
  temperature_k: { label: 'Temperature (K)', color: '#F3A65B', unit: 'K' },
  flame_radius_mm: { label: 'Flame radius (mm)', color: '#D1A9A7', unit: 'mm' },
  oxygen_pct: { label: 'Oxygen concentration (%)', color: '#7F5276', unit: '%' },
};

export default function VisualizePage() {
  const [metric, setMetric] = useState<keyof typeof series>('temperature_k');
  const [sourceFilter, setSourceFilter] = useState('synthetic');

  const selectedRecord = useMemo(
    () => researchRecords.find((r) => r.id === sourceFilter),
    [sourceFilter]
  );

  const chartData = useMemo(
    () =>
      sourceFilter === 'synthetic'
        ? syntheticSeries.map((point) => ({
            time_s: point.time_s,
            [metric]: point[metric],
          }))
        : [],
    [metric, sourceFilter]
  );

  function downloadSummary() {
    if (!chartData.length) return;
    const rows = [
      `source,metric,unit`,
      `Synthetic demonstration,${series[metric].label},${series[metric].unit}`,
      ...chartData.map((pt) => `${pt.time_s},${pt[metric]}`),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `ignis-${metric}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="07 / visualization bay"
        title="Scientific Visualization Studio"
        description="Plot single-channel time-series observables with transparent provenance. Verified NASA records in this catalog are metadata investigations, so the studio presents an honest empty state rather than inventing synthetic data."
        status="Provenance Visible"
        action={
          <Button
            onClick={downloadSummary}
            disabled={!chartData.length}
            variant="primary"
          >
            <Download className="h-4 w-4" /> Export CSV Summary
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* Large Chart Canvas */}
        <GlassCard tier="raised" className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cosmic/60 pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                Observation Time-Series Channel
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-cream">
                {sourceFilter === 'synthetic'
                  ? 'Baseline Synthetic Combustion Trace'
                  : selectedRecord?.title ?? 'Selected Investigation'}
              </h3>
            </div>
            <Badge tone={sourceFilter === 'synthetic' ? 'amber' : 'mauve'}>
              {sourceFilter === 'synthetic' ? 'Illustrative Model' : 'Repository Record'}
            </Badge>
          </div>

          <div className="mt-6">
            {sourceFilter === 'synthetic' ? (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge tone="amber">
                    <Info className="h-3 w-3" /> Baseline Synthetic Demonstration
                  </Badge>
                  <span className="font-mono text-xs text-muted">
                    Time (s) vs {series[metric].label}
                  </span>
                </div>

                <TelemetryChart
                  data={chartData as unknown as Record<string, unknown>[]}
                  xKey="time_s"
                  xLabel="Time (s)"
                  yLabel={series[metric].unit}
                  lines={[
                    {
                      key: metric,
                      label: series[metric].label,
                      color: series[metric].color,
                    },
                  ]}
                  height={380}
                />

                <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <Eye className="h-3.5 w-3.5 text-rose" />
                  Hover data nodes to inspect discrete time-step values. Numerical values are illustrative.
                </div>
              </>
            ) : (
              <EmptyState
                title="No Downloadable Sensor Series Attached"
                body={`${
                  selectedRecord?.title ?? 'This record'
                } is documented as ${
                  selectedRecord ? datasetStatus(selectedRecord).toLowerCase() : 'metadata'
                }. Open the original NASA PSI repository or upload an observational CSV in the Data Laboratory to render graphs.`}
                action={
                  selectedRecord && (
                    <a
                      href={selectedRecord.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="secondary">
                        Open NASA Repository Link
                      </Button>
                    </a>
                  )
                }
              />
            )}
          </div>
        </GlassCard>

        {/* Floating Control Panel */}
        <div className="space-y-6">
          <GlassCard tier="raised" className="p-6">
            <div className="flex items-center gap-2 border-b border-cosmic/60 pb-3">
              <Sliders className="h-4 w-4 text-rose" />
              <h3 className="font-display text-base font-bold text-cream">
                Studio Controls
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="visualize-source"
                  className="mb-1.5 block font-mono text-[10px] uppercase text-muted"
                >
                  Source Channel
                </label>
                <Select
                  id="visualize-source"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <option value="synthetic">Synthetic demonstration</option>
                  {researchRecords.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </Select>
                <p className="mt-1.5 font-mono text-[10px] text-muted">
                  Switching to a metadata record renders an honest empty state.
                </p>
              </div>

              <div>
                <label
                  htmlFor="visualize-metric"
                  className="mb-1.5 block font-mono text-[10px] uppercase text-muted"
                >
                  Observable Variable
                </label>
                <Select
                  id="visualize-metric"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value as keyof typeof series)}
                  disabled={sourceFilter !== 'synthetic'}
                >
                  {Object.entries(series).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={downloadSummary}
                  disabled={!chartData.length}
                >
                  <FileDown className="h-4 w-4" /> Download Trace CSV
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Readout: What this chart can and cannot say */}
      <GlassCard tier="raised" className="p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
          Provenance Protocol
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-cream">
          What this visualization studio can and cannot claim
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-rose/30 bg-rose/[0.06] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-rose font-bold">
              Capabilities
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Demonstrates responsive crosshair inspection, SVG coordinate mapping, unit parsing, and CSV payload synthesis for illustrative baselines.
            </p>
          </div>

          <div className="rounded-2xl border border-amber/30 bg-amber/[0.06] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber font-bold">
              Boundaries
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Flight-grade claims require primary raw sensor exports from the NASA Physical Sciences Informatics archive, not catalog summaries.
            </p>
          </div>

          <div className="rounded-2xl border border-mauve/40 bg-mauve/[0.1] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-cream font-bold">
              Next Step
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Drop your own documented tabular observations into the Data Laboratory to generate full multi-channel telemetry graphs.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
