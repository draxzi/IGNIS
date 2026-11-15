'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  Github,
  LockKeyhole,
  Server,
  Sparkles,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';

const timelineEvents = [
  {
    phase: 'Phase 01',
    era: '2016 — 2020',
    title: 'ISS CIR Microgravity Baselines',
    desc: 'Deployment of ACME, FLEX and SAME payloads within the Combustion Integrated Rack. Researchers established that buoyancy-free spherical flames suppress flickering and soot convective transport.',
    badge: 'Orbital Verification',
  },
  {
    phase: 'Phase 02',
    era: '2021 — 2024',
    title: 'Enclosure Scale Flammability (Saffire)',
    desc: 'Uncrewed Cygnus resupply vehicles host large-scale fabric and panel burn tests (Saffire I through VI). Confirmed that low-velocity airflow in microgravity can sustain flame spread across wider oxygen ranges than predicted by 1g drop towers.',
    badge: 'Spacecraft Scale',
  },
  {
    phase: 'Phase 03',
    era: '2025 — Present',
    title: 'Solid Fuel Ignition & Extinction (SoFIE)',
    desc: 'Active testing of solid materials, composites, and textiles under varied atmospheric pressures and inert-gas blends to support Artemis lunar architecture and gateway habitats.',
    badge: 'Current Operations',
  },
  {
    phase: 'Phase 04',
    era: 'Future Horizon',
    title: 'Partial Gravity Combustion (Lunar & Martian Regimes)',
    desc: 'Expanding physical models to intermediate gravity: 0.16g (Moon) and 0.38g (Mars), where weak buoyant convection interacts non-linearly with forced ventilation.',
    badge: 'Deep Space Standards',
  },
];

const principles = [
  {
    title: 'Research First & Source Attached',
    content:
      'Curated index entries link directly to verified NASA Glenn, NTRS, or PSI repository landing pages. Every item retains its primary citation, publication date, and known experimental boundaries.',
  },
  {
    title: 'Synthetic Means Synthetic',
    content:
      'Any synthetic time series or illustrative model is explicitly flagged with Combustion Amber and labeled illustrative. We never fabricate flight telemetry or mask synthetic estimates as real sensor readings.',
  },
  {
    title: 'Zero Unsupported Hazard Scores',
    content:
      'IGNIS refrains from generating synthetic "hazard indexes" or emergency forecasting. Spacecraft fire safety is an engineering science; qualitative relevance is communicated with strict integrity.',
  },
  {
    title: 'Portable & Local-First by Default',
    content:
      'The entire interface operates without user accounts, cloud tracking, or mandatory AI API keys. Parsing and diagnostics execute client-side inside standard browser environments.',
  },
];

