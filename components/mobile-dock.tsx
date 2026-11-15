'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navItems } from '@/components/sidebar';

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-3 inset-x-3 z-40 flex items-center justify-between gap-1 overflow-x-auto rounded-2xl border border-rose/20 bg-[rgba(36,16,47,0.85)] p-1.5 shadow-[0_20px_60px_rgba(8,0,14,0.8)] backdrop-blur-2xl lg:hidden scrollbar-none"
      aria-label="Mobile Navigation Dock"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-1 flex-col items-center justify-center py-1.5 px-2 text-center transition-colors ${
              isActive ? 'text-cream' : 'text-muted hover:text-cream'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-dock-active-pill"
                className="absolute inset-0 rounded-xl bg-rose/20 border border-rose/30 shadow-[0_0_12px_rgba(209,169,167,0.2)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Icon
              className={`relative z-10 h-4 w-4 ${
                isActive ? 'text-rose' : 'text-muted'
              }`}
            />
            <span className="relative z-10 mt-1 block truncate font-mono text-[9px] uppercase tracking-wider">
              {item.label.split(' ')[0]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
