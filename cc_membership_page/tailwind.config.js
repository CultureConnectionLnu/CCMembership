/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "7px 7px 4px 1px rgba(0, 0, 0, 1);"
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-/,
      variants: ['hover', 'focus'],
    },
  ],
}