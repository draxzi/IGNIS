'use client';

import { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Download,
  Info,
  RotateCcw,
  Table2,
  UploadCloud,
  FileSpreadsheet,
  ArrowUpDown,
  FileText,
  Activity,
} from 'lucide-react';
import { TelemetryChart } from '@/components/charts';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Input, Select } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import {
  csvFromRows,
  detectColumn,
  parseCsv,
  toChartRows,
  type ParsedDataset,
} from '@/lib/data-utils';

const sampleCsv = `time_s,temperature_k,flame_radius_mm,oxygen_pct\n0,410,2.4,21.0\n5,660,3.3,20.4\n10,910,4.2,19.7\n15,1130,5.0,19.1\n20,1270,5.7,18.6\n25,1320,6.1,18.2\n30,1335,6.2,17.9\n35,1324,6.1,17.7\n40,1302,5.9,17.5`;
const initialDataset = parseCsv(sampleCsv, 'Synthetic demonstration CSV');

export default function LabPage() {
  const [dataset, setDataset] = useState<ParsedDataset>(initialDataset);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'statistics' | 'charts' | 'export'>('preview');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const numericColumns = dataset.columnsInfo
    .filter((column) => column.kind === 'numeric')
    .map((column) => column.name);

  const xDefault =
    detectColumn(dataset.columns, ['time', 'duration', 'frame', 'step']) ??
    numericColumns[0];
  const yDefault =
    detectColumn(dataset.columns, ['temperature', 'radius', 'oxygen', 'heat']) ??
    numericColumns[1];

  const [xColumn, setXColumn] = useState<string | undefined>(xDefault);
  const [yColumn, setYColumn] = useState<string | undefined>(yDefault);

  // Sorting and filtering
  const visibleRows = useMemo(() => {
    let result = dataset.rows.filter(
      (row) =>
        !filter ||
        Object.values(row).some((val) =>
          String(val ?? '').toLowerCase().includes(filter.toLowerCase())
        )
    );

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA === valB) return 0;
        if (valA === null) return 1;
        if (valB === null) return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [dataset.rows, filter, sortColumn, sortAsc]);

  const chartData = toChartRows(visibleRows, xColumn, yColumn).map((row) => ({
    x: row.x,
    y: row.y,
  }));

  function handleSort(col: string) {
    if (sortColumn === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(col);
      setSortAsc(true);
    }
  }

  function loadDataset(text: string, label: string) {
    const next = parseCsv(text, label);
    if (next.columns.length === 0 || next.rows.length === 0) {
      setError('The CSV needs a header row and at least one data row.');
      return;
    }
    setError('');
    setDataset(next);
    setFilter('');
    const nextNumeric = next.columnsInfo
      .filter((column) => column.kind === 'numeric')
      .map((column) => column.name);
    setXColumn(
      detectColumn(next.columns, ['time', 'duration', 'frame', 'step']) ??
        nextNumeric[0]
    );
    setYColumn(
      detectColumn(next.columns, ['temperature', 'radius', 'oxygen', 'heat']) ??
        nextNumeric[1]
    );
  }

  async function handleFile(file: File) {
    if (file.size > 2 * 1024 * 1024) {
      setError('For safe client-side processing, CSV files are limited to 2 MB.');
      return;
    }
    loadDataset(await file.text(), file.name);
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function downloadCsv() {
    const blob = new Blob([csvFromRows(dataset.columns, visibleRows)], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'ignis-analysis.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="03 / analysis bay"
        title="Combustion Data Laboratory"
        description="Ingest observation CSVs, diagnose telemetry columns, and plot signals without data leaving your browser sandbox. The default dataset is an illustrative microgravity baseline."
        status="Browser Analysis"
        action={
          <div className="flex gap-2">
            <input
              ref={inputRef}
              onChange={onFileInput}
              type="file"
              accept=".csv,text/csv"
              aria-label="Upload CSV file"
              className="sr-only"
            />
            <Button onClick={() => inputRef.current?.click()} variant="primary">
              <UploadCloud className="h-4 w-4" /> Upload CSV
            </Button>
          </div>
        }
      />

      {/* Error alert */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-2xl border border-amber/40 bg-amber/15 px-5 py-3 text-sm text-amber shadow-[0_0_20px_rgba(243,166,91,0.2)]"
        >
          <Info className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Source Banner & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose/15 bg-[rgba(36,16,47,0.5)] p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">
            <Info className="h-3 w-3" /> {dataset.sourceLabel}
          </Badge>
          <span className="font-mono text-xs text-muted">
            All parsing is strictly offline and private to this device.
          </span>
        </div>
        <Button
          variant="ghost"
          className="min-h-8 text-xs text-rose hover:text-cream"
          onClick={() => loadDataset(sampleCsv, 'Synthetic demonstration CSV')}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset synthetic sample
        </Button>
      </div>

      {/* Docking Port Drag-and-Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center cursor-pointer rounded-[28px] border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-rose bg-rose/10 shadow-[0_0_40px_rgba(209,169,167,0.35)] scale-[1.01]'
            : 'border-cosmic bg-[rgba(36,16,47,0.35)] hover:border-rose/50 hover:bg-rose/[0.04]'
        }`}
      >
        {/* Pulsing Concentric Rings */}
        <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-rose/20 animate-ping opacity-50" />
          <div className="absolute inset-2 rounded-full border border-cosmic animate-pulse" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose/40 bg-rose/15 text-rose">
            <UploadCloud className="h-6 w-6" />
          </div>
        </div>

        <p className="font-display text-base font-bold text-cream">
          CSV Analysis Docking Port
        </p>
        <p className="mt-1 max-w-sm text-xs text-muted">
          Drag and drop your experiment CSV file here, or click to browse. Max size 2 MB.
        </p>
        <span className="mt-3 rounded border border-cosmic bg-void/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-rose">
          Standard RFC 4180 CSV Compliant
        </span>
      </div>

      {/* Tabs Navigation: Preview / Statistics / Charts / Export */}
      <div className="flex border-b border-cosmic/70 pb-1 gap-2">
        {(
          [
            { id: 'preview', label: 'Preview Table', icon: Table2 },
            { id: 'statistics', label: 'Diagnostics & Stats', icon: Activity },
            { id: 'charts', label: 'Telemetry Plot', icon: BarChart3 },
            { id: 'export', label: 'Export Suite', icon: Download },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                isActive
                  ? 'border border-rose/30 bg-rose/15 text-cream font-semibold shadow-[0_0_12px_rgba(209,169,167,0.2)]'
                  : 'text-muted hover:text-cream'
              }`}
            >
              <Icon className="h-3.5 w-3.5 text-rose" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Preview Table */}
      {activeTab === 'preview' && (
        <GlassCard tier="raised" className="p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-bold text-cream">
                {dataset.rows.length} rows · {dataset.columns.length} columns
              </span>
              <Badge tone="rose">{visibleRows.length} visible</Badge>
            </div>
            <div className="flex gap-2">
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter row contents..."
                className="max-w-xs text-xs"
              />
              <Button variant="secondary" onClick={downloadCsv}>
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-cosmic">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-void/60 text-[10px] uppercase tracking-wider text-muted font-mono sticky top-0">
                <tr>
                  {dataset.columns.map((column) => (
                    <th
                      key={column}
                      onClick={() => handleSort(column)}
                      className="cursor-pointer whitespace-nowrap px-4 py-3 hover:text-cream transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{column}</span>
                        <ArrowUpDown className="h-3 w-3 text-rose/60" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic/50 font-mono">
                {visibleRows.slice(0, 15).map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose/[0.03] transition-colors">
                    {dataset.columns.map((col) => (
                      <td key={col} className="whitespace-nowrap px-4 py-3 text-cream/90">
                        {row[col] === null ? (
                          <span className="text-amber">null</span>
                        ) : (
                          String(row[col])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibleRows.length > 15 && (
            <p className="mt-3 text-right font-mono text-[10px] text-muted">
              Displaying first 15 rows of {visibleRows.length} filtered entries.
            </p>
          )}
        </GlassCard>
      )}

      {/* Tab 2: Statistics & Column Diagnostics */}
      {activeTab === 'statistics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <GlassCard tier="raised" className="p-4 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                Total Rows
              </span>
              <p className="mt-2 font-display text-2xl font-bold text-cream">
                {dataset.rows.length}
              </p>
            </GlassCard>
            <GlassCard tier="raised" className="p-4 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                Numeric Channels
              </span>
              <p className="mt-2 font-display text-2xl font-bold text-rose">
                {numericColumns.length}
              </p>
            </GlassCard>
            <GlassCard tier="raised" className="p-4 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                Missing Values
              </span>
              <p className="mt-2 font-display text-2xl font-bold text-amber">
                {dataset.columnsInfo.reduce((sum, col) => sum + col.missing, 0)}
              </p>
            </GlassCard>
            <GlassCard tier="raised" className="p-4 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                Invalid / Mixed
              </span>
              <p className="mt-2 font-display text-2xl font-bold text-muted">
                {dataset.columnsInfo.reduce((sum, col) => sum + col.invalid, 0)}
              </p>
            </GlassCard>
          </div>

          <GlassCard tier="raised" className="p-6">
            <h3 className="font-display text-base font-bold text-cream mb-4">
              Column Integrity Diagnostics
            </h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dataset.columnsInfo.map((info) => (
                <div
                  key={info.name}
                  className="rounded-2xl border border-cosmic bg-void/50 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-mono text-xs font-semibold text-cream">
                      {info.name}
                    </span>
                    {info.missing === 0 && info.invalid === 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-rose" />
                    ) : (
                      <span className="font-mono text-[10px] text-amber">
                        {info.missing > 0 ? `${info.missing} missing` : `${info.invalid} invalid`}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="rounded bg-rose/10 px-1.5 py-0.5 font-mono text-[9px] uppercase text-rose">
                      {info.kind}
                    </span>
                  </div>
                  {info.kind === 'numeric' && (
                    <div className="mt-2 font-mono text-[10px] text-muted">
                      Mean: {info.mean?.toFixed(2)} · Range: [{info.min} - {info.max}]
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Tab 3: Charts */}
      {activeTab === 'charts' && (
        <GlassCard tier="raised" className="p-6">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lab-x-axis" className="mb-1 block font-mono text-[10px] uppercase text-muted">
                X Axis (Independent Variable)
              </label>
              <Select
                id="lab-x-axis"
                value={xColumn ?? ''}
                onChange={(e) => setXColumn(e.target.value)}
              >
                {numericColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="lab-y-axis" className="mb-1 block font-mono text-[10px] uppercase text-muted">
                Y Axis (Observed Signal)
              </label>
              <Select
                id="lab-y-axis"
                value={yColumn ?? ''}
                onChange={(e) => setYColumn(e.target.value)}
              >
                {numericColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <TelemetryChart
            data={chartData as unknown as Record<string, unknown>[]}
            xKey="x"
            xLabel={xColumn}
            yLabel={yColumn}
            lines={[
              {
                key: 'y',
                label: `${yColumn ?? 'value'} · detected`,
                color: '#F3A65B',
              },
            ]}
            height={340}
          />
        </GlassCard>
      )}

      {/* Tab 4: Export Suite */}
      {activeTab === 'export' && (
        <GlassCard tier="raised" className="p-8 text-center max-w-xl mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-4">
            <Download className="h-7 w-7" />
          </div>
          <h3 className="font-display text-lg font-bold text-cream">
            Export Processed Experiment Data
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Generate an offline CSV file containing the active filtered dataset and cleaned telemetry columns.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={downloadCsv} className="min-h-11 px-6">
              <Download className="h-4 w-4" /> Export CSV ({visibleRows.length} rows)
            </Button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
