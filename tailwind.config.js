const defaultColors = {

  "backdrop": "#2F2A2A",
  "text": "#181515",
  "text-placeholder": "#8A7261",
  "button": "#F4DECC",
  "button-hover": "#DCC8B8",
  "input": "#EED4BF",
  "accent": "#F07167",
  "accent-hover": "#d8665d",
  "accent-text": "#FFF0E4", /* text that should be used when bg is accent  */


  "border": "#EED4BF",
  "divider": "#61493C",
  "container": "#FFF0E4",
  "popup": "#FFF0E4",

  "footer": "#181515",
  "footer-text": "#FFF0E4",

  "header": "#181515",
  "header-hover": "#110f0f",
  "header-menu": "#1c1919",
  "header-text": "#FFF0E4",
  "header-input": "#FFDCBF",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: defaultColors,
    extend: {
      colors: {
        "black": "#000000",
        "transparent": '#00000000'
      },
      height: {
        'navbar-hamburger-menu': 'calc(100vh - 60px)'
      },
    },
  },
  plugins: [],
}

