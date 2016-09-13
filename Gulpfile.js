/**
 *
 * Gulpfile.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var gulp = require('gulp'),
	package = require('./package.json');


// ********************************************************************************************* //


/**
 *
 * Watch
 *
 * Watches for file changes.
 *
**/

// Main.
gulp.task('watch', function(){
	gulp.watch(package.config.css.watch, ['css']);
});


// ********************************************************************************************* //


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

// Main.
gulp.task('css', ['css:task', 'css:git']);

// Task.
gulp.task('css:task', function(){
	var sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

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

// Git.
gulp.task('css:git', function(){
	var git = require('gulp-git');

	return gulp.src(package.config.css.destDir)
    	.pipe(git.add())
    	.pipe(git.commit('CSS updates'));
});


// ********************************************************************************************* //

