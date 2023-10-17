/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        colors: {
            "primary": "#F07167",
            "button-lighter-background": "#ffead6",
            "button-background": "#F4DECC",
            "button-darker-background": "#e5d2c3",
            "text": "#181515",
            "placeholder": "#8A7261",

            "dark-background": "#181515",
            "darker-background": "#121010",
            "light": "#FFF0E4",
            "lighter": "#FFDCBF",
            "light-divider": "#FFF0E4",

            "divider": "#61493C",
            "border": "#EED4BF",
            "background": "#2F2A2A",
            "container-background": "#FFF0E4",
            "transparent": "rgba(0,0,0,0)",

            "api-retrieve": "#79c501",
            "api-remove": "#ea574d",
            "api-push": "#eeb231",
        },
        extend: {
            keyframes: {
                toast: {
                    '0%': {transform: 'translateX(-100%)'},
                    '10%': {transform: 'translateX(0%)'},
                    '50%': {transform: 'translateX(0%)'},
                    '90%': {transform: 'translateX(-500%)'},
                }
            },
            animation: {
                toast: 'toast 5s',
            }
        },
    },
    plugins: [],
}

