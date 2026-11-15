'use client';

import React from 'react';

const programs = [
  { code: 'ACME', name: 'Advanced Combustion via Microgravity Experiments' },
  { code: 'SoFIE', name: 'Solid Fuel Ignition and Extinction' },
  { code: 'FLARE', name: 'Flammability Limits At Reduced-g' },
  { code: 'FLEX', name: 'Flame Extinguishment Experiment' },
  { code: 'Saffire', name: 'Spacecraft Fire Safety Demonstration' },
  { code: 'SAME', name: 'Smoke Aerosol Measurement Experiment' },
  { code: 'SPICE', name: 'Smoke Point in Coflow Experiment' },
  { code: 'CIR', name: 'Combustion Integrated Rack' },
];

export function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-cosmic/50 bg-[rgba(36,16,47,0.35)] py-3 backdrop-blur-md">
      {/* Edge gradient masks for seamless fade out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />

      {/* Marquee track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Double list for infinite seamless loop */}
        {[...programs, ...programs, ...programs].map((prog, idx) => (
          <div
            key={`${prog.code}-${idx}`}
            className="flex items-center gap-3 px-6 select-none"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-rose">
              {prog.code}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
              {prog.name}
            </span>
            <span className="text-cosmic/80">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
