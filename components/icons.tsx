import React from 'react';
import {
  CircleHelp,
  ExternalLink,
  Flame,
  Orbit,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Scale,
  ChartNoAxesCombined,
  FileText,
  Activity,
  ArrowUpRight,
  Database,
  FileSearch,
  Layers3,
  LockKeyhole,
  MousePointer2,
  SlidersHorizontal,
  Search,
  Filter,
  CheckCircle2,
  Table2,
  BarChart3,
  Download,
  RotateCcw,
  UploadCloud,
  Check,
  Minus,
  Plus,
  GitCompareArrows,
  Bot,
  Send,
  Loader2,
  ShieldAlert,
  Wind,
  Gauge,
  Radio,
  Info,
  Eye,
  FileDown,
  Code2,
  Server,
  Github,
} from 'lucide-react';

export function IgnisMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Existing orbit-and-ember SVG mark: dashed rose ring, mauve ellipse, amber flame with cream core */}
      <svg
        aria-hidden="true"
        className={`orbital-motif shrink-0 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}
        viewBox="0 0 48 48"
        fill="none"
      >
        {/* Dashed Rose Ring */}
        <circle
          cx="24"
          cy="24"
          r="17"
          stroke="#D1A9A7"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.85"
        />
        {/* Mauve Ellipse */}
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="9"
          transform="rotate(-28 24 24)"
          stroke="#7F5276"
          strokeWidth="1"
          opacity="0.9"
        />
        {/* Amber Flame */}
        <path
          d="M24 12.5c4.1 5.4 6.2 8.9 6.2 12.8A6.2 6.2 0 1 1 17.8 25c0-3.5 2.4-7.7 6.2-12.5Z"
          fill="#F3A65B"
        />
        {/* Cream Core */}
        <path
          d="M24 19.3c2 2.7 2.9 4.5 2.9 6.3a2.9 2.9 0 1 1-5.8 0c0-1.7 1.1-3.5 2.9-6.3Z"
          fill="#FBE5D8"
        />
        {/* Satellite dot */}
        <circle cx="39" cy="12" r="2" fill="#D1A9A7" />
      </svg>

      {!compact && (
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-rose">
            NASA INSIGHTS SYSTEM
          </p>
          <p className="font-display text-xl font-bold tracking-[0.18em] text-cream">
            IGNIS
          </p>
        </div>
      )}
    </div>
  );
}

export {
  CircleHelp,
  ExternalLink,
  Flame,
  Orbit,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Scale,
  ChartNoAxesCombined,
  FileText,
  Activity,
  ArrowUpRight,
  Database,
  FileSearch,
  Layers3,
  LockKeyhole,
  MousePointer2,
  SlidersHorizontal,
  Search,
  Filter,
  CheckCircle2,
  Table2,
  BarChart3,
  Download,
  RotateCcw,
  UploadCloud,
  Check,
  Minus,
  Plus,
  GitCompareArrows,
  Bot,
  Send,
  Loader2,
  ShieldAlert,
  Wind,
  Gauge,
  Radio,
  Info,
  Eye,
  FileDown,
  Code2,
  Server,
  Github,
};
