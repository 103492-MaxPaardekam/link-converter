/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./qc.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#121212",
        cream: "#f7f3ea",
        sand: "#ded2bd",
        teal: "#0f766e",
        rust: "#a44200",
      },
      boxShadow: {
        card: "0 18px 45px rgba(18, 18, 18, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        appear: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        appear: "appear 300ms ease-out",
      },
    },
  },
  plugins: [],
};
