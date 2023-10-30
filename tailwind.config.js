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
        primary: '#491273',
        primaryLight: '#E8DFEE',
        primaryDark: '#2A0A42',
        primaryBorder: '#2A0A42',
        secondary: '#D40983',
        lightGrey: '#F8F8F7',
        default: '#111',
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
