
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js'
import path from 'path'
import webpackPkg from 'webpack';
import exposedJson from './federation-expose.js'
import sharedJson from './federation-shared.js'
import * as dotenv from 'dotenv' 
import { fileURLToPath } from 'url';

const { DefinePlugin } = webpackPkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Dotenv = dotenv.config({
  path: `./.env`,
})
const config = {
  entry: './src/index',
  mode: 'development',
  resolve: {
    symlinks: true,
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: path.join(__dirname,'dist', 'bootstrap.js'),
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  target: 'web',
  output: {
    publicPath: 'auto',
    crossOriginLoading: 'anonymous',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        resolve:{
          fullySpecified:false
        },
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(jpg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      process: { env: JSON.stringify(Dotenv.parsed) },
    }),
    new ModuleFederationPlugin({
      name: 'remotes',
      filename: "remoteEntry.js",
      exposes: exposedJson,
      shared: sharedJson,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

export default config
