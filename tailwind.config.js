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
        primaryNew: '#491273',
        primary: '#5758BB',
        // primaryLight: '#E8DFEE',
        primaryLight: '#e6e6f5',
        primaryDark: '#32337B',
        primaryBorder: 'rgba(73, 18, 115, 0.1)',
        title: '#32337B',
        secondary: '#3496E0',
        lightGrey: '#F8F8F7',
        grey: {
          100: '#F8F8F7',
          200: '#E3E3DB',
        },
        pink: {
          100: '#FAF0FA',
          200: '#FEDEF1',
          500: '#D40983',
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
