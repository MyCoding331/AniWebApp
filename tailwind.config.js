/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Screens/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      GridTemplateColumns: {
        'grid-cols-3':	'repeat(auto-fill, minmax(100px, auto))'
      }
    },
  },
  plugins: [],
}
