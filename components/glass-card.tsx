'use client';

import React, { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tier?: 'base' | 'raised' | 'floating';
  spotlight?: boolean;
  sheen?: boolean;
  glowOnHover?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  tier = 'raised',
  spotlight = true,
  sheen = false,
  glowOnHover = true,
  className = '',
  onMouseMove,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y, active: true });
    }
    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = () => {
    if (spotlight) {
      setMousePos((prev) => ({ ...prev, active: false }));
    }
  };

  // Depth tiers
  const tierStyles = {
    base: 'bg-[rgba(36,16,47,0.45)] backdrop-blur-xl backdrop-saturate-[130%] border-[rgba(209,169,167,0.1)] shadow-[0_15px_40px_rgba(8,0,14,0.4)]',
    raised: 'bg-[rgba(36,16,47,0.58)] backdrop-blur-2xl backdrop-saturate-[140%] border-[rgba(209,169,167,0.14)] shadow-[0_30px_80px_rgba(8,0,14,0.5)]',
    floating: 'bg-[rgba(43,18,76,0.72)] backdrop-blur-3xl backdrop-saturate-[150%] border-[rgba(209,169,167,0.22)] shadow-[0_35px_90px_rgba(8,0,14,0.65)]',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[24px] border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        tierStyles[tier]
      } ${
        glowOnHover
          ? 'hover:-translate-y-0.5 hover:border-[rgba(209,169,167,0.32)] hover:shadow-[0_30px_90px_rgba(8,0,14,0.6),0_0_35px_rgba(209,169,167,0.15)] active:scale-[0.99]'
          : ''
      } ${className}`}
      style={{
        boxShadow:
          '0 30px 80px rgba(8, 0, 14, 0.5), inset 0 1px 0 rgba(251, 229, 216, 0.12)',
      }}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Border & Surface Glow */}
      {spotlight && mousePos.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(209, 169, 167, 0.18), transparent 70%)`,
            maskImage:
              'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            WebkitMaskImage:
              'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          }}
        />
      )}

      {/* Surface Ambient Spotlight */}
      {spotlight && mousePos.active && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(209, 169, 167, 0.05), transparent 70%)`,
          }}
        />
      )}

      {/* Optional Diagonal Liquid-Glass Sheen Sweep */}
      {sheen && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
          <div
            className="absolute -top-[120%] -left-[120%] h-[340%] w-[340%] opacity-20 animate-sheen-sweep"
            style={{
              background:
                'linear-gradient(115deg, transparent 0%, transparent 40%, rgba(251,229,216,0.12) 48%, rgba(209,169,167,0.25) 50%, rgba(251,229,216,0.12) 52%, transparent 60%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
