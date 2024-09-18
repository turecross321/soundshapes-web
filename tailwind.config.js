const defaultColors = {
  "backdrop": "#2F2A2A",
  "header": "#181515",
  "header-hover": "#121010",
  "header-text": "#FFF0E4",
  "container": "#FFF0E4",
  "border": "#EED4BF",
  "divider": "#61493C",

  "text": "#181515",
  "accent": "#F07167"
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: defaultColors,
    extend: {},
  },
  plugins: [],
}

