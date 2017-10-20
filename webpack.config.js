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

module.exports = {
  entry: {
    'js/app': path.resolve(__dirname, './src/dist/js/app/entry.js'),
    'js/common': path.resolve(__dirname, './src/dist/js/common/entry.js'),
    'css/app': path.resolve(__dirname, './src/dist/css/scss/entry.scss')
  },
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
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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
      './src/build/css/app.js' // Remove errand .js files in the build.
    ]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
