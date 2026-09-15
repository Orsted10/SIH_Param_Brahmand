/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#020617',
          900: '#070d1e',
          850: '#0a1329',
          800: '#0f172a',
          700: '#1e293b',
        },
        isro: {
          saffron: '#d97706',
          navy: '#1e3a8a',
          cyan: '#0891b2',
          emerald: '#059669',
          gold: '#b45309',
          purple: '#7e22ce'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'Prata', 'serif'],
        cursive: ['Dancing Script', 'cursive'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
