import type { ReactNode } from 'react';
import { Badge } from '@/components/ui';

export function SectionHeader({ eyebrow, title, description, action, status }: { eyebrow: string; title: string; description: string; action?: ReactNode; status?: string }) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-5 border-b border-line/70 pb-7 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2"><span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">{eyebrow}</span>{status ? <Badge tone="green"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{status}</Badge> : null}</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
