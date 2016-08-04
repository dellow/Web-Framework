/**
 *
 * Gulpfile.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/


// Require.
var gulp = require('gulp');


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
	// Require.
	var sass = require('gulp-sass');
	// Require.
	var autoprefixer = require('gulp-autoprefixer');

	return gulp.src('./src/dist/css/scss/build.scss')
        .pipe(sass({
	        outputStyle: 'expanded',
        	errLogToConsole: true
	    }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(gulp.dest('./src/dist/css'));
});