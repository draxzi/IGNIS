import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#180018',
        nebula: '#2B124C',
        cosmic: '#512A59',
        mauve: '#7F5276',
        rose: '#D1A9A7',
        cream: '#FBE5D8',
        amber: '#F3A65B',
        muted: '#C4A9BC',
        // Semantic aliases aligned strictly with the palette
        panel: 'rgba(36, 16, 47, 0.55)',
        line: '#512A59',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        panel: '0 30px 80px rgba(8, 0, 14, 0.5)',
        'glass-highlight': 'inset 0 1px 0 rgba(251, 229, 216, 0.12)',
        'rose-glow': '0 0 25px rgba(209, 169, 167, 0.25), 0 0 50px rgba(127, 82, 118, 0.2)',
        'amber-glow': '0 0 25px rgba(243, 166, 91, 0.35), 0 0 60px rgba(243, 166, 91, 0.15)',
        'floating-card': '0 20px 50px rgba(8, 0, 14, 0.6), inset 0 1px 0 rgba(251, 229, 216, 0.15)',
      },
      keyframes: {
        'orbit-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-rotate-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scale(1) translateY(0)', opacity: '0.96' },
          '25%': { transform: 'scale(1.02, 0.98) translateY(-2px)', opacity: '1' },
          '50%': { transform: 'scale(0.98, 1.03) translateY(-4px)', opacity: '0.94' },
          '75%': { transform: 'scale(1.01, 0.99) translateY(-1px)', opacity: '0.98' },
        },
        'spherical-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 16px rgba(243,166,91,0.6))' },
          '50%': { transform: 'scale(1.04)', filter: 'drop-shadow(0 0 28px rgba(243,166,91,0.9))' },
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) translateY(200%) rotate(45deg)' },
        },
        'cloud-drift-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.1)' },
        },
        'cloud-drift-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, 50px) scale(1.08)' },
        },
        'aurora-morph': {
          '0%, 100%': { opacity: '0.25', transform: 'rotate(0deg) scale(1)' },
          '50%': { opacity: '0.45', transform: 'rotate(180deg) scale(1.15)' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'orbit-rotate': 'orbit-rotate 40s linear infinite',
        'orbit-rotate-reverse': 'orbit-rotate-reverse 35s linear infinite',
        'flame-flicker': 'flame-flicker 2.5s ease-in-out infinite',
        'spherical-pulse': 'spherical-pulse 4s ease-in-out infinite',
        'sheen-sweep': 'sheen-sweep 6s ease-in-out infinite',
        'cloud-drift-1': 'cloud-drift-1 50s ease-in-out infinite',
        'cloud-drift-2': 'cloud-drift-2 60s ease-in-out infinite',
        'aurora-morph': 'aurora-morph 30s ease-in-out infinite',
        'marquee': 'marquee-scroll 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
