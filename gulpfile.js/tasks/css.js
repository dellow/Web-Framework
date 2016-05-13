/**
 *
 * Gulpfile > Tasks > CSS
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
	/* Libs
	/* =========================================================================== */
	var handleErrors = require('../lib/handle-errors');


	/* =========================================================================== */
	/* Global Dependencies
	/* =========================================================================== */
	var gulp   = require('gulp'),
		args   = require('yargs').argv,
		gulpif = require('gulp-if'),
		notify = require('gulp-notify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream');


	/* =========================================================================== */
	/* Task Dependencies
	/* =========================================================================== */
	var sass         = require('gulp-sass'),
		sourcemaps   = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		return gulp.src(config.css.src)
	        .pipe(sourcemaps.init())
	        .pipe(sass({
		        outputStyle: 'expanded',
	        	errLogToConsole: true,
		        onError: handleErrors
		    }))
			.on('error', handleErrors)
	        .pipe(autoprefixer({
	            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
	            cascade: false
	        }))
	        .pipe(sourcemaps.write('./', {
				includeContent        : false,
				sourceRoot            : '',
				sourceMappingURLPrefix: ''
	        }))
			.pipe(gulp.dest(config.css.dest))
			.pipe(notify({message: 'CSS task complete.'}));
	}

	// Task
	gulp.task('css', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));