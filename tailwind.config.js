/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    fontSize: {
      xxs: "12px",
      xs: "13px",
      DEFAULT: "14px",
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      DEFAULT: "6px",
      lg: "8px",
    },
    extend: {
      boxShadow: {
        itemHover: "0px 12px 32px 0px rgba(4,8,35,0.0933)",
      },
    },
  },
};
