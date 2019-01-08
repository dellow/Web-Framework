/**
 *
 * Wepback > Config
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanPlugin = require('webpack-clean')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const entry = {
  'js/app': path.resolve(__dirname, './src/dist/js/app/entry.js'),
  'js/app.min': path.resolve(__dirname, './src/dist/js/app/entry.js'),
  'js/common': path.resolve(__dirname, './src/dist/js/common/entry.js'),
  'js/common.min': path.resolve(__dirname, './src/dist/js/common/entry.js'),
  'css/app': path.resolve(__dirname, './src/dist/css/scss/entry.scss'),
  'css/app.min': path.resolve(__dirname, './src/dist/css/scss/entry.scss')
}

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, './src/build'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      classes: path.resolve(__dirname, './src/dist/js/app/classes'),
      routes: path.resolve(__dirname, './src/dist/js/app/routes')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(),
                require('cssnano')()
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ]
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'Webpack',
      suppressSuccess: false
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new WebpackCleanPlugin([
      './src/build/css/app.js',
      './src/build/css/app.min.js'
    ]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: [
        /\.min\.js$/,
        /\.min\.css$/
      ],
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
