/** @type {import('tailwindcss').Config} */
const config = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
