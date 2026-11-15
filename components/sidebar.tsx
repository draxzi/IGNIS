'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Scale,
  CircleHelp,
  ShieldCheck,
  ChartNoAxesCombined,
  FileText,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { IgnisMark } from '@/components/icons';

export const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/research', label: 'Research Explorer', icon: BookOpen },
  { href: '/lab', label: 'Data Laboratory', icon: FlaskConical },
  { href: '/compare', label: 'Comparison Studio', icon: Scale },
  { href: '/assistant', label: 'AI Assistant', icon: CircleHelp },
  { href: '/safety', label: 'Fire Safety', icon: ShieldCheck },
  { href: '/visualize', label: 'Visualization Studio', icon: ChartNoAxesCombined },
  { href: '/about', label: 'Methodology', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-4 bottom-4 left-4 z-40 hidden w-64 flex-col justify-between rounded-[28px] border border-rose/15 bg-[rgba(36,16,47,0.65)] p-5 shadow-[0_30px_80px_rgba(8,0,14,0.65)] backdrop-blur-2xl backdrop-saturate-[140%] lg:flex">
      {/* Top Wordmark & Brand */}
      <div>
        <Link href="/" className="block px-2 transition-transform duration-200 hover:scale-[1.02]">
          <IgnisMark />
        </Link>

        {/* Section Eyebrow */}
        <div className="mt-8 px-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Mission Modules
          </p>
        </div>

        {/* Navigation List */}
        <nav className="mt-3 space-y-1" aria-label="Primary Mission Modules">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-cream font-semibold'
                    : 'text-muted hover:text-cream'
                }`}
              >
                {/* Active Pill with Framer Motion layoutId and Rose Glow */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-xl border border-rose/30 bg-rose/15 shadow-[0_0_20px_rgba(209,169,167,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 transition-colors duration-200 ${
                    isActive ? 'text-rose' : 'text-muted group-hover:text-rose'
                  }`}
                />
                <span className="relative z-10 flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="relative z-10 h-3.5 w-3.5 text-rose" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      <div className="relative mt-auto overflow-hidden rounded-2xl border border-rose/20 bg-void/60 p-4 shadow-glass-highlight">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose shadow-[0_0_8px_#D1A9A7]" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose font-semibold">
            LOCAL MODE READY
          </span>
        </div>
        <p className="mt-2.5 text-[11px] leading-5 text-muted">
          Source records and analysis tools remain operational without an account, database or AI key.
        </p>
      </div>
    </aside>
  );
}
