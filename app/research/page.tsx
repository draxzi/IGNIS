'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  FileSearch,
  AlertTriangle,
  Info,
  Calendar,
  Building,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Input } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import {
  datasetStatus,
  recordKind,
  researchRecords,
  type ResearchCategory,
  type ResearchRecord,
} from '@/lib/research';

const categories: ('All' | ResearchCategory)[] = [
  'All',
  'Foundations',
  'Droplet combustion',
  'Flame propagation',
  'Flame suppression',
  'Smoke & soot',
  'Spacecraft fire safety',
];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ResearchCategory>('All');
  const [activeDrawerRecord, setActiveDrawerRecord] = useState<ResearchRecord | null>(null);

  const filtered = useMemo(() => {
    return researchRecords.filter((record) => {
      const haystack = [
        record.id,
        record.title,
        record.description,
        record.sourceOrg,
        record.category,
        record.parameters.join(' '),
        recordKind(record),
        datasetStatus(record),
      ]
        .join(' ')
        .toLowerCase();

      const matchesCat =
        selectedCategory === 'All' || record.category === selectedCategory;
      const matchesQuery = haystack.includes(query.toLowerCase().trim());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="02 / source library"
        title="Research Explorer"
        description="Search a compact, verified index of NASA microgravity combustion investigations. Each record clearly delineates between overviews, experiment specs, dataset metadata, and flight publications."
        status="Sources Online"
      />

      {/* Sticky Glass Search & Filter Bar */}
      <div className="sticky top-18 z-20 rounded-[24px] border border-rose/20 bg-[rgba(36,16,47,0.75)] p-4 shadow-panel backdrop-blur-2xl">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-rose" />
            <Input
              className="pl-10 text-xs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fuel, flame, soot, safety, suppression..."
              aria-label="Search research records"
            />
          </div>

          {/* Records Counter */}
          <div className="flex items-center gap-2 px-2 font-mono text-xs text-muted">
            <Filter className="h-4 w-4 text-rose" />
            <span>
              <strong className="text-cream">{filtered.length}</strong> of{' '}
              {researchRecords.length} records
            </span>
          </div>
        </div>

        {/* Animated Category Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-cosmic/50">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-xl px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-150 ${
                  isSelected ? 'text-void font-semibold' : 'text-muted hover:text-cream'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="category-chip-active"
                    className="absolute inset-0 rounded-xl bg-rose shadow-[0_0_12px_rgba(209,169,167,0.3)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid with Animated List Reordering */}
      {filtered.length === 0 ? (
        <GlassCard tier="raised" className="py-16 text-center">
          <SlidersHorizontal className="mx-auto h-8 w-8 text-rose" />
          <p className="mt-4 font-display text-base font-semibold text-cream">
            No records match the current filters
          </p>
          <p className="mt-2 text-xs text-muted">
            Try a broader keyword or reset the category filter.
          </p>
          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </Button>
        </GlassCard>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filtered.map((record) => (
              <motion.div
                key={record.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard
                  tier="raised"
                  spotlight={true}
                  className="flex flex-col justify-between p-6 h-full cursor-pointer hover:border-rose/30"
                  onClick={() => setActiveDrawerRecord(record)}
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cosmic/50 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge tone="rose">{record.category}</Badge>
                        <Badge tone="mauve">{recordKind(record)}</Badge>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted/70">
                        {record.id}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 font-display text-lg font-bold text-cream group-hover:text-rose transition-colors">
                      {record.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                      {record.description}
                    </p>

                    {/* Source & Availability Details */}
                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-cosmic/50 pt-3">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted/70">
                          Source
                        </span>
                        <p className="mt-0.5 text-xs text-cream/90">{record.sourceOrg}</p>
                        {record.date && (
                          <p className="mt-0.5 font-mono text-[10px] text-muted">
                            {record.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted/70">
                          Data Availability
                        </span>
                        <p className="mt-0.5 text-xs text-amber leading-tight">
                          {datasetStatus(record)}
                        </p>
                      </div>
                    </div>

                    {/* Documented Parameter Tags */}
                    <div className="mt-4">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted/70">
                        Documented Parameters
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {record.parameters.map((param) => (
                          <span
                            key={param}
                            className="rounded-lg border border-cosmic bg-void/50 px-2 py-0.5 font-mono text-[9px] text-muted"
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Limitation Note & Links */}
                  <div className="mt-6 border-t border-cosmic/50 pt-4">
                    <p className="text-[11px] leading-relaxed text-amber/90">
                      <span className="font-semibold uppercase tracking-wider font-mono">
                        Limit:
                      </span>{' '}
                      {record.limitation}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose">
                        Inspect details →
                      </span>
                      <a
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose hover:underline"
                      >
                        Original <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Slide-over Glass Detail Drawer */}
      <AnimatePresence>
        {activeDrawerRecord && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDrawerRecord(null)}
              className="fixed inset-0 bg-void/70 backdrop-blur-sm"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative z-10 w-full max-w-lg border-l border-rose/25 bg-[rgba(36,16,47,0.92)] p-6 sm:p-8 shadow-[0_0_80px_rgba(8,0,14,0.9)] backdrop-blur-3xl overflow-y-auto scrollbar-thin"
            >
              {/* Drawer Close Button */}
              <div className="flex items-center justify-between border-b border-cosmic/60 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                  RECORD DOSSIER · {activeDrawerRecord.id}
                </span>
                <button
                  onClick={() => setActiveDrawerRecord(null)}
                  className="rounded-lg border border-cosmic p-1.5 text-muted hover:border-rose/50 hover:text-cream transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="rose">{activeDrawerRecord.category}</Badge>
                    <Badge tone="mauve">{recordKind(activeDrawerRecord)}</Badge>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-cream">
                    {activeDrawerRecord.title}
                  </h2>
                </div>

                <div className="rounded-xl border border-cosmic bg-void/50 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-cream">
                    <Building className="h-4 w-4 text-rose" />
                    <span>{activeDrawerRecord.sourceOrg}</span>
                  </div>
                  {activeDrawerRecord.date && (
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Calendar className="h-4 w-4 text-rose" />
                      <span>Published / Documented: {activeDrawerRecord.date}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-amber">
                    <Info className="h-4 w-4 text-amber" />
                    <span>{datasetStatus(activeDrawerRecord)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                    Executive Summary
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {activeDrawerRecord.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                    Documented Physical Parameters
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeDrawerRecord.parameters.map((param) => (
                      <span
                        key={param}
                        className="rounded-xl border border-cosmic bg-void/60 px-3 py-1 font-mono text-xs text-cream"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber/30 bg-amber/[0.08] p-4 text-xs leading-relaxed text-amber shadow-[0_0_15px_rgba(243,166,91,0.1)]">
                  <div className="flex items-center gap-2 font-mono font-semibold uppercase tracking-wider text-amber mb-1">
                    <AlertTriangle className="h-4 w-4" /> Integrity Limitation Note
                  </div>
                  {activeDrawerRecord.limitation}
                </div>

                <div className="border-t border-cosmic/60 pt-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                    Formal Citation
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted/80">
                    {activeDrawerRecord.citation}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={activeDrawerRecord.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button variant="primary" className="w-full min-h-11">
                      Open Verified NASA Record <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
