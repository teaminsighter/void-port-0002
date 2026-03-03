import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        accent: '#4ADE80',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
        availPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
        },
        floatBadge: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        explorePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        waveBar: {
          '0%': { height: '15%' },
          '100%': { height: '90%' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        'avail-pulse': 'availPulse 2s ease-in-out infinite',
        'float-badge': 'floatBadge 3.5s ease-in-out infinite alternate',
        'marquee-scroll': 'marqueeScroll 35s linear infinite',
        'explore-pulse': 'explorePulse 2.5s ease-in-out infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
