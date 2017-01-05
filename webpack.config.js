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
var packageConfig = require('./package.json')

module.exports = {
  entry: {
    app: path.join(__dirname, './' + packageConfig.config.js.dirApp + 'index.js'),
    common: path.join(__dirname, './' + packageConfig.config.js.dirCommon + 'index.js')
  },
  output: {
    path: path.join(__dirname, './' + packageConfig.config.js.dest),
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
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
