const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin'); // 为bundles提供html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 替代 extract-text-webpack-plugin
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // build时搜索css资源，并加以优化
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin')


// 判断当前环境类别
const isDev = process.env.NODE_ENV === 'development';

let config;

let devServer = {
  host: '0.0.0.0',
  port: 8010,

  // 编译错误显示在页面上
  overlay: {
    errors: true
  },

  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/index.html'
  },

  // 热加载
  hot: true
};

let defaultPlugin = [
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'index.html')
  }),
  new VueClientPlugin()
];

if (isDev) { // 开发环境

  // use webpack-merge
  config = merge(baseConfig, {
    mode: "development",
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
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

} else { // 生产环境

  config = merge(baseConfig, {
    mode: "production",
    entry: {
      polyfill: 'babel-polyfill',
      app: path.join(__dirname, '../client/create-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
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
    optimization: {
      // namedModules: true,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCssPlugin()
      ],

      // 区分打包
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
          }
        }
      },

      runtimeChunk: {
        name: 'runtime'
      },

      noEmitOnErrors: true,
      concatenateModules: true
    },
    plugins: defaultPlugin.concat(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    )
  });

}

module.exports = config;
