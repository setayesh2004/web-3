/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nazanin: ["B Nazanin", "sans-serif"],
        samim:["Samim","sans-serif"]
      },
    },
  },
  plugins: [require("daisyui")],
};
