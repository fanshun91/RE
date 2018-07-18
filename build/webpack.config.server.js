const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 判断当前环境类别
const isDev = process.env.NODE_ENV === 'development';

let config;

let defaultPlugin = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
];

if (isDev) {

}

config = merge(baseConfig, {
  target: 'node',
  entryL: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget = "commonjs2",
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  devtool: 'source-map',
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
  devServer,
  plugins: defaultPlugin.concat(
    new webpack.HotModuleReplacementPlugin() //热加载插件
  )
});

module.exports = config;
