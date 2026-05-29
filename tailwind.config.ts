import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Fira Sans', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif Hebrew', 'Georgia', 'serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
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
        // Sacred earthy palette
        'forest-black': '#283618',
        'deep-olive': '#5B6E1D',
        'parchment-cream': '#FEFAE0',
        'olive-accent': '#92D51F',
        'burnt-gold': '#D98B0F',
        'manuscript': '#F7E8C2',
        'scroll-warm': '#F8EDD2',
        'cream-soft': '#FCF5DA',
        'text-sacred': '#FEFAE0',
        'text-soft': 'rgba(254,250,224,0.78)',
        'surface-forest': '#2F4D1E',
        'surface-layer': '#354F20',
        'border-organic': 'rgba(146,213,31,0.24)',
        'shadow-dark': 'rgba(0,0,0,0.35)',
        // Compatibility palette
        primary: '#283618',
        'rich-black': '#283618',
        'oxford-blue': '#283618',
        'golden-orange': '#D98B0F',
        'soft-light-gray': '#FEFAE0',
        white: '#FEFAE0',
        'avast-navy': '#283618',
        'avast-dark': '#283618',
        'avast-darker': '#283618',
        'avast-cyan': '#92D51F',
        'avast-cyan-light': '#D98B0F',
        'avast-cyan-dim': 'rgba(146,213,31,0.35)',
        'avast-gray': '#FEFAE0',
        'avast-gray-light': '#F7E8C2',
        'avast-surface': '#283618',
        'avast-surface-light': '#354F20',
        olive: '#5B6E1D',
        deep: '#283618',
        cream: '#FEFAE0',
        gold: '#D98B0F',
        bronze: '#D98B0F',
        midnight: '#283618',
        parchment: '#FEFAE0',
        sage: '#5B6E1D',
        smoke: '#FEFAE0',
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
