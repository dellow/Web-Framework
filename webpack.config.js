/**
 *
 * Wepback > Config
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

const srcPath = './src/'
const distPath = './src/dist/'

const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackCleanPlugin = require('webpack-clean')

module.exports = (env, argv) => {  
  return {
    entry: {
      'js/app': path.resolve(__dirname, distPath + 'js/app/entry.js'),
      'js/common': path.resolve(__dirname, distPath + 'js/common/entry.js'),
      'css/fonts': path.resolve(__dirname, distPath + 'scss/entry-fonts.scss'),
      'css/theme': path.resolve(__dirname, distPath + 'scss/entry-theme.scss'),
      'css/base': path.resolve(__dirname, distPath + 'scss/entry-base.scss'),
      'css/utility': path.resolve(__dirname, distPath + 'scss/entry-utility.scss')
    },
    output: {
      path: path.resolve(__dirname, srcPath + 'build'),
      filename: '[name].js'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js'],
      alias: {
        classes: path.resolve(__dirname, distPath + 'js/app/classes'),
        routes: path.resolve(__dirname, distPath + 'js/app/routes')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.vue-scss/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]', // Name of the file.
            publicPath: '/build/', // Path in the CSS file.
            context: distPath // Context removal.
          }
        }
      ]
    },
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { 
              discardComments: { 
                removeAll: true 
              } 
            }]
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new VueLoaderPlugin(),
      new WebpackCleanPlugin([
        srcPath + 'build/css/fonts.js',
        srcPath + 'build/css/base.js',
        srcPath + 'build/css/theme.js',
        srcPath + 'build/css/utility.js'
      ]),
      new WebpackBuildNotifierPlugin({
        title: 'Webpack',
        suppressSuccess: false
      })
    ]
  }
}