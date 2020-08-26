module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")({ browsers: ["last 2 versions"], grid: false }),
  ],
};
