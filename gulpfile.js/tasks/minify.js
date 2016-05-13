/**
 *
 * Gulpfile > Tasks > Minifier
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

;(function(GulpTask){

	/* =========================================================================== */
	/* Config
	/* =========================================================================== */
	var config = require('../config.json');


	/* =========================================================================== */
	/* Global Dependencies
	/* =========================================================================== */
	var gulp   = require('gulp'),
		args   = require('yargs').argv,
		notify = require('gulp-notify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream');


	/* =========================================================================== */
	/* Task Dependencies
	/* =========================================================================== */
    var minify = require('gulp-minifier'),
        header = require('gulp-header');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
        // Vars
        var version = config.version;
        // Types.
        var types = ['css', 'js'];
        // Headers.
        var headers = {
            css: ['/* ==========================================================================',
                'Stylesheet',
                'Application Version: <%= version %>',
                'Compiled: <%= date %>',
                '========================================================================== */',
                '',
                ''].join('\n'),
            js: ['/* ==========================================================================',
                'JavaScript',
                'Application Version: <%= version %>',
                'Compiled: <%= date %>',
                '========================================================================== */',
                '',
                ''].join('\n')
        };

        // Loop through all types.
        for(var i = 0, ii = types.length; i < ii; i++){
            var typ = types[i],
                src = config[typ].file,
                dest = config[typ].dest,
                head = headers[typ];

    	    gulp.src(src)
                .pipe(minify({
                    minify              : true,
                    collapseWhitespace  : true,
                    conservativeCollapse: true,
                    minifyJS            : (typ == 'js') ? true : false,
                    minifyCSS           : (typ == 'css') ? true : false
                }))
    			.pipe(header(head, {
    				version: version,
    				date   : Date()
    			}))
                .pipe(gulp.dest(dest))
    			.pipe(notify({message: 'Minify task complete.'}));

            if(i == ii){
                return true;
            }
        }
	}

	// Task
	gulp.task('minify', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));