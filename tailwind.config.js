/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#335257",
          "secondary": "#dbdbeb",
          "accent": "#5c979d",
          "neutral": "#1c1c31",
          "base-100": "#ececf4",
        },
        dark: {
          "primary": "#a8c7cc",
          "secondary": "#25273A",
          "accent": "#629ca3",
          "neutral": "#2F3348",
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
