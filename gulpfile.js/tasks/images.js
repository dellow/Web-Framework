/**
 *
 * Gulpfile > Tasks > Images
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
	var imagemin = require('gulp-imagemin')
		cache	 = require('gulp-cache');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		return gulp.src(config.images.src)
	        .pipe(cache(imagemin({
	            optimizationLevel: 3,
	            progressive      : true,
	            interlaced       : true
	        })))
	        .pipe(gulp.dest(config.images.dest))
			.pipe(notify({message: 'Images task complete.'}));
	}

	// Task
	gulp.task('images', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));