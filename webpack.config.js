const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const main = path.resolve(__dirname, "./src/app.js");
const example = path.resolve(__dirname, "./example/app.js");
const dist = path.resolve(__dirname, "./dist");
const src = path.resolve(__dirname, "./src");
const exampleFolder = path.resolve(__dirname, "./example");
const v_domStudy = path.resolve(__dirname, "example/v-domStudy.html");

module.exports = {
  mode: "development",
  entry: [main, example],
  output: {
    filename: "[name].js",
    path: dist,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
        test: /\.m?js$/,
        exclude: [/node_modules/],
        include: [/node_modules\/snabbdom/, src, exampleFolder],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: v_domStudy,
      filename: "v-domStudy.html",
    }),
  ],
};
