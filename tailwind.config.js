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
          950: '#030712',
          900: '#070c1b',
          850: '#0a1128',
          800: '#0f172a',
          700: '#1e293b',
        },
        isro: {
          saffron: '#FF9933',
          navy: '#000080',
          cyan: '#00F0FF',
          emerald: '#10B981',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Hanken Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'Prata', 'serif'],
        cursive: ['Dancing Script', 'cursive'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 240, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
