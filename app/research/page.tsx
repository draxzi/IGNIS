'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Card, CardContent, Input, Select } from '@/components/ui';
import { datasetStatus, recordKind, researchRecords, type ResearchCategory } from '@/lib/research';

const categories: ('All' | ResearchCategory)[] = ['All', 'Foundations', 'Droplet combustion', 'Flame propagation', 'Flame suppression', 'Smoke & soot', 'Spacecraft fire safety'];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | ResearchCategory>('All');
  const filtered = useMemo(() => researchRecords.filter((record) => {
    const haystack = [record.title, record.description, record.sourceOrg, record.category, record.parameters.join(' '), recordKind(record), datasetStatus(record)].join(' ').toLowerCase();
    return (category === 'All' || record.category === category) && haystack.includes(query.toLowerCase().trim());
  }), [category, query]);

  return <>
    <SectionHeader eyebrow="02 / source library" title="Research Explorer" description="Search a compact, verified NASA-linked index of microgravity combustion investigations. Each card distinguishes an overview, experiment description, dataset metadata or publication from an actual downloadable measurement set." status="Sources online" />
    <Card className="mb-5"><CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_220px_auto] md:items-center"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted" /><Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search fuel, flame, soot, safety…" aria-label="Search research records" /></div><Select value={category} onChange={(event) => setCategory(event.target.value as 'All' | ResearchCategory)} aria-label="Filter by category">{categories.map((item) => <option key={item}>{item}</option>)}</Select><div className="flex items-center gap-2 px-1 text-xs text-muted"><Filter className="h-4 w-4 text-cyan" /><span><strong className="text-white">{filtered.length}</strong> of {researchRecords.length} records</span></div></CardContent></Card>

    {filtered.length === 0 ? <Card><CardContent className="py-16 text-center"><SlidersHorizontal className="mx-auto h-7 w-7 text-muted" /><p className="mt-4 text-sm font-semibold text-white">No records match the current filters</p><p className="mt-2 text-sm text-muted">Try a broader term or reset the category filter.</p></CardContent></Card> : <div className="grid gap-4 xl:grid-cols-2">{filtered.map((record) => <Card key={record.id} className="group transition hover:border-cyan/30"><CardContent><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex flex-wrap gap-2"><Badge tone="cyan">{record.category}</Badge><Badge tone="blue">{recordKind(record)}</Badge></div><span className="font-mono text-[10px] text-muted/60">{record.id}</span></div><h2 className="mt-5 text-lg font-semibold leading-6 text-white group-hover:text-cyan">{record.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{record.description}</p><div className="mt-5 grid gap-4 border-t border-line/70 pt-4 sm:grid-cols-2"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70">Source</p><p className="mt-1 text-xs text-slate-200">{record.sourceOrg}</p>{record.date ? <p className="mt-1 font-mono text-[10px] text-muted">{record.date}</p> : null}</div><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70">Data availability</p><p className="mt-1 text-xs leading-5 text-amber-100/75">{datasetStatus(record)}</p></div></div><div className="mt-4"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70">Documented parameters</p><div className="mt-2 flex flex-wrap gap-1.5">{record.parameters.map((parameter) => <span key={parameter} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[10px] text-muted">{parameter}</span>)}</div></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4"><p className="max-w-md text-[11px] leading-5 text-muted/80"><span className="font-semibold text-amber">Limit:</span> {record.limitation}</p><a href={record.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:text-white">Open original <ExternalLink className="h-3.5 w-3.5" /></a></div></CardContent></Card>)}</div>}
  </>;
}
