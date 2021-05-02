//****************
// Packages to install:
//  npm install react --save
//  npm install react-dom --save
//  npm install webpack --save
//  npm install webpack-dev-server --save
//  npm install webpack-cli --save
//  npm install babel-core --save-dev
//  npm install babel-loader --save-dev
//  npm install babel-preset-env --save-dev
//  npm install babel-preset-react --save-dev
//  npm install html-webpack-plugin --save-dev
//  npm i babel-preset-typescript
//  npm i --save-dev @types/react
//  npm i --save-dev @types/react-dom
//  npm install --save-dev typescript
//  npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
//  npm install file-loader --save-dev
//****************
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require("path");

const APP_PATH = path.resolve(__dirname, "src");

module.exports = {
  entry: APP_PATH + "/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    //Define as importações absolutas através do valor do paths no tsconfig.json
    plugins: [new TsconfigPathsPlugin()], 
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};