/**
 *
 * Wepback > Common
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var webpack = require('webpack');
var package = require('../package.json');

module.exports = {
    entry: package.config.js.dirCommon + 'index.js',
    output: {
        path: package.config.js.dest,
        filename: 'common.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    module: {
        loaders: []
    },
    plugins: [],
};