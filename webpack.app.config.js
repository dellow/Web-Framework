/**
 *
 * Wepback App
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var path         = require('path');
var webpack      = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/dist/js/app/index.js',
    output: {
        path: path.join(__dirname, 'src/dist/js/build'),
        filename: 'app.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    module: {
        loaders: []
    },
    plugins: [],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ]
};