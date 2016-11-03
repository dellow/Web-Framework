/**
 *
 * Wepback > Config
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var webpack = require('webpack')
var path = require('path')
var package = require('./package.json')

module.exports = {
  entry: {
    app: [path.join(__dirname, './' + package.config.js.dirApp + 'index.js')], // Using Array here fixes: "Error: a dependency to an entry point is not allowed" error.
    common: [path.join(__dirname, './' + package.config.js.dirCommon + 'index.js')] // Using Array here fixes: "Error: a dependency to an entry point is not allowed" error.
  },
  output: {
    path: path.join(__dirname, './' + package.config.js.dest),
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: []
  },
  plugins: []
}
