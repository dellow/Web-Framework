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
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackCleanPlugin = require('webpack-clean')

module.exports = (env, argv) => {  
  return {
    entry: {
      'js/site': path.resolve(__dirname, distDirectoryPath + 'js/entry.js'),
      'js/common': path.resolve(__dirname, distDirectoryPath + 'js/common/entry.js'),
      'css/fonts': path.resolve(__dirname, distDirectoryPath + 'scss/entry-fonts.scss'),
      'css/theme': path.resolve(__dirname, distDirectoryPath + 'scss/entry-theme.scss'),
      'css/base': path.resolve(__dirname, distDirectoryPath + 'scss/entry-base.scss'),
      'css/utility': path.resolve(__dirname, distDirectoryPath + 'scss/entry-utility.scss')
    },
    output: {
      path: path.resolve(__dirname, buildDirectoryPath),
      filename: '[name].js'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js'],
      alias: {
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
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
            publicPath: buildPublicPath, // Path in the CSS file.
            context: distDirectoryPath // Context removal.
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
        buildDirectoryPath + '/css/fonts.js',
        buildDirectoryPath + '/css/base.js',
        buildDirectoryPath + '/css/theme.js',
        buildDirectoryPath + '/css/utility.js'
      ]),
      new WebpackBuildNotifierPlugin({
        title: 'Web Framework',
        suppressSuccess: false
      })
    ]
  }
}