/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-color': '#33b89f',
        'secondary-color': '#02b1fc',
      },
    },
  },
  plugins: [require("daisyui")],
};
