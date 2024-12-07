import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
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
      },
      screens: {
        "custom-sm": "400px",
        "custom-md": "768px",
        "custom-lg": "1220px",
        "custom-xl": "1920px",
        "custom-xxl": "2400px",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#c88687",
            secondary: "#d5a9b4",
            foreground: "#333",
            background: "#fef9ff",
            danger: "#5d4e5f",
            nabvar: "#c88687",
            content1: "#f4f4f4",
          },
        },
        dark: {
          colors: {
            primary: "#c88687",
            secondary: "#d5a9b4",
            foreground: "#333",
            background: "#5d4e5f",
            danger: "#c88687",
            nabvar: "#c88687",
            default: "#ecd6ca",
            content1: "white",
          },
        },
      },
    }),
  ],
};
