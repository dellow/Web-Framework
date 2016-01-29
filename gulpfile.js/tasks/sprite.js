/**
 *
 * Gulpfile > Tasks > Sprite
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
	var sprity = require('sprity');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		return sprity.src({
			src         : config.sprite.src,
			style       : config.sprite.style,
			cssPath     : config.sprite.cssPath,
			margin      : 0,
			base64      : false,
			retina      : true,
			background  : config.sprite.background,
			orientation : 'horizontal',
			prefix      : 'css-sprite',
			name        : 'sprite',
			processor   : 'sass',
			'style-type': 'scss'
		})
	    .pipe(gulpif('*.png', gulp.dest(config.sprite.dest1), gulp.dest(config.sprite.dest2)))
		.pipe(notify({message: 'Sprite task complete.'}));
	}

	// Task
	gulp.task('sprite', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));