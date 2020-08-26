const path = require(`path`);
const webpack = require(`webpack`);
const BundleTracker = require(`webpack-bundle-tracker`);
const merge = require("webpack-merge");
const config = require(`./webpack.base.config.js`);
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const ip = `0.0.0.0`;
const exposedPort = 8080;
module.exports = merge(config, {
  mode: "development",
  // devtool: 'inline-source-map',
  devtool: "cheap-module-source-map",
  output: {
    publicPath: `http://${ip}:${exposedPort}/assets/bundles/`,
    pathinfo: true,
  },
  resolve: {
    alias: {},
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(`development`) },
    }),
    new BundleTracker({ filename: `./webpack-stats.json`, logTime: true }),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: exposedPort,
      },
    }),
  ],
  module: {
    rules: [
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
      // {
      //   test: /\.jsx?$/,
      //   loader: [`babel-loader`],
      //   exclude: /node_modules/,
      //   include: path.join(__dirname, `assets/js`)
      // }
    ],
  },

  devServer: {
    // compress: true,
    hot: true,
    host: "0.0.0.0",
    port: exposedPort,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    //
    // stats: {
    //   warnings: false
    // }
  },
});
