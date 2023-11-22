/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-marianne)',
      },
      colors: {
        primary: {
          /**
           * Background neutral
           */
          100: '#F6F3F8',
          /**
           * Background element point of interest
           */
          200: '#E8DFEE',
          /**
           * Background element point of interest darker
           */
          300: '#AA90BF',
          /**
           * Hover
           */
          400: '#396866',
          /**
           * Main elements or text
           */
          500: '#315452',
          /**
           * Darker text
           */
          700: '#2a4544',
          800: '#263b3a',
        },
        secondary: '#8B2E9E',
        default: '#122021',
        grey: {
          100: '#F8F8F7',
          200: '#E3E3DB',
        },
      },
      keyframes: {
        valuechange: {
          '0%': { opacity: 0, transform: 'translateX(-10%)' },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(10%)' },
        },
      },
      animation: {
        valuechange: 'valuechange 3s ease-out infinite',
      },
    },
  },
  plugins: [],
}
