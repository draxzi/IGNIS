import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#180018',
        panel: '#24102f',
        line: '#512A59',
        cyan: '#D1A9A7',
        amber: '#F3A65B',
        blue: '#C28DAF',
        mauve: '#7F5276',
        cream: '#FBE5D8',
        muted: '#C4A9BC',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        panel: '0 18px 60px rgba(8, 0, 14, .34)',
        glow: '0 0 0 1px rgba(209,169,167,.16), 0 0 34px rgba(127,82,118,.18)',
      },
      keyframes: {
        'orbit-drift': { '0%, 100%': { transform: 'rotate(-8deg) translate3d(0, 0, 0)' }, '50%': { transform: 'rotate(-5deg) translate3d(3px, -2px, 0)' } },
        'star-breathe': { '0%, 100%': { opacity: '0.35' }, '50%': { opacity: '0.85' } },
      },
      animation: {
        'orbit-drift': 'orbit-drift 12s ease-in-out infinite',
        'star-breathe': 'star-breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
