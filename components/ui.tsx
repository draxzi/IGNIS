'use client';

import React, {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useState,
} from 'react';
import { GlassCard } from '@/components/glass-card';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Card wrappers leveraging the new GlassCard implementation
export function Card({
  className,
  children,
  tier = 'raised',
  ...props
}: HTMLAttributes<HTMLDivElement> & { tier?: 'base' | 'raised' | 'floating' }) {
  return (
    <GlassCard tier={tier} className={className} {...props}>
      {children}
    </GlassCard>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-b border-cosmic/60 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  );
}

// Badge component: Strictly Rose, Amber, Mauve, Cosmic (aliasing cyan/blue/green safely)
export type BadgeTone = 'neutral' | 'rose' | 'amber' | 'mauve' | 'cyan' | 'blue' | 'green';

export function Badge({
  className,
  tone = 'rose',
  children,
}: {
  className?: string;
  tone?: BadgeTone;
  children: ReactNode;
}) {
  // Normalize tones to strict palette
  const normalizedTone =
    tone === 'cyan' || tone === 'green'
      ? 'rose'
      : tone === 'blue'
      ? 'mauve'
      : tone;

  const toneStyles: Record<string, string> = {
    neutral: 'border-cosmic bg-void/60 text-muted',
    rose: 'border-rose/30 bg-rose/10 text-rose shadow-[0_0_12px_rgba(209,169,167,0.12)]',
    amber: 'border-amber/35 bg-amber/10 text-amber shadow-[0_0_12px_rgba(243,166,91,0.15)]',
    mauve: 'border-mauve/40 bg-mauve/15 text-cream',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] font-semibold backdrop-blur-md',
        toneStyles[normalizedTone] || toneStyles.rose,
        className
      )}
    >
      {children}
    </span>
  );
}

// Button with magnetic hover effect and click ripple
export function Button({
  className,
  variant = 'primary',
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'amber';
}) {
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
    setTimeout(() => setRipple((prev) => ({ ...prev, show: false })), 400);

    if (onClick) onClick(e);
  };

  const variants = {
    primary:
      'border border-rose/60 bg-rose text-void font-semibold shadow-[0_0_20px_rgba(209,169,167,0.35)] hover:bg-rose/90 hover:shadow-[0_0_30px_rgba(209,169,167,0.5)] active:scale-[0.98]',
    secondary:
      'border border-rose/25 bg-[rgba(36,16,47,0.5)] text-cream backdrop-blur-xl hover:border-rose/50 hover:bg-rose/10 hover:shadow-[0_0_20px_rgba(209,169,167,0.15)] active:scale-[0.98]',
    ghost:
      'border border-transparent bg-transparent text-muted hover:border-cosmic hover:bg-rose/5 hover:text-cream',
    amber:
      'border border-amber/40 bg-amber/15 text-amber hover:bg-amber/25 hover:shadow-[0_0_25px_rgba(243,166,91,0.3)] active:scale-[0.98]',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative inline-flex min-h-10 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose/50 disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Click ripple */}
      {ripple.show && (
        <span
          className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/25 animate-ping"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

// Input field with glass styling
export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-cosmic bg-[rgba(24,0,24,0.65)] px-3.5 text-xs text-cream outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-rose/60 focus:ring-2 focus:ring-rose/20',
        className
      )}
      {...props}
    />
  );
}

// Select dropdown with glass styling
export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-11 w-full rounded-xl border border-cosmic bg-[#180018] px-3.5 text-xs text-cream outline-none transition-all duration-200 focus:border-rose/60 focus:ring-2 focus:ring-rose/20 cursor-pointer',
        className
      )}
      {...props}
    />
  );
}

// Animated Progress Bar
export function ProgressBar({
  value,
  tone = 'rose',
}: {
  value: number;
  tone?: 'rose' | 'amber' | 'mauve' | 'cyan';
}) {
  const normalizedTone = tone === 'cyan' ? 'rose' : tone;
  const colors: Record<string, string> = {
    rose: 'bg-rose shadow-[0_0_12px_#D1A9A7]',
    amber: 'bg-amber shadow-[0_0_12px_#F3A65B]',
    mauve: 'bg-mauve',
  };

  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-cosmic/40">
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-out', colors[normalizedTone] || colors.rose)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

// Empty state placeholder
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-cosmic/70 bg-[rgba(36,16,47,0.35)] p-8 sm:p-12 text-center backdrop-blur-xl">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-rose/20 bg-rose/10 text-rose">
        ✦
      </div>
      <p className="font-display text-base font-semibold text-cream">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted">
        {body}
      </p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
