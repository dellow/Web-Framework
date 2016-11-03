/**
 *
 * Karma
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var package = require('./package.json')

module.exports = function (config) {
  config.set({
    basePath : './',
    port     : 9876,
    colors   : true,
    logLevel : config.LOG_DISABLE,
    // logLevel : config.LOG_DEBUG,
    autoWatch: false,
    singleRun: true,
    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ],
    frameworks: [
      'jasmine-jquery',
      'jasmine'
    ],
    files: [
      'webpack.tests.js'
    ],
    preprocessors: {
      'webpack.tests.js': ['webpack']
    },
    coverageReporter: {
      type: 'text',
      dir: ''
    },
    webpack: {
      module: {
        postLoaders: [{
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)\//,
          include: [require('path').resolve(__dirname, package.config.js.dirApp)],
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: [
      'spec',
      'coverage'
    ],
    browsers: [
      'PhantomJS'
    ]
  })
}
