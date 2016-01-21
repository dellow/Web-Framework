/**
 *
 * Gulpfile > Tasks > Release
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

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
/* Task
/* =========================================================================== */
var Task_Release = function(){
	// Vars
	var version = config.version,
	    release_version = args.version || args.ver || args.v || version,
	    files = [
	        config.src + '**/*.*',
	        '!' + config.dist + '**/*.scss',
			'!' + config.dist + 'js/index.js',
			'!' + config.dist + 'js/helpers.js',
			'!' + config.dist + 'js/app/**/*',
	        '!' + config.dist + 'js/public/**/*',
	        '!' + config.dist + 'js/compiled/**/*',
	        '!' + config.dist + 'js/plugins/**/*',
	        '!' + config.dist + 'js/vendor/**/*'
	    ];

	return gulp.src(files, {base: config.src})
		.pipe(gulp.dest('releases/release-' + release_version));
}

// Task
gulp.task('release', Task_Release);

// Export
module.exports = Task_Release;