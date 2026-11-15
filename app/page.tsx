'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Database,
  FileSearch,
  Flame,
  Layers3,
  LockKeyhole,
  MousePointer2,
  ShieldCheck,
} from 'lucide-react';
import { CategoryChart, TelemetryChart } from '@/components/charts';
import { IgnisMark } from '@/components/icons';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, ProgressBar } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import { FlameWindow } from '@/components/flame-window';
import { Marquee } from '@/components/marquee';
import { CountUp } from '@/components/count-up';
import {
  categoryCounts,
  recentRecords,
  researchRecords,
  syntheticSeries,
} from '@/lib/research';

const categoryData = Object.entries(categoryCounts).map(([category, count]) => ({
  category,
  count,
}));

const stats = [
  {
    label: 'Curated research records',
    value: researchRecords.length,
    isNumeric: true,
    detail: 'NASA-linked source entries',
    icon: FileSearch,
    tone: 'rose' as const,
  },
  {
    label: 'Research categories',
    value: Object.keys(categoryCounts).length,
    isNumeric: true,
    detail: 'Across the local index',
    icon: Layers3,
    tone: 'mauve' as const,
  },
  {
    label: 'Demo data channels',
    value: 4,
    isNumeric: true,
    detail: 'Synthetic / illustrative',
    icon: Database,
    tone: 'amber' as const,
  },
  {
    label: 'Account required',
    value: 'NO',
    isNumeric: false,
    detail: 'Runs in local mode',
    icon: LockKeyhole,
    tone: 'rose' as const,
  },
];

