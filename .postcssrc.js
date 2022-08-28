/** @type {import("postcss").ProcessOptions} */

const config = {
  plugins: [require("autoprefixer"), require("cssnano")],
};

module.exports = config;
