/**
 *
 * karma.conf.js
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
      package.config.js.tests
    ],
    preprocessors: {
      [package.config.js.tests]: ['webpack']
    },
    webpack: {
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: [
      'spec'
    ],
    browsers: [
      'PhantomJS'
    ]
  })
}
