/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0A0A',
          surface: '#151515',
          card: '#1B1B1B',
          muted: '#242424',
          border: '#333333',
          borderLight: '#444444',
          text: '#F5F1EA',
          textMuted: '#A7A29B',
          accent: '#A88B65',
          accentHover: '#BA9C76',
          accentDark: '#8A7050',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
        'editorial': '0.18em',
      },
      animation: {
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
