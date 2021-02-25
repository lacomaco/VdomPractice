const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const main = path.resolve(__dirname, "./src/app.js");
const dist = path.resolve(__dirname, "./dist");
const mainHTML = path.resolve(__dirname, "./src/index.html");

module.exports = {
  mode: "development",
  entry: {
    main,
  },
  output: {
    filename: "[name].js",
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"],
      },
      {
        test: /.png$|.jpg$|.jpeg$|.gif$/,
        use: [
          {
            loader: "url-loader",
            options: {
              publicPath: dist,
              name: "[name].[ext]?[hash]",
              limit: 5000,
            },
          },
          {
            loader: "file-loader",
            options: {
              publicPath: dist,
              name: "[name].[ext]?[hash]",
            },
          },
        ],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: mainHTML,
    }),
  ],
};
