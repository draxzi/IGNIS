'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/glass-card';

export function FlameWindow() {
  const [mode, setMode] = useState<'1g' | '0g'>('0g');
  const [telemetryTick, setTelemetryTick] = useState(0);

  // Subtle telemetry tick fluctuation to simulate live flight instrumentation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 100);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const tempValue = mode === '0g' ? 1335 + (telemetryTick % 5) - 2 : 1420 + (telemetryTick % 9) - 4;
  const radiusValue = mode === '0g' ? (6.2 + (telemetryTick % 3) * 0.05).toFixed(2) : (3.4 + (telemetryTick % 5) * 0.1).toFixed(2);
  const o2Value = mode === '0g' ? (17.9 - (telemetryTick % 2) * 0.1).toFixed(1) : (20.8 - (telemetryTick % 2) * 0.1).toFixed(1);

  return (
    <GlassCard
      tier="floating"
      sheen={true}
      className="relative flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden min-h-[460px] max-w-[520px] w-full"
    >
      {/* Corner crosshairs for precision instrument aesthetic */}
      <div className="pointer-events-none absolute top-4 left-4 font-mono text-xs text-rose/40 select-none">
        ┌
      </div>
      <div className="pointer-events-none absolute top-4 right-4 font-mono text-xs text-rose/40 select-none">
        ┐
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-xs text-rose/40 select-none">
        └
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-xs text-rose/40 select-none">
        ┘
      </div>

      {/* Top Instrument Header & Segmented 1g / 0g Toggle */}
      <div className="w-full flex items-center justify-between border-b border-cosmic/50 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
            CHAMBER FLAME MORPHOLOGY
          </span>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            SPEC: CIR / ACME EXPERIMENT RIG
          </p>
        </div>

        {/* 1g / 0g Segmented Toggle */}
        <div className="flex items-center rounded-xl border border-cosmic bg-void/60 p-1">
          <button
            onClick={() => setMode('1g')}
            className={`relative px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200 ${
              mode === '1g' ? 'text-void' : 'text-muted hover:text-cream'
            }`}
          >
            {mode === '1g' && (
              <motion.div
                layoutId="flame-mode-pill"
                className="absolute inset-0 rounded-lg bg-rose"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">1g Earth</span>
          </button>

          <button
            onClick={() => setMode('0g')}
            className={`relative px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200 ${
              mode === '0g' ? 'text-void' : 'text-muted hover:text-cream'
            }`}
          >
            {mode === '0g' && (
              <motion.div
                layoutId="flame-mode-pill"
                className="absolute inset-0 rounded-lg bg-rose"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">0g Micro-g</span>
          </button>
        </div>
      </div>

      {/* Center Instrument Visualizer with Rotating Rings and SVG Flame Morph */}
      <div className="relative my-8 flex h-64 w-64 items-center justify-center">
        {/* Outer Rotating Orbital Reticle Ring */}
        <svg
          className="absolute inset-0 h-full w-full animate-orbit-rotate opacity-35"
          viewBox="0 0 256 256"
          fill="none"
        >
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="#D1A9A7"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="128"
            cy="128"
            r="104"
            stroke="#512A59"
            strokeWidth="0.8"
            strokeDasharray="2 12"
          />
          {/* Orbital indicator ticks */}
          <line x1="128" y1="4" x2="128" y2="12" stroke="#D1A9A7" strokeWidth="1.5" />
          <line x1="128" y1="244" x2="128" y2="252" stroke="#D1A9A7" strokeWidth="1.5" />
          <line x1="4" y1="128" x2="12" y2="128" stroke="#D1A9A7" strokeWidth="1.5" />
          <line x1="244" y1="128" x2="252" y2="128" stroke="#D1A9A7" strokeWidth="1.5" />
        </svg>

        {/* Counter-rotating subtle concentric gauge */}
        <svg
          className="absolute inset-4 h-56 w-56 animate-orbit-rotate-reverse opacity-25"
          viewBox="0 0 224 224"
          fill="none"
        >
          <circle
            cx="112"
            cy="112"
            r="88"
            stroke="#7F5276"
            strokeWidth="1"
            strokeDasharray="1 7"
          />
        </svg>

        {/* Active Ambient Glow Aura behind Flame */}
        <motion.div
          animate={{
            scale: mode === '0g' ? [1, 1.08, 1] : [1, 1.04, 0.98, 1],
            opacity: mode === '0g' ? [0.4, 0.65, 0.4] : [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: mode === '0g' ? 3.5 : 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-40 w-40 rounded-full blur-[35px]"
          style={{
            background:
              mode === '0g'
                ? 'radial-gradient(circle, #F3A65B 0%, #7F5276 60%, transparent 80%)'
                : 'radial-gradient(ellipse at 50% 70%, #F3A65B 0%, #2B124C 70%, transparent 90%)',
          }}
        />

        {/* The Flame: 2D Morphing Animation (1g Teardrop vs 0g Perfect Sphere) */}
        <AnimatePresence mode="wait">
          {mode === '1g' ? (
            /* 1g: Tall flickering teardrop flame buoyant upward */
            <motion.div
              key="flame-1g"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center animate-flame-flicker"
            >
              <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                {/* Outer luminous amber teardrop envelope */}
                <path
                  d="M60 12 C68 45 98 85 98 122 C98 148 81 168 60 168 C39 168 22 148 22 122 C22 85 52 45 60 12 Z"
                  fill="url(#amber-flame-gradient)"
                  filter="drop-shadow(0 0 16px rgba(243,166,91,0.7))"
                />
                {/* Inner intense Starlight Cream combustion core */}
                <path
                  d="M60 68 C64 90 78 112 78 132 C78 148 70 158 60 158 C50 158 42 148 42 132 C42 112 56 90 60 68 Z"
                  fill="url(#cream-core-gradient)"
                  opacity="0.95"
                />
                {/* Burner injector nozzle tip */}
                <rect x="56" y="168" width="8" height="8" rx="1.5" fill="#512A59" />
                <defs>
                  <linearGradient id="amber-flame-gradient" x1="60" y1="12" x2="60" y2="168" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F3A65B" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#F3A65B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#7F5276" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="cream-core-gradient" x1="60" y1="68" x2="60" y2="158" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FBE5D8" stopOpacity="1" />
                    <stop offset="70%" stopColor="#FBE5D8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#D1A9A7" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ) : (
            /* 0g: Perfect glowing sphere with calm pulsing halo & zero upward buoyancy */
            <motion.div
              key="flame-0g"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center animate-spherical-pulse"
            >
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                {/* Outer concentric glowing diffusion mantle */}
                <circle
                  cx="75"
                  cy="75"
                  r="62"
                  fill="url(#zero-g-halo)"
                  opacity="0.35"
                />
                {/* Middle amber spherical combustion zone */}
                <circle
                  cx="75"
                  cy="75"
                  r="48"
                  fill="url(#zero-g-mantle)"
                  filter="drop-shadow(0 0 24px rgba(243,166,91,0.85))"
                />
                {/* Inner cream fuel-core zone */}
                <circle
                  cx="75"
                  cy="75"
                  r="24"
                  fill="url(#zero-g-core)"
                  opacity="0.95"
                />
                {/* Fuel droplet anchor point */}
                <circle cx="75" cy="75" r="3" fill="#D1A9A7" />
                <defs>
                  <radialGradient id="zero-g-halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F3A65B" stopOpacity="0.5" />
                    <stop offset="70%" stopColor="#7F5276" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#180018" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="zero-g-mantle" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F3A65B" stopOpacity="0.95" />
                    <stop offset="80%" stopColor="#F3A65B" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#7F5276" stopOpacity="0.3" />
                  </radialGradient>
                  <radialGradient id="zero-g-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FBE5D8" stopOpacity="1" />
                    <stop offset="70%" stopColor="#FBE5D8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#D1A9A7" stopOpacity="0.5" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Telemetry Readout & Interpretation Label */}
      <div className="w-full border-t border-cosmic/50 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
            {mode === '0g' ? (
              <span className="flex items-center gap-1.5 text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                BUOYANCY: SUPPRESSED
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose">
                <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
                BUOYANCY: DOMINANT (1G)
              </span>
            )}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            {mode === '0g' ? 'SYMMETRIC DIFFUSION' : 'NATURAL CONVECTION'}
          </span>
        </div>

        {/* Live-looking Telemetry Numbers (T, r, O2) */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-cosmic/40 bg-void/50 p-2.5 text-center">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              T (Peak)
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums text-cream">
              {tempValue} K
            </span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              Radius (r)
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums text-cream">
              {radiusValue} mm
            </span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              O₂ Conc
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums text-cream">
              {o2Value}%
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
