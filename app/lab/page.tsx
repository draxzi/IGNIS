'use client';

import { useMemo, useRef, useState } from 'react';
import { AlertTriangle, BarChart3, CheckCircle2, Download, Info, RotateCcw, Table2, UploadCloud } from 'lucide-react';
import { TelemetryChart } from '@/components/charts';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Card, CardContent, CardHeader, Input, Select } from '@/components/ui';
import { csvFromRows, detectColumn, parseCsv, toChartRows, type ParsedDataset } from '@/lib/data-utils';

const sampleCsv = `time_s,temperature_k,flame_radius_mm,oxygen_pct\n0,410,2.4,21.0\n5,660,3.3,20.4\n10,910,4.2,19.7\n15,1130,5.0,19.1\n20,1270,5.7,18.6\n25,1320,6.1,18.2\n30,1335,6.2,17.9\n35,1324,6.1,17.7\n40,1302,5.9,17.5`;
const initialDataset = parseCsv(sampleCsv, 'Synthetic demonstration CSV');

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="rounded-xl border border-line bg-ink/35 p-3"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/70">{label}</p><p className="mt-2 text-xl font-semibold text-white">{value}</p><p className="mt-1 text-[10px] text-muted">{detail}</p></div>; }

export default function LabPage() {
  const [dataset, setDataset] = useState<ParsedDataset>(initialDataset);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const numericColumns = dataset.columnsInfo.filter((column) => column.kind === 'numeric').map((column) => column.name);
  const xDefault = detectColumn(dataset.columns, ['time', 'duration', 'frame', 'step']) ?? numericColumns[0];
  const yDefault = detectColumn(dataset.columns, ['temperature', 'radius', 'oxygen', 'heat']) ?? numericColumns[1];
  const [xColumn, setXColumn] = useState<string | undefined>(xDefault);
  const [yColumn, setYColumn] = useState<string | undefined>(yDefault);
  const visibleRows = useMemo(() => dataset.rows.filter((row) => !filter || Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(filter.toLowerCase()))), [dataset.rows, filter]);
  const chartData = toChartRows(visibleRows, xColumn, yColumn).map((row) => ({ x: row.x, y: row.y }));

  function loadDataset(text: string, label: string) {
    const next = parseCsv(text, label);
    if (next.columns.length === 0 || next.rows.length === 0) { setError('The CSV needs a header row and at least one data row.'); return; }
    setError(''); setDataset(next); setFilter('');
    const nextNumeric = next.columnsInfo.filter((column) => column.kind === 'numeric').map((column) => column.name);
    setXColumn(detectColumn(next.columns, ['time', 'duration', 'frame', 'step']) ?? nextNumeric[0]);
    setYColumn(detectColumn(next.columns, ['temperature', 'radius', 'oxygen', 'heat']) ?? nextNumeric[1]);
  }

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('For safe browser analysis, CSV files are limited to 2 MB.'); return; }
    loadDataset(await file.text(), file.name);
  }

  function downloadCsv() {
    const blob = new Blob([csvFromRows(dataset.columns, visibleRows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'ignis-analysis.csv'; anchor.click(); URL.revokeObjectURL(url);
  }

  return <>
    <SectionHeader eyebrow="03 / analysis bay" title="Combustion Data Lab" description="Upload a CSV, inspect its structure and plot only the columns that actually exist. The default sample is synthetic so the workflow is usable without NASA credentials or a database." status="Browser analysis" action={<><input ref={inputRef} onChange={onFile} type="file" accept=".csv,text/csv" aria-label="Upload CSV file" className="sr-only" /><Button onClick={() => inputRef.current?.click()}><UploadCloud className="h-4 w-4" /> Upload CSV</Button></>} />
    {error ? <div role="alert" className="mb-5 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100"><Info className="h-4 w-4 shrink-0" />{error}</div> : null}
    <div className="mb-5 flex flex-wrap items-center gap-2"><Badge tone="amber"><Info className="h-3 w-3" />{dataset.sourceLabel}</Badge><span className="text-xs text-muted">No upload leaves the browser; parsing is local.</span><Button variant="ghost" className="ml-auto min-h-8 px-2.5 text-xs" onClick={() => loadDataset(sampleCsv, 'Synthetic demonstration CSV')}><RotateCcw className="h-3.5 w-3.5" /> Reset sample</Button></div>
    {dataset.warnings.length > 0 ? <div className="mb-5 rounded-xl border border-amber/25 bg-amber/[0.07] px-4 py-3 text-xs leading-5 text-amber-100"><div className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" /> Parser warnings</div><ul className="mt-2 list-disc space-y-1 pl-5 text-amber-100/75">{dataset.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></div> : null}
    <section className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <Card><CardHeader><div className="flex items-center justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Dataset preview</p><h2 className="mt-2 text-lg font-semibold text-white">{dataset.rows.length} rows · {dataset.columns.length} columns</h2></div><Table2 className="h-5 w-5 text-cyan" /></div></CardHeader><CardContent><div className="mb-4 grid gap-3 sm:grid-cols-4"><Stat label="Rows" value={dataset.rows.length.toString()} detail="retained for analysis" /><Stat label="Numeric" value={numericColumns.length.toString()} detail="detected channels" /><Stat label="Missing" value={dataset.columnsInfo.reduce((sum, info) => sum + info.missing, 0).toString()} detail="blank cells" /><Stat label="Invalid" value={dataset.columnsInfo.reduce((sum, info) => sum + info.invalid, 0).toString()} detail="mixed-column cells" /></div><div className="mb-4 flex gap-3"><Input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter visible rows…" aria-label="Filter dataset rows" /><Button variant="secondary" onClick={downloadCsv}><Download className="h-4 w-4" /> Export</Button></div><div className="scrollbar-thin overflow-x-auto rounded-xl border border-line"><table className="min-w-full text-left text-xs"><thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-muted"><tr>{dataset.columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-3">{column}</th>)}</tr></thead><tbody className="divide-y divide-line/60">{visibleRows.slice(0, 12).map((row, index) => <tr key={index} className="hover:bg-white/[0.025]">{dataset.columns.map((column) => <td key={column} className="whitespace-nowrap px-3 py-3 font-mono text-slate-300">{row[column] === null ? <span className="text-amber">null</span> : String(row[column])}</td>)}</tr>)}</tbody></table></div>{visibleRows.length > 12 ? <p className="mt-3 text-xs text-muted">Preview shows the first 12 visible rows.</p> : null}</CardContent></Card>
      <Card><CardHeader><div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Relevant visualization</p><h2 className="mt-2 text-lg font-semibold text-white">One signal at a time</h2></div><BarChart3 className="h-5 w-5 text-amber" /></div></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2"><div><label htmlFor="lab-x-axis" className="mb-2 block text-xs text-muted">X axis</label><Select id="lab-x-axis" value={xColumn ?? ''} onChange={(event) => setXColumn(event.target.value)}>{numericColumns.map((column) => <option key={column}>{column}</option>)}</Select></div><div><label htmlFor="lab-y-axis" className="mb-2 block text-xs text-muted">Y axis</label><Select id="lab-y-axis" value={yColumn ?? ''} onChange={(event) => setYColumn(event.target.value)}>{numericColumns.map((column) => <option key={column}>{column}</option>)}</Select></div></div><div className="mt-5"><TelemetryChart data={chartData as unknown as Record<string, unknown>[]} xKey="x" lines={[{ key: 'y', label: `${yColumn ?? 'value'} · detected`, color: '#f3b25b' }]} xLabel={xColumn} yLabel={yColumn} /></div><p className="mt-2 text-[11px] leading-5 text-muted">IGNIS does not invent a series when a relevant column is absent. Use the selectors to inspect documented columns.</p></CardContent></Card>
    </section>
    <Card className="mt-5"><CardHeader><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Validation readout</p><h2 className="mt-2 text-lg font-semibold text-white">Column quality</h2></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{dataset.columnsInfo.map((info) => <div key={info.name} className="rounded-xl border border-line bg-ink/35 p-3"><div className="flex items-center justify-between gap-3"><span className="truncate font-mono text-xs text-white">{info.name}</span>{info.missing === 0 && info.invalid === 0 ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <span className="font-mono text-[10px] text-amber">{info.missing > 0 ? `${info.missing} missing` : `${info.invalid} invalid`}</span>}</div><p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-muted">{info.kind} column</p>{info.kind === 'numeric' ? <p className="mt-2 font-mono text-[10px] text-muted">mean {info.mean?.toFixed(2)} · {info.min}–{info.max}</p> : info.kind === 'mixed' ? <p className="mt-2 font-mono text-[10px] text-amber/80">numeric charts exclude text cells</p> : null}</div>)}</div></CardContent></Card>
  </>;
}
