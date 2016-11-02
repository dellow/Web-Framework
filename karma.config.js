/**
 *
 * karma.conf.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var package = require('./package.json')
var webpackConfig = require('./webpack.config')

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
      package.config.js.dirApp,
      package.config.js.dirTests + 'unit/**/*.js'
    ],
    preprocessors: {
      [package.config.js.dirApp]: ['coverage'],
      [package.config.js.dirTests + 'unit/**/*.js']: ['webpack']
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
      module: webpackConfig.module
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
