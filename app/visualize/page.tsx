'use client';

import { useMemo, useState } from 'react';
import { Download, Eye, FileDown, Info } from 'lucide-react';
import { TelemetryChart } from '@/components/charts';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Card, CardContent, CardHeader, EmptyState, Select } from '@/components/ui';
import { datasetStatus, researchRecords, syntheticSeries } from '@/lib/research';

const series = {
  temperature_k: { label: 'Temperature (K)', color: '#F3A65B', unit: 'K' },
  flame_radius_mm: { label: 'Flame radius (mm)', color: '#D1A9A7', unit: 'mm' },
  oxygen_pct: { label: 'Oxygen concentration (%)', color: '#C28DAF', unit: '%' },
};

export default function VisualizePage() {
  const [metric, setMetric] = useState<keyof typeof series>('temperature_k');
  const [sourceFilter, setSourceFilter] = useState('synthetic');
  const selectedRecord = useMemo(() => researchRecords.find((record) => record.id === sourceFilter), [sourceFilter]);
  const chartData = useMemo(() => sourceFilter === 'synthetic' ? syntheticSeries.map((point) => ({ time_s: point.time_s, [metric]: point[metric] })) : [], [metric, sourceFilter]);

  function downloadSummary() {
    if (!chartData.length) return;
    const rows = [`source,metric,unit`, `Synthetic demonstration,${series[metric].label},${series[metric].unit}`, ...chartData.map((point) => `${point.time_s},${point[metric]}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `ignis-${metric}.csv`; anchor.click(); URL.revokeObjectURL(url);
  }

  return <>
    <SectionHeader eyebrow="07 / visualization bay" title="Scientific Visualization Studio" description="Choose a source, then chart only an attached measurement series. The current NASA-linked records are metadata or descriptions, so the studio shows a transparent empty state instead of substituting synthetic values." status="Provenance visible" action={<Button onClick={downloadSummary} disabled={!chartData.length}><Download className="h-4 w-4" /> Export summary</Button>} />
    <section className="grid gap-5 xl:grid-cols-[1fr_310px]">
      <Card><CardHeader><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Time-series channel</p><h2 className="mt-2 text-lg font-semibold text-white">{sourceFilter === 'synthetic' ? 'Synthetic combustion trace' : selectedRecord?.title ?? 'Selected source'}</h2></div><Badge tone={sourceFilter === 'synthetic' ? 'amber' : 'blue'}>{sourceFilter === 'synthetic' ? 'Illustrative' : 'No attached series'}</Badge></div></CardHeader><CardContent>{sourceFilter === 'synthetic' ? <><div className="mb-5 flex flex-wrap items-center gap-3"><Badge tone="amber"><Info className="h-3 w-3" /> Source: local synthetic demo</Badge><span className="text-xs text-muted">x: time (s) · y: {series[metric].label}</span></div><TelemetryChart data={chartData as unknown as Record<string, unknown>[]} xKey="time_s" xLabel="time (s)" yLabel={series[metric].unit} lines={[{ key: metric, label: series[metric].label, color: series[metric].color }]} height={360} /><div className="mt-5 flex items-center gap-2 text-xs text-muted"><Eye className="h-4 w-4 text-cyan" /> Hover the line to inspect each point. Synthetic values are not NASA measurements.</div></> : <EmptyState title="No downloadable measurement series is attached" body={`${selectedRecord?.title ?? 'This source'} is represented by ${selectedRecord ? datasetStatus(selectedRecord).toLowerCase() : 'source metadata'}. Open the original record or upload a documented CSV in the Data Laboratory before plotting it.`} action={selectedRecord ? <a href={selectedRecord.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-xl border border-line px-3.5 text-sm font-semibold text-white hover:border-cyan/40">Open original source</a> : null} />}</CardContent></Card>
      <Card className="h-fit"><CardHeader><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Controls</p><h2 className="mt-2 text-lg font-semibold text-white">Change the source lens</h2></CardHeader><CardContent className="space-y-5"><div><label htmlFor="visualize-source" className="mb-2 block text-xs text-muted">Research / dataset source</label><Select id="visualize-source" value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}><option value="synthetic">Synthetic demonstration</option>{researchRecords.map((record) => <option key={record.id} value={record.id}>{record.title}</option>)}</Select><p className="mt-2 text-[11px] leading-5 text-muted">This filter is functional: source records without attached measurement rows produce an empty state rather than an invented chart.</p></div><div><label htmlFor="visualize-metric" className="mb-2 block text-xs text-muted">Metric</label><Select id="visualize-metric" value={metric} onChange={(event) => setMetric(event.target.value as keyof typeof series)} disabled={sourceFilter !== 'synthetic'}>{Object.entries(series).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</Select></div><Button variant="secondary" className="w-full" onClick={downloadSummary} disabled={!chartData.length}><FileDown className="h-4 w-4" /> Download CSV summary</Button></CardContent></Card>
    </section>
    <Card className="mt-5"><CardHeader><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Readout</p><h2 className="mt-2 text-lg font-semibold text-white">What this chart can and cannot say</h2></CardHeader><CardContent className="grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4"><p className="text-sm font-semibold text-emerald-200">Can do</p><p className="mt-2 text-xs leading-5 text-muted">Demonstrate the visualization workflow, units, legends, hover inspection and export for the labelled sample.</p></div><div className="rounded-xl border border-amber/20 bg-amber/[0.05] p-4"><p className="text-sm font-semibold text-amber-100">Needs data</p><p className="mt-2 text-xs leading-5 text-muted">A NASA experiment claim needs the original dataset or documented measurement table, not a source description.</p></div><div className="rounded-xl border border-cyan/20 bg-cyan/[0.05] p-4"><p className="text-sm font-semibold text-cyan">Next step</p><p className="mt-2 text-xs leading-5 text-muted">Upload a compatible CSV in the Data Laboratory to chart your own documented observations.</p></div></CardContent></Card>
  </>;
}
