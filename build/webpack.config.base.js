/* basic webpack settings */

const path = require('path');
const openVueLoaderOptions = require('./vue-loader.config');


// 判断当前环境类别
const isDev = process.env.NODE_ENV === 'development';

// 配置项
const config = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../client/index.js'),
  ],
  output: {
    filename: 'RE_bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: openVueLoaderOptions(isDev)
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.\jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|font|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[path].[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
