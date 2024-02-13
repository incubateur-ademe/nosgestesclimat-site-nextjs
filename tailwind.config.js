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
          400: '#6D418F',
          /**
           * Main elements or text
           */
          500: '#491273',
          /**
           * Darker text
           */
          700: '#3A0E5B',
          800: '#2A0A42',
        },
        secondary: '#D40983',
        default: '#1A1A1A',
        grey: {
          100: '#F8F8F7',
          200: '#E3E3DB',
        },
        categories: {
          transport: '#bc0b69',
          alimentation: '#e58e26',
          logement: '#04a4ac',
          divers: '#006ccb',
          servicessocietaux: '#0c2461',
        },
      },
      fontSize: {
        '3xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        valuechange: {
          '0%': { opacity: 0, transform: 'translateX(-10%)' },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(10%)' },
        },
        iconsRotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        valuechange: 'valuechange 3s ease-out infinite',
        iconsRotation: 'iconsRotation 1s ease-in-out',
      },
      backgroundImage: {
        'icons-mobile': "url('/images/misc/mobileIcons.svg')",
      },
    },
  },
  safelist: [
    'text-categories-transport',
    'text-categories-alimentation',
    'text-categories-logement',
    'text-categories-divers',
    'text-categories-servicessocietaux',
    'bg-categories-transport',
    'bg-categories-alimentation',
    'bg-categories-logement',
    'bg-categories-divers',
    'bg-categories-servicessocietaux',
    'fill-categories-transport',
    'fill-categories-alimentation',
    'fill-categories-logement',
    'fill-categories-divers',
    'fill-categories-servicessocietaux',
    'border-categories-transport',
    'border-categories-alimentation',
    'border-categories-logement',
    'border-categories-divers',
    'border-categories-servicessocietaux',
  ],
  plugins: [],
}