export default function AboutPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="08 / mission dossier"
        title="Methodology, Architecture & About"
        description="IGNIS is an evidence-first cockpit designed to bridge NASA microgravity combustion research and modern spaceflight engineering with uncompromising scientific integrity."
        status="Mission Dossier"
      />

      {/* Overview & Mission Purpose */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard tier="raised" className="p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            Scientific Rationale
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-cream">
            Why fire behaves differently beyond gravity
          </h3>

          <div className="mt-4 space-y-4 text-xs leading-relaxed text-muted sm:text-sm">
            <p>
              On Earth, gravity acts on density gradients: hot combustion gases expand, become buoyant, and rise rapidly. This buoyancy-driven flow elongates flames into familiar teardrop shapes and drives natural convective circulation.
            </p>
            <p>
              In orbital microgravity (~10⁻⁶ g), buoyancy is virtually eliminated. Flames become spherical, transport is governed primarily by molecular diffusion and forced ventilation, and soot residence times increase dramatically. Understanding these phenomena is vital for crewed deep-space mission design.
            </p>

            <div className="mt-4 rounded-2xl border border-cosmic bg-void/50 p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-rose">
                System Boundary Statement
              </span>
              <p className="mt-1 font-mono text-xs text-cream/90">
                IGNIS makes the boundary between a primary NASA fact, an analysis operation, and an illustrative simulation visible on every screen.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Expandable Principles Accordion */}
        <GlassCard tier="raised" className="p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            Ethics &amp; Trust
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-cream">
            Integrity Protocol
          </h3>

          <div className="mt-4 space-y-2">
            {principles.map((item, idx) => {
              const isOpen = openAccordion === idx;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-cosmic/70 bg-void/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-display text-xs font-semibold text-cream hover:text-rose transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-rose shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-rose' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-xs leading-relaxed text-muted border-t border-cosmic/40 pt-2"
                    >
                      {item.content}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Animated Vertical Timeline */}
      <GlassCard tier="raised" className="p-6 sm:p-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            Microgravity Evolution
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-cream">
            NASA Flight Research Trajectory
          </h3>
          <p className="mt-2 text-xs text-muted">
            From the initial drop towers and Space Shuttle Get-Away-Specials to the International Space Station and Artemis lunar habitats.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-rose via-mauve to-cosmic/30" />

          <div className="space-y-12">
            {timelineEvents.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={evt.phase}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Orb */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-rose/60 bg-void shadow-[0_0_15px_rgba(209,169,167,0.4)] z-10">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose" />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`ml-10 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pl-10' : 'sm:pr-10'
                    }`}
                  >
                    <div className="rounded-2xl border border-cosmic/80 bg-void/60 p-5 shadow-glass-highlight">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-rose">
                          {evt.era}
                        </span>
                        <Badge tone="rose">{evt.badge}</Badge>
                      </div>
                      <h4 className="mt-2 font-display text-base font-bold text-cream">
                        {evt.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Architecture Diagram Cards */}
      <div>
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            System Implementation
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-cream">
            Engineered for Precision &amp; Portability
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <GlassCard tier="raised" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-4">
              <Code2 className="h-5 w-5" />
            </div>
            <Badge tone="rose">Modern Core</Badge>
            <h4 className="mt-3 font-display text-base font-bold text-cream">
              Standard Stack
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Next.js 15 App Router, React 18/19 compatibility, Tailwind CSS tokens, Canvas 2D, Recharts, and Framer Motion. Zero WebGL/Three.js footprint.
            </p>
          </GlassCard>

          <GlassCard tier="raised" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-4">
              <Server className="h-5 w-5" />
            </div>
            <Badge tone="rose">Vercel Ready</Badge>
            <h4 className="mt-3 font-display text-base font-bold text-cream">
              Independent Deployment
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Standard npm lifecycle scripts (dev, build, start). Deploys to Vercel, Netlify, or Docker with zero proprietary vendor hooks.
            </p>
          </GlassCard>

          <GlassCard tier="raised" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-4">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <Badge tone="amber">Client Sandbox</Badge>
            <h4 className="mt-3 font-display text-base font-bold text-cream">
              Optional AI Adapter
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Connects to OpenAI-compatible endpoints via server environment variables. Operates completely in offline fallback mode without an AI key.
            </p>
          </GlassCard>

          <GlassCard tier="raised" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-4">
              <FileText className="h-5 w-5" />
            </div>
            <Badge tone="mauve">Included</Badge>
            <h4 className="mt-3 font-display text-base font-bold text-cream">
              Full Documentation
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Architecture specs, privacy guarantees, terms of exploration, and scientific disclaimers packaged directly in the repository docs.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Contributor Note & Open Source Index */}
      <GlassCard tier="raised" className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
              Institutional Attribution
            </p>
            <h4 className="mt-1 font-display text-base font-bold text-cream">
              NASA Glenn Research Center &amp; Physical Sciences Program
            </h4>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
              IGNIS references research conducted under the NASA Glenn Combustion Science program, NASA Physical Sciences Informatics (PSI), and NASA Technical Reports Server (NTRS). All citations remain attributed to their respective principal investigators.
            </p>
          </div>
          <Link href="/research" className="shrink-0">
            <Button variant="secondary">
              <Github className="h-4 w-4" /> Open Source Index
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
