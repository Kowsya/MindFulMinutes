const c = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: c('paper'),
        surface: c('surface'),
        ink: c('ink'),
        muted: c('muted'),
        line: c('line'),
        tide: c('tide'),
        dusk: c('dusk'),
        glow: c('glow'),
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.4)', opacity: '0.55' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        pacer: {
          '0%, 100%': { transform: 'scale(0.7)' },
          '50%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bob: 'bob 6s ease-in-out infinite',
        ripple: 'ripple 9s ease-out infinite',
        pacer: 'pacer 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
