/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    colors: {
      primary: {
        base: "var(--color-primary)",
        hover: "var(--color-primary-hover)",
        active: "var(--color-primary-active)",
        other: "var(--color-primary-other)",
        disable: "var(--color-primary-disable)",
        textDisable: "var(--color-primary-text-disable)",
        white: "var(--color-primary-white)",
      },
      text: {
        base: "var(--color-text-base)",
        secondary: "var(--color-text-secondary)",
        light: "var(--color-text-light)",
        gray: "var(--color-text-gray)",
        white: "var(--color-text-white)",
      },
      bg: {
        base: "var(--color-bg-base)",
        muted: "var(--color-bg-muted)",
        white: "var(--color-bg-white)",
      },
    },
    fontSize: {
      xxs: "var(--text-xxs)",
      xs: "var(--text-xs)",
      DEFAULT: "var(--text-base)",
      title: "var(--text-title)",
      text18: "var(--text-18)",
    },
    borderRadius: {
      none: "0",
      sm: "var(--round-base)",
      DEFAULT: "var(--round-md)",
      lg: "var(--round-lg)",
    },
    extend: {
      boxShadow: {
        itemHover: "0px 12px 32px 0px rgba(4,8,35,0.0933)",
      },
    },
  },
};
