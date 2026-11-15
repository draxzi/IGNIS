import React, { type ReactNode } from 'react';

export function SectionHeader({
  eyebrow,
  title,
  description,
  status,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {/* Eyebrow & Thin Gradient Line */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-rose font-medium">
          {eyebrow}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-cosmic/80 via-rose/20 to-transparent" />
        {status && (
          <div className="flex items-center gap-2 rounded-full border border-cosmic bg-void/50 px-2.5 py-0.5 shadow-glass-highlight">
            <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse shadow-[0_0_6px_#D1A9A7]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream">
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Main Title & Action */}
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
