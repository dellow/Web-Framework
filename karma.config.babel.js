/**
 *
 * Karma
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

import packageConfig from './package.json'

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
      packageConfig.config.js.dirCommon + 'index.js',
      packageConfig.config.js.dirApp + 'index.js',
      'webpack.tests.js' // Used to get tests.
    ],
    preprocessors: {
      [packageConfig.config.js.dirCommon + 'index.js']: ['webpack'],
      [packageConfig.config.js.dirApp + 'index.js']: ['webpack'],
      'webpack.tests.js': ['webpack'], // Uses 'require' so need Webpack preprocessing first.

      [packageConfig.config.js.dirCommon + '!(__tests__/)*.js']: ['coverage'],
      [packageConfig.config.js.dirApp + '!(__tests__/)*.js']: ['coverage']
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
      resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'] // We do not want to test .jsx files with Karma/Jasmine.
      },
      module: {
        loaders: [{
          test: /\.jsx?/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }],
        postLoaders: [{
          test: /\.jsx?/,
          exclude: /(test|node_modules|bower_components)\//,
          include: [require('path').resolve(__dirname, packageConfig.config.js.dirApp)],
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
