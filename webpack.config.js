import path from "path";
import webpack from "webpack";
import htmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/**
 * Load JS and JSX files through Babel
 */
const babelLoader = {
  rules: [
    {
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { 'runtime': "automatic" }],
          ],
        },
      },
      // By default this is true, setting to false means
      // we don't have to specify the extension for .mjs
      // files or packages where package.json type is module.
      resolve: {
        fullySpecified: false,
      },
    },
  ],
};

const styleLoader = {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

/**
 * Webpack needs to know to look for JSX files
 */
const resolve = {
  extensions: [".js", ".jsx"],
};

const serverConfig = {
  target: "node",
  mode: "development",
  entry: "./src/server/server.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "server.cjs",
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.css$/,
        use: ["null-loader"],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3001,
    }),
  ],
  resolve,
};

const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./src/client/index.jsx",
  output: {
    path: path.resolve("dist"),
    /*
     * Appends /static to index.html when looking for client.js
     * This is where Express is serving static files from
     */
    publicPath: "/static",
    filename: "client.js",
  },
  module: {
    rules: [babelLoader, styleLoader],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve("src", "client", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  resolve,
};

export default [serverConfig, clientConfig];
