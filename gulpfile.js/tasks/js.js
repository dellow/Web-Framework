 /**
 *
 * Gulpfile > Tasks > JS
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

;(function(GulpTask1, GulpTask2, GulpTask3){

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
	var browserify = require('browserify'),
	    header     = require('gulp-header'),
	    rename     = require('gulp-rename'),
	    concat     = require('gulp-concat');


	/* =========================================================================== */
	/* Task (Common Libraries & Vendors.)
	/* =========================================================================== */
	GulpTask1 = function(){
		return browserify(config.js.src1).bundle()
			.on('error', handleErrors)
			.pipe(source('index.js'))
		    .pipe(buffer())
			.pipe(rename('common.js'))
			.pipe(gulp.dest(config.js.dest1))
			.pipe(notify({message: 'JS Common task complete.'}));
	}


	/* =========================================================================== */
	/* Task (All Files.)
	/* =========================================================================== */
	GulpTask2 = function(){
		return browserify(config.js.src2).bundle()
			.on('error', handleErrors)
		    .pipe(source('index.js'))
		    .pipe(buffer())
			.pipe(rename('all.js'))
			.pipe(gulp.dest(config.js.dest2))
			.pipe(notify({message: 'JS All task complete.'}));
	}


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask3 = function(){
		// Vars
		var version = config.version, // Need this for Headers.
			is_development = (args.config == 'development' || args.config == undefined) ? true : false,
			is_production  = (args.config == 'production') ? true : false;

		// Set environment in JS file.
		var header_tpl_env = ['// Set environment variable',
			'window.gulp_env = "<%= env %>";',
			'',
			''].join('\n');

		return gulp.src(config.js.src3)
		    .pipe(concat('build.js'))
			.pipe(header(header_tpl_env, {
				env: (is_production) ? 'production' : 'development'
			}))
			.pipe(gulp.dest(config.js.dest3))
			.on('error', handleErrors)
			.pipe(notify({message: 'JS Build task complete.'}));
	}

	// Task
	gulp.task('js:common', GulpTask1);
	gulp.task('js:all', GulpTask2);
	gulp.task('js', ['js:all'], GulpTask3);

	// Export
	module.exports = {
	    'common': GulpTask1,
	    'all': GulpTask2,
	    'js': GulpTask3
	};

}(function(){}, function(){}, function(){}));