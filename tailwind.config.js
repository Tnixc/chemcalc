/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  daisyui: {
    themes: ["emerald","dark"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
