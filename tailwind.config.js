/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  daisyui: {
    themes: [
      {
        light: {
          "accent": "#5c979d",
          "neutral": "#f3f8f8",
          "base-100": "#ececf4",
        },
        dark: {
          "accent": "#629ca3",
          "neutral": "#314348",
          "base-100": "#11111B",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
