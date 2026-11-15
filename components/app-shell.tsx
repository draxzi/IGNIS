'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Activity, Search, Command } from 'lucide-react';
import { Sidebar, navItems } from '@/components/sidebar';
import { MobileDock } from '@/components/mobile-dock';
import { CommandPalette } from '@/components/command-palette';
import { IgnisMark } from '@/components/icons';
import { PageTransition } from '@/components/page-transition';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const activeItem = navItems.find((item) => item.href === pathname);

  return (
    <div className="relative min-h-screen bg-void text-cream selection:bg-rose/30 selection:text-cream">
      {/* Thin Rose Scroll-Progress Bar at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-rose via-amber to-rose shadow-[0_0_8px_#D1A9A7]"
        style={{ scaleX }}
      />

      {/* Desktop Floating Sidebar */}
      <Sidebar />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Main Content Area */}
      <div className="relative min-h-screen lg:pl-[280px]">
        {/* Floating Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-rose/10 bg-[rgba(24,0,24,0.7)] px-5 backdrop-blur-2xl lg:px-10">
          {/* Mobile Mark & Title */}
          <div className="flex items-center gap-3 lg:hidden">
            <IgnisMark compact />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {activeItem?.label ?? 'Overview'}
            </span>
          </div>

          {/* Desktop Mission Telemetry */}
          <div className="hidden items-center gap-3 lg:flex">
            <Activity className="h-4 w-4 text-rose" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              ISS COMBUSTION INTELLIGENCE / LOCAL EVIDENCE MODE
            </span>
          </div>

          {/* Right Controls: Command Palette Trigger & System Status */}
          <div className="flex items-center gap-4">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="group flex items-center gap-2 rounded-xl border border-cosmic/70 bg-[rgba(36,16,47,0.5)] px-3 py-1.5 text-xs text-muted shadow-glass-highlight transition-all duration-200 hover:border-rose/40 hover:bg-rose/10 hover:text-cream"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5 text-rose" />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">
                Quick jump / Search
              </span>
              <kbd className="flex items-center gap-0.5 rounded border border-cosmic bg-void/60 px-1.5 py-0.5 font-mono text-[9px] uppercase text-rose">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </button>

            {/* System Status Readout */}
            <div className="flex items-center gap-2.5 rounded-full border border-cosmic/60 bg-void/50 px-3 py-1 shadow-glass-highlight">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose shadow-[0_0_8px_#D1A9A7]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-rose font-medium">
                NOMINAL
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Container with Smooth Transition */}
        <main className="mx-auto max-w-[1440px] px-4 py-8 pb-32 sm:px-6 lg:px-10 lg:py-10 lg:pb-16">
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>
      </div>

      {/* Mobile Floating Bottom Dock */}
      <MobileDock />
    </div>
  );
}
