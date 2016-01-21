/**
 *
 * Gulpfile > Tasks > Default
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
		gulpif = require('gulp-if'),
		notify = require('gulp-notify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		// Show notification.
		gulp.src('gulpfile.js').pipe(notify({
			message: 'Default task is complete'
		}));
	}

	// Task
	gulp.task('default', ['css', 'js', 'jshint', 'images'], GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));