const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: "development",
  devServer: {
    port: 9002,
  },
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};
