/**
 *
 * Wepback > App
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var webpack = require('webpack'),
    path = require('path'),
    package = require('../package.json');

module.exports = {
    entry: path.join(__dirname, '../' + package.config.js.dirApp + 'index.js'),
    output: {
        path: path.join(__dirname, '../' + package.config.js.dest),
        filename: 'app.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    module: {
        loaders: []
    },
    plugins: []
};