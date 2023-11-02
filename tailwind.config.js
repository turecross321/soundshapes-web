/** @type {import('tailwindcss').Config} */

const {createThemes} = require('tw-colors');
const defaultColors = {
    "background": "#2F2A2A",
    "navbar-background": "#181515",
    "navbar-popup-button-hover-background": "#121010",
    "navbar-foreground": "#FFF0E4",
    "form-background": "rgba(0,0,0,0)",
    "container-background": "#FFF0E4",
    "border": "#EED4BF",
    "divider": "#61493C",

    "foreground": "#181515",
    "foreground-secondary": "#FFF0E4",
    "foreground-tertiary": "#FFDCBF",
    "foreground-quaternary": "#494444",
    "placeholder": "#8A7261",
    "gentle": "#8A7261",

    "primary": "#F07167",
    "secondary": "#F4DECC",
    "tertiary": "rgba(0,0,0,0)",
    "dangerous": "#F4DECC",

    "api-retrieve": "#79c501",
    "api-remove": "#ea574d",
    "api-push": "#eeb231",
}

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        colors: {
            "transparent": "rgba(0,0,0,0)",
            "white": "#FFFFFF",
            "code-background": "#000000"
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
            },
            spacing: {
                '128': '32rem'
            }
        },
    },
    plugins: [createThemes({
        default: defaultColors,
        dark: {
            "background": "#0f0f0f",
            "navbar-background": "#0a0a0a",
            "navbar-popup-button-hover-background": "#121010",
            "navbar-foreground": "#FFFFFF",
            "form-background": "rgba(0,0,0,0)",
            "container-background": "#141414",
            "border": "#1c1c1c",
            "divider": "#3f3f3f",

            "foreground": "#FFFFFF",
            "foreground-secondary": "#000000",
            "foreground-tertiary": "#FFDCBF",
            "foreground-quaternary": "#494444",
            "placeholder": "#605a5a",
            "gentle": "#adadad",

            "primary": "#d9d9d9",
            "secondary": "#212121",
            "tertiary": "rgba(0,0,0,0)",
            "dangerous": "#212121",

            "api-retrieve": "#79c501",
            "api-remove": "#ea574d",
            "api-push": "#eeb231",
        },
        monochrome: {
            "background": "#ffffff",
            "navbar-background": "#ffffff",
            "navbar-popup-button-hover-background": "#e8e8e8",
            "navbar-foreground": "#000000",
            "form-background": "rgba(0,0,0,0)",
            "container-background": "#ffffff",
            "border": "#000000",
            "divider": "#000000",

            "foreground": "#000000",
            "foreground-secondary": "#ffffff",
            "foreground-tertiary": "#FFDCBF",
            "foreground-quaternary": "#494444",
            "placeholder": "#605a5a",
            "gentle": "#707070",

            "primary": "#252525",
            "secondary": "#e7e7e7",
            "tertiary": "rgb(255,255,255)",
            "dangerous": "#e7e7e7",

            "api-retrieve": "#79c501",
            "api-remove": "#ea574d",
            "api-push": "#eeb231",
        },
        refresh: {
            "background": "#0F0814",
            "navbar-background": "#261731",
            "navbar-popup-button-hover-background": "#1e1226",
            "navbar-foreground": "#F7F7F7",
            "form-background": "#2A1936",
            "container-background": "#1B0F23",
            "border": "rgba(0,0,0,0)",
            "divider": "#13071A",

            "foreground": "#F7F7F7",
            "foreground-secondary": "#F7F7F7",
            "foreground-tertiary": "#F7F7F7",
            "foreground-quaternary": "#494444",
            "placeholder": "#87748A",
            "gentle": "#C3C3C3",

            "primary": "#A13DE3",
            "secondary": "#87748A",
            "tertiary": "#100915",
            "dangerous": "#E52E2E",

            "api-retrieve": "#52BC24",
            "api-remove": "#E52E2E",
            "api-push": "#2D43E5"
        }
    })],
}

