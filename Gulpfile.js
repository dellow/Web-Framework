/**
 *
 * Gulpfile.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var gulp = require('gulp')
var path = require('path')
var notify = require('gulp-notify')
var livereload = require('gulp-livereload')
var helpers = require('./Gulpfile.helpers')
var package = require('./package.json')


// ********************************************************************************************* //


/**
 *
 * Watch
 *
 * Watches for file changes.
 *
 * @uses gulp-watch
 * @uses livereload
 *
**/

// Main.
gulp.task('watch', function () {
	// Start livereload.
	livereload.listen()
	// Task :: CSS.
	gulp.watch(package.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
	// Task :: JS.
	gulp.watch(package.config.js.dirApp + '**/*.js', {cwd:'./'}, ['js'])
})


// ********************************************************************************************* //


/**
*
* Sync
*
* Watches for file changes.
*
* @uses browser-sync
*
**/

// Main.
gulp.task('sync', function () {
	var browserSync = require('browser-sync').create()

	// Start BrowserSync.
	browserSync.init({
		open   : 'external',
		browser: ['google chrome'],
		xip    : true,
		proxy  : package.config.url
	})
	// Task :: CSS.
	gulp.watch(package.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
	gulp.watch(package.config.css.dest, {cwd:'./'}, ['css']).on('change', browserSync.reload)
	// Task :: JS.
	gulp.watch(package.config.js.dirApp + '**/*.js', {cwd:'./'}, ['js'])
	gulp.watch(package.config.js.dest + '*.js', {cwd:'./'}, ['js']).on('change', browserSync.reload)
})


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
gulp.task('css', ['css:task'], function () {
	return gulp.src('/').pipe(notify('CSS build file updated'))
})

// Task.
gulp.task('css:task', function () {
	var sass = require('gulp-sass')
	var autoprefixer = require('gulp-autoprefixer')

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
  	.pipe(gulp.dest(package.config.css.dirDest))
  	.pipe(livereload())
})


// ********************************************************************************************* //


/**
 *
 * JS
 *
 * Uses Webpack to bundle JavaScript.
 *
 * @uses webpack-stream
 * @uses gulp-git
 * @uses notify
 *
**/

// Main.
gulp.task('js', ['js:standard', 'js:task'], function () {
	return gulp.src('/').pipe(notify('JavaScript build file updated'))
})

// Standard.
gulp.task('js:standard', function () {
	var standard = require('gulp-standard')

	return gulp.src(package.config.js.dirApp + '**/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
  		breakOnError: true,
  		quiet: true
  	}))
})

// Task.
gulp.task('js:task', function () {
	var webpackStream = require('webpack-stream')
	var config = require('./webpack.config.js')

	return gulp.src(package.config.js.dirApp + 'index.js')
		.pipe(webpackStream(config))
  	.pipe(gulp.dest(package.config.js.dest))
  	.pipe(livereload())
})


// ********************************************************************************************* //


/**
 *
 * Test > Unit
 *
 * Run unit tests and sends coverage information to coveralls.io.
 *
 * @uses gulp-coveralls
 * @uses karma
 * @uses notify
 *
**/

// Task.
gulp.task('test:unit', ['test:unit:karma', 'test:unit:coveralls'], function () {
	return gulp.src('/').pipe(notify('Unit tests run'))
})

// Task.
gulp.task('test:unit:karma', function (done) {
  var Server = require('karma').Server

  new Server({configFile: path.join(__dirname, '/karma.config.js'), singleRun: true}, done).start()
})

// Task.
gulp.task('test:unit:coveralls', function () {
	var coveralls = require('gulp-coveralls')

  return gulp.src(path.join(__dirname, 'karma/coverage/**/lcov.info')).pipe(coveralls())
})
