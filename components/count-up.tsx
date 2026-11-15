'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  value: number | string;
  padZero?: boolean;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  padZero = true,
  duration = 1.2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState<string>(
    typeof value === 'number' ? (padZero ? '00' : '0') : value
  );

  useEffect(() => {
    if (!isInView) return;

    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setDisplayValue(padZero ? String(value).padStart(2, '0') : String(value));
      return;
    }

    let start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);

      setDisplayValue(padZero ? String(current).padStart(2, '0') : String(current));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(padZero ? String(end).padStart(2, '0') : String(end));
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value, padZero, duration]);

  return (
    <span ref={ref} className={`tabular-nums font-mono ${className}`}>
      {displayValue}
    </span>
  );
}
