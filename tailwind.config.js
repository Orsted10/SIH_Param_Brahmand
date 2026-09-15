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
          saffron: '#FF9933',
          navy: '#000080',
          cyan: '#00F0FF',
          emerald: '#10B981',
          gold: '#F59E0B',
          purple: '#A855F7'
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
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 45px rgba(0, 240, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
