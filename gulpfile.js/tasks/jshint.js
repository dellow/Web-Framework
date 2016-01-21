/**
 *
 * Gulpfile > Tasks > JSHint
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
	var jshint  = require('gulp-jshint'),
		stylish = require('jshint-stylish');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		return gulp.src(config.jshint.src)
		    .pipe(jshint())
		    .pipe(jshint.reporter(stylish))
			.pipe(notify({message: 'JSHint task complete.'}));
	}

	// Task
	gulp.task('jshint', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));