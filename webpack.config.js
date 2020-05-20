/**
 *
 * Wepback > Config
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

// Defaults.
const distDirectoryPath = './src/dist/'
const buildDirectoryPath = './src/build/'
const buildPublicPath = '/build/'

// Config.
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackCleanPlugin = require('webpack-clean')

module.exports = (env, argv) => {
  return {
    entry: {
      'js/site': path.resolve(__dirname, distDirectoryPath + 'js/entry.js'),
      'js/common': path.resolve(__dirname, distDirectoryPath + 'js/common/entry.js'),
      'css/theme': path.resolve(__dirname, distDirectoryPath + 'scss/theme/entry.scss'),
      'css/utility': path.resolve(__dirname, distDirectoryPath + 'scss/framework/utility/entry.scss'),
    },
    output: {
      path: path.resolve(__dirname, buildDirectoryPath),
      filename: (argv.mode === 'production') ? '[name].min.js' : '[name].js',
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
      },
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
        },
        {
          test: /\.vue-scss/,
          exclude: /node_modules/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')(),
                ],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')(),
                ],
              },
            },
            'sass-loader'
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]', // Name of the file.
            publicPath: buildPublicPath, // Path in the CSS file.
            context: distDirectoryPath, // Context removal.
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new MinifyPlugin(),
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            sourceMap: true
          },
          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
            }],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: (argv.mode === 'production') ? '[name].min.css' : '[name].css',
      }),
      new VueLoaderPlugin(),
      new WebpackCleanPlugin([
        buildDirectoryPath + '/css/theme.js',
        buildDirectoryPath + '/css/theme.min.js',
        buildDirectoryPath + '/css/utility.js',
        buildDirectoryPath + '/css/utility.min.js',
      ]),
      new WebpackBuildNotifierPlugin({
        title: 'Web Framework',
        suppressSuccess: false,
        successSound: false,
      }),
    ],
  }
}