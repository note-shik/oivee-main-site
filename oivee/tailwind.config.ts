import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0F1115',
          surface: '#151821',
          border: '#232734',
          primary: '#D4AF37',
          primaryHover: '#C29B2E',
          text: '#E8EAED',
          textMuted: '#9AA0A6',
          accent: '#6C8CFF',
        },
      },
      fontFamily: {
        heading: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        body: ['var(--font-body)', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.03em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #EDD98A 50%, #D4AF37 100%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)',
        'radial-gold-top': 'radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(212,175,55,0.08)',
        'gold-md': '0 4px 16px rgba(212,175,55,0.10), 0 2px 4px rgba(212,175,55,0.05)',
        'gold-lg': '0 8px 32px rgba(212,175,55,0.14), 0 4px 8px rgba(212,175,55,0.07)',
        'gold-glow': '0 0 40px rgba(212,175,55,0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config
