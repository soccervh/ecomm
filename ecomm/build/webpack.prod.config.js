const webpack = require(`webpack`);
const BundleTracker = require(`webpack-bundle-tracker`);
const path = require(`path`);
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
let config = null;
config = require(`./webpack.base.config.js`);

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const prodConfig = merge(config, {
  mode: "production",
  devtool: "hidden-source-map",
  output: {
    path: path.join(__dirname, `../assets/bundles`),
    filename: `[name]-bundle-[chunkhash].min.js`,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(`production`) },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    new BundleTracker({ filename: `./webpack-prod-stats.json`, logTime: true }),
    // new webpack.optimize.ModuleConcatenationPlugin()
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
    new SentryWebpackPlugin({
      include: "./assets/bundles/",
      urlPrefix: "~/static/bundles/",
      validate: true,
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: `css-loader` },
          { loader: `postcss-loader` },
          { loader: `sass-loader` },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: `babel-loader` }],
        exclude: /node_modules/,
        include: path.join(__dirname, `../assets/js`),
      },
    ],
  },
});
module.exports = prodConfig;
