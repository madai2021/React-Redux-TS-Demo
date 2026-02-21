import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
    publicPath: "/React-Redux-TS-Demo/",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
