const some = require("lodash/some");

const path = require(`path`);

// export const exposedPort = 8042;
module.exports = {
  context: __dirname,

  entry: {
    index: "../assets/ts/index",
    tailwind: "../assets/sass/tailwind.scss",},

  output: {
    path: path.resolve(`../assets/bundles/`),
    filename: `[name]-bundle.js`,
  },

  plugins: [],

  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [{ loader: `style-loader` }, { loader: `css-loader` }],
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },

      {
        test: /\.tsx?$/,
        use: [{ loader: `babel-loader` }, { loader: `ts-loader` }],
        exclude: /node_modules/,
      },

      {
        test: /\.less?$/,
        use: [{ loader: `style-loader` }, { loader: `css-loader` }, { loader: `less-loader` }],
      },

      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: `url-loader`,
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: `file-loader` }],
      },
    ], // add all common loaders here
  },

  resolve: {
    modules: [
      "node_modules",
      path.join(__dirname, `../assets/ts`),
      path.join(__dirname, `../assets/sass`),
      path.join(__dirname, `../node_modules/slick-carousel/slick`), // Youtube slider is this.
    ],
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `.scss`],
    alias: {
      "~index": path.join(__dirname, `../assets/ts/index`),
      "~common": path.join(__dirname, `../assets/ts/common`),
      "tailwindcss/lib/util/createUtilityPlugin": path.join(
        __dirname,
        `../assets/ts/pagebuilder/containers/createUtilityPlugin.js`,
      ),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: (module) => {
            let adminModules = [
              `semantic-ui-react`,
              "semantic-ui-css",
              "react-sortable-hoc",
              "react-beautiful-dnd",
              "react-chartjs-2",
            ];
            const t =
              /[\\/]node_modules[\\/](.*)[\\/]/.test(module.resource) &&
              !some(adminModules, module.resource);
            // console.log(t,  module.resource)
            return t;
          },
          chunks: "all",
        },
      },
    },
  },
};
