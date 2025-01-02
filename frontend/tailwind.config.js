/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-purple" : "#0b0225",
        "accent-purple-transparent" : "#18074990",
        "accent-red" : "#ff2850",
        "accent-black" : "#222",
        "accent-white" : "#fafafa"
      },
      fontFamily: {
        "poppins": "Poppins, sans-serif"
      }
    },
  },
  plugins: [],
}