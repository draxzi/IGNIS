'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Activity, BookOpen, ChartNoAxesCombined, ChevronRight, CircleHelp, FlaskConical, Flame, LayoutDashboard, Scale, ShieldCheck } from 'lucide-react';
import { IgnisMark } from '@/components/icons';
import { cn } from '@/components/ui';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/research', label: 'Research Explorer', icon: BookOpen },
  { href: '/lab', label: 'Data Laboratory', icon: FlaskConical },
  { href: '/compare', label: 'Comparison Studio', icon: Scale },
  { href: '/assistant', label: 'AI Assistant', icon: CircleHelp },
  { href: '/safety', label: 'Fire Safety', icon: ShieldCheck },
  { href: '/visualize', label: 'Visualization Studio', icon: ChartNoAxesCombined },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = navItems.find((item) => item.href === pathname);
  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 starfield opacity-40" />
      <div className="pointer-events-none fixed inset-0 cosmic-wash" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-line/70 bg-ink/90 px-4 py-5 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="px-3"><IgnisMark /></div>
        <div className="mt-12 px-3"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Mission modules</p></div>
        <nav className="mt-3 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return <Link key={item.href} href={item.href} className={cn('group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition', isActive ? 'border-cyan/20 bg-cyan/10 text-white shadow-glow' : 'border-transparent text-muted hover:border-line hover:bg-white/[0.03] hover:text-white')}><Icon className={cn('h-4 w-4', isActive ? 'text-cyan' : 'text-muted group-hover:text-slate-200')} /><span className="flex-1">{item.label}</span>{isActive ? <ChevronRight className="h-3.5 w-3.5 text-cyan" /> : null}</Link>;
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-line bg-panel/70 p-4 shadow-glow"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" /><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">Local mode ready</span></div><p className="mt-3 text-xs leading-5 text-muted">Source records and analysis tools remain available without an account, database or AI key.</p></div>
      </aside>

      <main className="relative min-h-screen lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line/60 bg-ink/85 px-5 backdrop-blur-xl lg:px-10"><div className="flex items-center gap-3 lg:hidden"><IgnisMark compact /><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{active?.label ?? 'Overview'}</span></div><div className="hidden items-center gap-3 lg:flex"><Activity className="h-4 w-4 text-cyan" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">ISS combustion intelligence / local evidence mode</span></div><div className="flex items-center gap-3"><span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">System status</span><span className="h-2 w-2 animate-pulse rounded-full bg-cyan" /><span className="font-mono text-[10px] text-cyan">NOMINAL</span></div></header>
        <div className="mx-auto max-w-[1440px] px-5 py-8 pb-28 lg:px-10 lg:py-10 lg:pb-10">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex overflow-x-auto border-t border-line/80 bg-ink/95 px-3 py-2 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => { const Icon = item.icon; const isActive = pathname === item.href; return <Link key={item.href} href={item.href} className={cn('flex min-w-[82px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[9px] font-medium', isActive ? 'bg-cyan/10 text-cyan' : 'text-muted')}><Icon className="h-4 w-4" /><span>{item.label.replace(' Studio', '')}</span></Link>; })}
      </nav>
    </div>
  );
}
