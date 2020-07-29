const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  context: __dirname,
  devtool: "eval-cheap-module-source-map",
  entry: {
    index: "./ecomm/assets/ts/index",
    tailwind: "./ecomm/assets/sass/tailwind.scss",
  },
  output: {
    publicPath: `http://0.0.0.0:8080/assets/bundles/`,
    path: path.resolve("./ecomm/assets/bundles"),
    filename: "[name].bundle.js",
  },
  plugins: [
    isDevelopment &&
      new ReactRefreshWebpackPlugin({ overlay: { sockPort: 8080 } }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              // ... other options
              // DO NOT apply the Babel plugin in production mode!
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
          { loader: "ts-loader" },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: `style-loader` },
          { loader: `css-loader?` },
          { loader: `postcss-loader` },
          // {loader:`resolve-url-loader`},
          { loader: `sass-loader?sourceMap` },
        ],
        // include: path.join(__dirname, "assets/sass")
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".gql"],
  },
  devServer: {
    port: 8080,
    hot: true,
    host: "0.0.0.0",
    headers: {
      "access-control-allow-origin": "*",
    },
    disableHostCheck: true,
  },
};
