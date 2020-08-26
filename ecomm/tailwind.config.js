module.exports = {
  plugins: [
    // tailwind.config.js
    require("@tailwindcss/ui"),
  ],
  variants: {
    borderStyle: ["hover", "active"],
  },
  theme: {
    extend: {
      width: { 128: "32rem" },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
};
