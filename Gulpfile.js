/**
 *
 * Gulpfile.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify'),
	helpers = require('./Gulpfile.helpers'),
	package = require('./package.json');


// ********************************************************************************************* //


/**
 *
 * Watch
 *
 * Watches for file changes.
 *
 * @uses gulp.watch
 * @uses livereload
 *
**/

// Main.
gulp.task('watch', function(){
	// Start livereload.
	livereload.listen();
	// Task :: CSS.
	gulp.watch(package.config.css.watch, {cwd:'./'}, ['css']);
});


// ********************************************************************************************* //


/**
 *
 * CSS
 *
 * Compiles the SCSS files into a single build.css.
 *
 * @uses gulp-autoprefixer
 * @uses gulp-git
 * @uses gulp-sass
 * @uses notify
 *
**/

// Main.
gulp.task('css', ['css:task', 'css:git'], function(){
	return gulp.src('/').pipe(notify('CSS build file updated'));
});

// Task.
gulp.task('css:task', function(){
	var sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

	return gulp.src(package.config.css.src)
        .pipe(sass({
	        outputStyle: 'expanded',
        	errLogToConsole: true
	    }))
		.on('error', helpers.handleErrors)
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(gulp.dest(package.config.css.destDir))
    	.pipe(livereload());
});

// Git.
gulp.task('css:git', function(){
	var git = require('gulp-git');

	return gulp.src(package.config.css.destDir)
    	.pipe(git.add())
    	.pipe(git.commit('Gulp: CSS Updated'))
		.on('error', helpers.handleErrors);
});


// ********************************************************************************************* //

