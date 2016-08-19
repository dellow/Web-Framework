/**
 *
 * Gulpfile.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var gulp = require('gulp');
var package = require('./package.json');

/**
 *
 * CSS
 *
 * Compiles the SCSS files into a single build.css.
 *
 * @uses sass
 * @uses autoprefixer
 *
**/
gulp.task('css', function(){
	var sass         = require('gulp-sass');
	var autoprefixer = require('gulp-autoprefixer');

	return gulp.src(package.config.css.src)
        .pipe(sass({
	        outputStyle: 'expanded',
        	errLogToConsole: true
	    }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(gulp.dest(package.config.css.destDir));
});