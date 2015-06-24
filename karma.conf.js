module.exports = function(config){
    config.set({
        basePath : '',
        port     : 9876,
        colors   : true,
        logLevel : config.LOG_INFO,
        autoWatch: false,
        singleRun: false,
        frameworks: [
            'browserify',
            'jasmine'
        ],
        files: [
            'src/dist/js/spec/jasmine/*'
        ],
        exclude: [
        ],
        preprocessors: {
            'src/dist/js/spec/jasmine/*': ['browserify']
        },
        reporters: [
            'progress'
        ],
        browsers: [
            // 'Chrome',
            // 'IE',
            // 'Firefox',
            // 'Opera',
            'PhantomJS',
            // 'Chrome_without_security',
            // 'FirefoxDeveloper',
            // 'FirefoxAurora',
            // 'FirefoxNightly'
        ],
        browserify: {
            debug: true,
            transform: []
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-opera-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-bro'
        ]
    });
};
