const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueServerPlugin = require('vue-server-renderer/server-plugin');

// 判断当前环境类别
const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.[contenthash:8].css'
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
  new VueServerPlugin()
];

// if (isDev) {
//   plugins.push(new VueServerPlugin())
// }

let config;

config = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: "commonjs2",
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins
});

module.exports = config;
