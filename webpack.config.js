/**
 *
 * Wepback > Config
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

const srcPath = './src/'

const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanPlugin = require('webpack-clean')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const entry = {
  'js/app': path.resolve(__dirname, srcPath + 'dist/js/app/entry.js'),
  'js/common': path.resolve(__dirname, srcPath + 'dist/js/common/entry.js'),
  'css/fonts': path.resolve(__dirname, srcPath + 'dist/css/scss/entry-fonts.scss'),
  'css/theme': path.resolve(__dirname, srcPath + 'dist/css/scss/entry-theme.scss'),
  'css/base': path.resolve(__dirname, srcPath + 'dist/css/scss/entry-base.scss'),
  'css/utility': path.resolve(__dirname, srcPath + 'dist/css/scss/entry-utility.scss')
}

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, srcPath + 'build'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
    alias: {
      classes: path.resolve(__dirname, srcPath + 'dist/js/app/classes'),
      routes: path.resolve(__dirname, srcPath + 'dist/js/app/routes')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
      srcPath + 'build/css/fonts.js',
      srcPath + 'build/css/base.js',
      srcPath + 'build/css/theme.js',
      srcPath + 'build/css/utility.js'
    ]),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   include: [
    //     /\.min\.js$/,
    //     /\.min\.css$/
    //   ],
    //   minimize: true
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
