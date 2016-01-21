/**
 *
 * Gulpfile > Tasks > Watch
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
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		// Run JS Master on JS and HBS file changes.
		gulp.watch([
			config.dist + 'js/**/*.js',
			config.dist + 'js/**/*.hbs',
	        '!' + config.dist + 'js/build/*.js',
	        '!' + config.dist + 'js/compiled/*.js'
		], ['js']);
		// Run CSS on SCSS file changes.
		gulp.watch(config.dist + 'css/scss/**/*.scss', ['css']);
	}

	// Task
	gulp.task('watch', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));