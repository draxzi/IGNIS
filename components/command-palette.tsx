'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Scale,
  CircleHelp,
  ShieldCheck,
  ChartNoAxesCombined,
  FileText,
  FileSearch,
  ExternalLink,
  Command,
} from 'lucide-react';
import { researchRecords } from '@/lib/research';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { href: '/', label: 'Overview', category: 'Mission Navigation', icon: LayoutDashboard, desc: 'Signature hero & bento telemetry dashboard' },
  { href: '/research', label: 'Research Explorer', category: 'Mission Navigation', icon: BookOpen, desc: 'Curated NASA-linked microgravity investigations' },
  { href: '/lab', label: 'Data Laboratory', category: 'Mission Navigation', icon: FlaskConical, desc: 'CSV analysis docking port & column diagnostics' },
  { href: '/compare', label: 'Comparison Studio', category: 'Mission Navigation', icon: Scale, desc: 'Side-by-side parameter evaluation matrix' },
  { href: '/assistant', label: 'AI Assistant', category: 'Mission Navigation', icon: CircleHelp, desc: 'Transmission console & evidence-backed guidance' },
  { href: '/safety', label: 'Fire Safety Intelligence', category: 'Mission Navigation', icon: ShieldCheck, desc: 'Spacecraft fire safety & combustion fundamentals' },
  { href: '/visualize', label: 'Visualization Studio', category: 'Mission Navigation', icon: ChartNoAxesCombined, desc: 'Time-series channels & provenance inspection' },
  { href: '/about', label: 'Methodology & About', category: 'Mission Navigation', icon: FileText, desc: 'Architecture, ethics & integrity protocol' },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return navigationItems.map((item) => ({
        type: 'nav' as const,
        id: item.href,
        title: item.label,
        detail: item.desc,
        href: item.href,
        icon: item.icon,
      }));
    }

    const matchedNav = navigationItems
      .filter((n) => n.label.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q))
      .map((item) => ({
        type: 'nav' as const,
        id: item.href,
        title: item.label,
        detail: item.desc,
        href: item.href,
        icon: item.icon,
      }));

    const matchedRecords = researchRecords
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.parameters.some((p) => p.toLowerCase().includes(q))
      )
      .map((r) => ({
        type: 'record' as const,
        id: r.id,
        title: r.title,
        detail: `${r.category} · ${r.sourceOrg}`,
        href: `/research?q=${encodeURIComponent(r.id)}`,
        icon: FileSearch,
      }));

    return [...matchedNav, ...matchedRecords];
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].href);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-[24px] border border-rose/25 bg-[rgba(36,16,47,0.85)] p-0 shadow-[0_30px_90px_rgba(8,0,14,0.85)] backdrop-blur-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-cosmic/70 px-5 py-4">
              <Search className="h-4 w-4 text-rose" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Jump to module or search NASA research index..."
                className="w-full bg-transparent text-sm text-cream placeholder-muted/60 outline-none"
              />
              <span className="rounded border border-cosmic px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
              {results.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-muted">
                  No mission modules or research records match &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(item.href);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors duration-150 ${
                        isSelected
                          ? 'border border-rose/30 bg-rose/15 text-cream'
                          : 'border border-transparent text-muted hover:text-cream'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                          isSelected
                            ? 'border-rose/40 bg-rose/20 text-rose'
                            : 'border-cosmic/60 bg-void/50 text-muted'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-cream">
                            {item.title}
                          </span>
                          {item.type === 'record' && (
                            <span className="rounded border border-amber/30 bg-amber/10 px-1.5 py-0.2 font-mono text-[8px] uppercase tracking-wider text-amber">
                              NASA Source
                            </span>
                          )}
                        </div>
                        <p className="truncate text-[11px] text-muted">{item.detail}</p>
                      </div>
                      {isSelected && (
                        <span className="font-mono text-[10px] uppercase text-rose tracking-wider">
                          Enter ↵
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Telemetry Bar */}
            <div className="flex items-center justify-between border-t border-cosmic/60 bg-void/50 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-muted">
              <span className="flex items-center gap-1.5">
                <Command className="h-3 w-3 text-rose" />
                IGNIS TELEMETRY COMMAND
              </span>
              <span>8 MODULES · 10 INDEXED RECORDS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
