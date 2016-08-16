/**
 *
 * Wepback > Common
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: '../src/dist/js/common/index.js',
    output: {
        path: path.join(__dirname, '../src/dist/js/build'),
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