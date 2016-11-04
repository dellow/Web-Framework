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
      package.config.js.dirCommon + 'index.js',
      package.config.js.dirApp + 'index.js',
      'webpack.tests.js'
    ],
    preprocessors: {
      [package.config.js.dirCommon + 'index.js']: ['webpack'],
      [package.config.js.dirApp + 'index.js']: ['webpack'],
      'webpack.tests.js': ['webpack']
    },
    coverageReporter: {
      dir: 'karma/coverage',
      reporters: [
        { type: 'text', dir: '' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
      ]
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
