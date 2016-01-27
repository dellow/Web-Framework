/**
 *
 * Karma - Runs unit tests for us.
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

module.exports = function(config){
    config.set({
        basePath : '',
        port     : 9876,
        colors   : true,
        autoWatch: false,
        singleRun: true,
        plugins: [
            'karma-browserify',
            'karma-html-reporter',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ],
        frameworks: [
            'browserify',
            'jasmine'
        ],
        files: [
            './test/unit/*'
        ],
        exclude: [
        ],
        preprocessors: {
            './test/unit/*': ['browserify']
        },
        reporters: [
            'html',
            'spec'
        ],
        browsers: [
            'PhantomJS'
        ],
        browserify: {
            debug: false
        },
        htmlReporter: {
            outputDir              : './karma/',
            templatePath           : null,
            focusOnFailures        : true,
            namedFiles             : false,
            pageTitle              : null,
            urlFriendlyName        : false,
            reportName             : 'report',
            preserveDescribeNesting: false,
            foldAll                : false
        }
    });
};
