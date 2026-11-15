import Link from 'next/link';
import {
  ArrowUpRight,
  Flame,
  Gauge,
  Info,
  Radio,
  ShieldAlert,
  Wind,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import { NASA_COMBUSTION_OVERVIEW, researchRecords } from '@/lib/research';

const insightGroups = [
  {
    title: 'Flame Behaviour',
    icon: Flame,
    tone: 'amber' as const,
    text: 'NASA describes buoyant flow as a dominant influence on terrestrial flames. Reduced gravity suppresses that flow and can reveal flame structures that are difficult to isolate on Earth.',
    source: 'overview-microgravity',
  },
  {
    title: 'Heat Transfer & Flow',
    icon: Wind,
    tone: 'rose' as const,
    text: 'Removing buoyancy does not remove heat transfer. It alters the convective and radiative transport regimes that couple hot gases, the surrounding cabin mixture and the fuel surface.',
    source: 'overview-microgravity',
  },
  {
    title: 'Conditions & Oxygen',
    icon: Gauge,
    tone: 'mauve' as const,
    text: 'FLEX is documented as investigating inert-gas suppression and limiting oxygen conditions for steady combustion. IGNIS surfaces the parameter, not a universal threshold.',
    source: 'flex',
  },
  {
    title: 'Fuel & Smoke Signatures',
    icon: Radio,
    tone: 'amber' as const,
    text: 'NASA identifies disparate smoke aerosol signatures for hydrocarbon fuels versus composite polymers. Spacecraft detector topologies must account for altered particle transport and agglomeration.',
    source: 'same',
  },
  {
    title: 'Experimental Limits',
    icon: Info,
    tone: 'rose' as const,
    text: 'A repository metadata record confirms an investigation exists and categorizes its parameters. It does not automatically provide row-level calibration or complete uncertainty budgets.',
    source: 'psi-60',
  },
  {
    title: 'Spacecraft Relevance',
    icon: ShieldAlert,
    tone: 'rose' as const,
    text: 'SoFIE, FLEX and Saffire illustrate how fundamental microgravity combustion informs material flammability screening and habitat suppression protocols. These represent qualitative research links, not operational certification.',
    source: 'saffire',
  },
];

export default function SafetyPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="06 / safety intelligence"
        title="Fire Safety Intelligence"
        description="A qualitative evidence framework examining why spacecraft fire prevention requires microgravity-specific science. No arbitrary numerical hazard scores, no emergency forecasting."
        status="Qualitative Framework"
      />

      {/* Prominent Amber "Interpretation Boundary" Banner */}
      <div className="rounded-[28px] border border-amber/40 bg-amber/[0.08] p-6 sm:p-8 shadow-[0_0_40px_rgba(243,166,91,0.15)] backdrop-blur-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber/50 bg-amber/20 text-amber shadow-[0_0_15px_rgba(243,166,91,0.3)]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-amber">
              Critical Interpretation Boundary
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-amber/90 sm:text-sm">
              These insights evaluate how published microgravity combustion research informs spacecraft habitat design. They do not certify crewed materials, prescribe operational fire-fighting actions, or compute synthetic numerical risk indexes. Real mission validation requires certified NASA Glenn / Johnson Space Center safety reviews.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Glass Cards with Animated Line Icons & Glow */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {insightGroups.map((item) => {
          const Icon = item.icon;
          const record = researchRecords.find((r) => r.id === item.source);

          return (
            <GlassCard
              key={item.title}
              tier="raised"
              spotlight={true}
              className="flex flex-col justify-between p-6 hover:border-rose/30"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${
                      item.tone === 'amber'
                        ? 'border-amber/40 bg-amber/15 text-amber shadow-[0_0_15px_rgba(243,166,91,0.2)]'
                        : 'border-rose/40 bg-rose/15 text-rose shadow-[0_0_15px_rgba(209,169,167,0.2)]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge tone={item.tone}>Research Lens</Badge>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>

              {record && (
                <div className="mt-6 border-t border-cosmic/60 pt-3">
                  <a
                    href={record.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-rose hover:underline"
                  >
                    <span>Source: {record.title.slice(0, 32)}...</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>

      {/* Safety Reading Path */}
      <GlassCard tier="raised" className="p-6 sm:p-8">
        <div className="border-b border-cosmic/60 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            Scientific Protocol
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-cream">
            Structured Evidence Trajectory
          </h3>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/research"
            className="group rounded-2xl border border-cosmic bg-void/50 p-5 transition-all hover:border-rose/40 hover:bg-rose/5"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose">
              01 / Discover
            </span>
            <h4 className="mt-2 text-sm font-bold text-cream group-hover:text-rose transition-colors">
              Access NASA Source Record
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Inspect primary investigator notes, flight dates, and data availability statuses.
            </p>
          </Link>

          <Link
            href="/compare"
            className="group rounded-2xl border border-cosmic bg-void/50 p-5 transition-all hover:border-rose/40 hover:bg-rose/5"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose">
              02 / Compare
            </span>
            <h4 className="mt-2 text-sm font-bold text-cream group-hover:text-rose transition-colors">
              Cross-Examine Conditions
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Examine differences in fuel phase, oxidizer concentration, and suppression mechanics.
            </p>
          </Link>

          <a
            href={NASA_COMBUSTION_OVERVIEW}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-cosmic bg-void/50 p-5 transition-all hover:border-rose/40 hover:bg-rose/5"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose">
              03 / Verify
            </span>
            <h4 className="mt-2 text-sm font-bold text-cream group-hover:text-rose transition-colors">
              Return to Primary Literature
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Consult NASA Glenn Physical Sciences portal for complete peer-reviewed literature.
            </p>
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
