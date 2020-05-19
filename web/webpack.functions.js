const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  optimization: { minimize: process.env.NODE_ENV !== "development" },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false }), new Dotenv()]
};
