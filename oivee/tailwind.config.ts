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
          bg: '#0B0B0C',
          surface: '#121214',
          surfaceAlt: '#17171B',
          border: '#1F1F23',
          primary: '#C9A84C',
          primaryHover: '#B7953D',
          text: '#EDEDED',
          textMuted: '#8E8E93',
        },
      },
      fontFamily: {
        heading: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        body: ['var(--font-body)', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.035em',
        tightest: '-0.04em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E5C76B 50%, #C9A84C 100%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)',
        'radial-gold-top': 'radial-gradient(ellipse at top, rgba(201,168,76,0.07) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(201,168,76,0.08)',
        'gold-md': '0 4px 16px rgba(201,168,76,0.10), 0 2px 4px rgba(201,168,76,0.05)',
        'gold-lg': '0 8px 32px rgba(201,168,76,0.14), 0 4px 8px rgba(201,168,76,0.07)',
        'gold-glow': '0 0 40px rgba(201,168,76,0.14)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-gold': 'pulseGold 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
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
        pulseGold: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
