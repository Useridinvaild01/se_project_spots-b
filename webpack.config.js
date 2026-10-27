import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./scripts/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    clean: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "images",
          to: "images",
        },
        {
          from: "favicon.ico",
          to: "favicon.ico",
        },
      ],
    }),
  ],

  mode: "development",
};
