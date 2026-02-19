/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#d4a853', light: '#f5f0e8', border: '#e8dcc8' },
        page: '#fafaf8',
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
};
