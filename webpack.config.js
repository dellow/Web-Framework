/**
 *
 * Wepback > Config
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

import webpack from 'webpack'
import path from 'path'

var packageConfig = require('./package.json')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './' + packageConfig.config.js.dirApp + 'index.js'),
    common: path.resolve(__dirname, './' + packageConfig.config.js.dirCommon + 'index.js')
  },
  output: {
    path: path.resolve(__dirname, './' + packageConfig.config.js.dest),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      // 'handlebars': 'handlebars/dist/handlebars.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