const headlineWords = [
  { text: 'Understanding', isAmber: false },
  { text: 'fire', isAmber: false },
  { text: 'beyond', isAmber: true },
  { text: 'gravity.', isAmber: true },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* =========================================================================
          SIGNATURE HERO: THE FLAME IN FREEFALL
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-[32px] border border-rose/20 bg-[rgba(36,16,47,0.45)] p-6 sm:p-10 lg:p-14 shadow-panel backdrop-blur-2xl">
        {/* Subtle decorative inner corner accent */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-mauve/[0.08] blur-3xl" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Eyebrow, Masked Staggered Headline, Subtext, CTAs */}
          <div className="max-w-2xl">
            {/* Eyebrow & Flame Badge */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge tone="rose">
                <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
                INTELLIGENT GUIDANCE &amp; NASA INSIGHTS SYSTEM
              </Badge>
              <Badge tone="amber">
                <Flame className="h-3 w-3" /> Flame in Freefall
              </Badge>
            </div>

            {/* Giant Headline with masked, staggered word-by-word reveal */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-[clamp(2.75rem,5.5vw,5.5rem)] lg:leading-[1.05]">
              {headlineWords.map((word, i) => (
                <span
                  key={word.text}
                  className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0 align-bottom"
                >
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${
                      word.isAmber
                        ? 'text-amber drop-shadow-[0_0_24px_rgba(243,166,91,0.4)]'
                        : 'text-cream'
                    }`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
              A premium research cockpit for discovering, comparing and interpreting
              microgravity combustion phenomena. Grounded in primary NASA records.
              Observe how suppressing buoyant convection reshapes the thermodynamics of flame.
            </p>

            {/* Two CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/research">
                <Button variant="primary" className="min-h-12 px-6 text-sm">
                  Explore research <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/lab">
                <Button variant="secondary" className="min-h-12 px-6 text-sm">
                  <MousePointer2 className="h-4 w-4 text-amber" /> Open data lab
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating 2D Flame Window Instrument */}
          <div className="flex justify-center lg:justify-end">
            <FlameWindow />
          </div>
        </div>

        {/* Below: 4 Glass Stat Cards with Count-up Animation */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={stat.label}
                tier="raised"
                className="p-5 border-rose/15 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Telemetry Spec
                  </span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                      stat.tone === 'amber'
                        ? 'border-amber/30 bg-amber/10 text-amber'
                        : 'border-rose/30 bg-rose/10 text-rose'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
                    {stat.isNumeric ? (
                      <CountUp value={stat.value as number} padZero={true} />
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs font-medium text-cream/90">{stat.label}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted/70">
                    {stat.detail}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Infinite NASA Programs Marquee Strip */}
      <Marquee />

      {/* =========================================================================
          SECTION 01: BENTO DASHBOARD
         ========================================================================= */}
      <div>
        <SectionHeader
          eyebrow="01 / overview"
          title="An evidence-first view of combustion in reduced gravity"
          description="The dashboard maintains transparent integrity: curated library records reference official NASA investigations; the illustrative telemetry series demonstrates real-time parameter analysis without inventing flight measurements."
          status="Local Mode Active"
        />

        {/* Bento Grid Layer 1: Distribution Chart & Telemetry Signal */}
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          {/* Card 1: Category Distribution */}
          <GlassCard tier="raised" className="p-6">
            <div className="flex items-start justify-between gap-4 border-b border-cosmic/60 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                  Indexed Record Distribution
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-cream">
                  Where the current research library concentrates
                </h3>
              </div>
              <Badge tone="rose">{researchRecords.length} records</Badge>
            </div>

            <div className="mt-5">
              <CategoryChart data={categoryData} />
            </div>

            <div className="mt-4 rounded-xl border border-amber/25 bg-amber/[0.07] p-3 text-xs leading-relaxed text-amber shadow-[0_0_12px_rgba(243,166,91,0.08)]">
              <span className="font-semibold uppercase tracking-wider font-mono">
                Integrity Note:
              </span>{' '}
              Counts reflect the curated offline index, not the total NASA technical archives.
            </div>
          </GlassCard>

          {/* Card 2: Illustrative Telemetry Signal */}
          <GlassCard tier="raised" className="p-6">
            <div className="flex items-start justify-between gap-4 border-b border-cosmic/60 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                  Illustrative Signal Analysis
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-cream">
                  Temperature and flame radius
                </h3>
              </div>
              <Badge tone="amber">Synthetic</Badge>
            </div>

            <div className="mt-5">
              <TelemetryChart
                data={syntheticSeries as unknown as Record<string, unknown>[]}
                xKey="time_s"
                xLabel="time (s)"
                yLabel="value"
                lines={[
                  { key: 'temperature_k', label: 'Temperature (K)', color: '#F3A65B' },
                  { key: 'flame_radius_mm', label: 'Flame radius (mm)', color: '#D1A9A7' },
                ]}
              />
            </div>

            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
              Synthetic demonstration only · not NASA measurement data
            </p>
          </GlassCard>
        </div>

        {/* Bento Grid Layer 2: Recent Records & Research Posture */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Card 3: Recent Records */}
          <GlassCard tier="raised" className="p-6">
            <div className="flex items-center justify-between border-b border-cosmic/60 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                  Source Queue
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-cream">
                  Recently dated flight &amp; ground investigations
                </h3>
              </div>
              <Link
                href="/research"
                className="flex items-center gap-1 text-xs font-semibold text-rose hover:underline"
              >
                View library <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 space-y-2">
              {recentRecords.map((record) => (
                <Link
                  key={record.id}
                  href="/research"
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-rose/25 hover:bg-rose/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose/30 bg-rose/10 text-rose group-hover:scale-105 transition-transform">
                    <FileSearch className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-cream group-hover:text-rose transition-colors">
                      {record.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {record.sourceOrg} {record.date ? `· ${record.date}` : ''}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
                    {record.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted/50 group-hover:text-rose transition-colors" />
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* Card 4: Research Posture */}
          <GlassCard tier="raised" className="p-6">
            <div className="border-b border-cosmic/60 pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
                Research Posture
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-cream">
                Useful without overclaiming
              </h3>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose/30 bg-rose/10 text-rose">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">Sources stay visible</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Every library record carries its original reference, documented limits and
                    availability classification.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="text-muted">Local analysis readiness</span>
                  <span className="text-rose font-semibold">100%</span>
                </div>
                <ProgressBar value={100} tone="rose" />
              </div>

              <div>
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="text-muted">External AI dependency</span>
                  <span className="text-amber font-semibold">0% (Optional)</span>
                </div>
                <ProgressBar value={0} tone="amber" />
              </div>

              <div className="rounded-xl border border-cosmic bg-void/50 p-3.5 text-xs leading-relaxed text-muted">
                IGNIS is not an operational fire-risk certification tool and does not predict
                spacecraft emergencies. It serves as a portable scientific intelligence interface.
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
