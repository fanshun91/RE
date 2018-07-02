const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin'); // 为bundles提供html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 替代 extract-text-webpack-plugin
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // build时搜索css资源，并加以优化
const CssnanoPlugin = require('cssnano'); // 基于postcss的modular minifier

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

  // 热加载
  hot: true
};

let defaultPlugin = [
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'index.html')
  })
];

if (isDev) { // 开发环境

  // use webpack-merge
  config = merge(baseConfig, {
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
    entry: {
      polyfill: 'babel-polyfill',
      app: path.join(__dirname, '../client/index.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
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
      namedChunks: true,
      minimizer: [
        new OptimizeCssPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: CssnanoPlugin,
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
          },
          canPrint: true
        })
      ],

      // 区分打包
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        }
      },

      runtimeChunk: true
    },
    plugins: defaultPlugin.concat(
      new MiniCssExtractPlugin({
        filename: 'app.[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].css'
      })
    )
  });

}

module.exports = config;
