import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif Hebrew', 'Georgia', 'serif'],
        display: ['var(--font-title)', 'system-ui', 'sans-serif'],
        title: ['var(--font-title)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display & hero sizes
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        // Heading sizes
        'heading-xl': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.35', letterSpacing: '0em', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
        'heading-xs': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '600' }],
        // Body text
        'body-lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0em', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.75', letterSpacing: '0em', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '400' }],
        'body-xs': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        // Label & caption
        'label-lg': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
        'label-md': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
        'label-sm': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      colors: {
        // Refined palette
        'forest-black': '#0d1726',
        'deep-olive': '#1f3154',
        'parchment-cream': '#fbf5eb',
        'olive-accent': '#c19f4a',
        'burnt-gold': '#c19f4a',
        'manuscript': '#f6f0e8',
        'scroll-warm': '#f7f1e7',
        'cream-soft': '#fdf7eb',
        'text-sacred': '#f2f4f9',
        'text-soft': 'rgba(242,244,249,0.78)',
        'surface-forest': '#111d2f',
        'surface-layer': '#182b44',
        'border-organic': 'rgba(193,159,74,0.24)',
        'shadow-dark': 'rgba(0,0,0,0.35)',
        // Compatibility palette
        primary: '#0d1726',
        'rich-black': '#0d1726',
        'oxford-blue': '#0d1726',
        'golden-orange': '#c19f4a',
        'soft-light-gray': '#f8f2e9',
        white: '#f8f2e9',
        'avast-navy': '#0d1726',
        'avast-dark': '#0d1726',
        'avast-darker': '#0d1726',
        'avast-cyan': '#c19f4a',
        'avast-cyan-light': '#c19f4a',
        'avast-cyan-dim': 'rgba(193,159,74,0.35)',
        'avast-gray': '#f8f2e9',
        'avast-gray-light': '#f6f0e8',
        'avast-surface': '#0d1726',
        'avast-surface-light': '#182b44',
        olive: '#1f3154',
        deep: '#0d1726',
        cream: '#fbf5eb',
        gold: '#c19f4a',
        bronze: '#c19f4a',
        midnight: '#0d1726',
        parchment: '#fbf5eb',
        sage: '#1f3154',
        smoke: '#f8f2e9',
      },
      boxShadow: {
        'glow-accent': '0 0 16px rgba(146, 213, 31, 0.18)',
        'glow-accent-strong': '0 0 24px rgba(146, 213, 31, 0.28)',
        'glow': '0 8px 24px rgba(40, 54, 24, 0.18)',
        'soft': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.18)',
      },
      backgroundImage: {
        'theme-gradient': 'linear-gradient(135deg, #283618 0%, #5B6E1D 45%, rgba(40, 54, 24, 0.96) 100%)',
        'scroll-gradient': 'linear-gradient(180deg, rgba(254, 250, 224, 0.18), rgba(40, 54, 24, 0.24))',
        'grid-pattern': 'linear-gradient(rgba(146, 213, 31, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(146, 213, 31, 0.08) 1px, transparent 1px)',
        'gold-glow': 'radial-gradient(circle at top left, rgba(217, 139, 15, 0.18), transparent 40%), linear-gradient(180deg, rgba(40, 54, 24, 0.16), rgba(40, 54, 24, 0.95))',
      },
      backgroundSize: {
        'grid': '30px 30px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
