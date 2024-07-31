/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        tomato: {
          600: '#e53e3e', // Tomato red color
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

