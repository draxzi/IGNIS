import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-2xl border border-line/80 bg-panel/80 shadow-panel backdrop-blur', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-b border-line/70 px-5 py-4', className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-5', className)} {...props}>{children}</div>;
}

export function Badge({ className, tone = 'neutral', children }: { className?: string; tone?: 'neutral' | 'cyan' | 'amber' | 'blue' | 'green'; children: ReactNode }) {
  const tones = {
    neutral: 'border-slate-600/60 bg-slate-700/20 text-slate-300',
    cyan: 'border-cyan/30 bg-cyan/10 text-cyan',
    amber: 'border-amber/30 bg-amber/10 text-amber',
    blue: 'border-blue/30 bg-blue/10 text-blue-100',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  };
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]', tones[tone], className)}>{children}</span>;
}

export function Button({ className, variant = 'primary', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const variants = {
    primary: 'border-cyan/30 bg-cyan text-ink hover:bg-cyan/90',
    secondary: 'border-line bg-white/[0.05] text-slate-100 hover:border-cyan/40 hover:bg-white/[0.08]',
    ghost: 'border-transparent bg-transparent text-slate-300 hover:border-line hover:bg-white/[0.04] hover:text-white',
    danger: 'border-red-400/30 bg-red-400/10 text-red-200 hover:bg-red-400/20',
  };
  return <button className={cn('inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan/50 disabled:cursor-not-allowed disabled:opacity-45', variants[variant], className)} {...props}>{children}</button>;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('h-11 w-full rounded-xl border border-line bg-ink/60 px-3.5 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-cyan/60 focus:ring-2 focus:ring-cyan/10', className)} {...props} />;
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('h-11 w-full rounded-xl border border-line bg-ink/60 px-3.5 text-sm text-white outline-none transition focus:border-cyan/60 focus:ring-2 focus:ring-cyan/10', className)} {...props} />;
}

export function ProgressBar({ value, tone = 'cyan' }: { value: number; tone?: 'cyan' | 'amber' | 'blue' }) {
  const colors = { cyan: 'bg-cyan', amber: 'bg-amber', blue: 'bg-blue' };
  return <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"><div className={cn('h-full rounded-full transition-all', colors[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-line bg-ink/30 px-6 py-10 text-center"><p className="text-sm font-semibold text-white">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{body}</p>{action ? <div className="mt-5 flex justify-center">{action}</div> : null}</div>;
}
