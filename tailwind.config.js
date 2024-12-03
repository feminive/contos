import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: "#833137",
        white: "#fef9ff",
        black: "#333",
        skin: "#ecd6ca",
        pale: "#e8ded4",
        brown: "#c88687",
        purple: "#5d4e5f",

        // .. rest of the colors
      },
      screens: {
        "custom-sm": "400px", // 1ª definição
        "custom-md": "768px", // 2ª definição
        "custom-lg": "1220px", // 3ª definição
        "custom-xl": "1920px", // 4ª definição
        "custom-xxl": "2400px", // 4ª definição
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          colors: {
            primary: "#c88687", // Marrom
            secondary: "#d5a9b4", //pink
            foreground: "#333",
            background: "#fef9ff",
            danger: "#5d4e5f",
            nabvar: "#c88687",
            // focus: "pink",
            // default: "#ecd6ca",
            content1: "#f4f4f4",
          },
        },
        dark: {
          colors: {
            primary: "#c88687", // Marrom
            secondary: "#d5a9b4", //pink
            foreground: "#333",
            background: "#5d4e5f",
            danger: "#c88687",
            nabvar: "#c88687",
            // focus: "pink",
            default: "#ecd6ca",
            content1: "white",
          },
        },
      },
    }),
  ],
};

// #ede5e8,#a5818f,#4c0420,#2d0213,#1e010c colors.
