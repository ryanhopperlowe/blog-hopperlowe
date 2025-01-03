import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: "inherit",
              "&:hover": {
                textDecoration: "inherit",
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography, nextui()],
} satisfies Config;
