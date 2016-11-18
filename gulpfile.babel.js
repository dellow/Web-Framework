/**
 *
 * Gulpfile
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

import gulp from 'gulp'
import path from 'path'
import notify from 'gulp-notify'
import livereload from 'gulp-livereload'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import standard from 'gulp-standard'
import webpackStream from 'webpack-stream'
import webpackConfig from './webpack.config.js'
import coveralls from 'gulp-coveralls'
import helpers from './gulpfile.helpers'
import packageConfig from './package.json'


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
gulp.task('watch', () => {
	// Start livereload.
	livereload.listen()
	// Task :: CSS.
	gulp.watch(packageConfig.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
	// Task :: JS.
	gulp.watch(packageConfig.config.js.dirApp + '**/*.js', {cwd:'./'}, ['js'])
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
gulp.task('sync', () => {
	var browserSync = require('browser-sync').create()

	// Start BrowserSync.
	browserSync.init({
		open   : 'external',
		browser: ['google chrome'],
		xip    : true,
		proxy  : packageConfig.config.url
	})
	// Task :: CSS.
	gulp.watch(packageConfig.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
	gulp.watch(packageConfig.config.css.dest, {cwd:'./'}, ['css']).on('change', browserSync.reload)
	// Task :: JS.
	gulp.watch(packageConfig.config.js.dirApp + '**/*.js', {cwd:'./'}, ['js'])
	gulp.watch(packageConfig.config.js.dest + '*.js', {cwd:'./'}, ['js']).on('change', browserSync.reload)
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
gulp.task('css', ['css:task'], () => {
	return gulp.src('/').pipe(notify('CSS build file updated'))
})

// Task.
gulp.task('css:task', () => {
	return gulp.src(packageConfig.config.css.src)
    .pipe(sass({
      outputStyle: 'expanded',
    	errLogToConsole: true
    }))
  	.on('error', helpers.handleErrors)
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false
    }))
  	.pipe(gulp.dest(packageConfig.config.css.dirDest))
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
gulp.task('js', ['js:standard', 'js:task'], () => {
	return gulp.src('/').pipe(notify('JavaScript build file updated'))
})

// Standard.
gulp.task('js:standard', () => {
	return gulp.src(packageConfig.config.js.dirApp + '**/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
  		breakOnError: true,
  		quiet: true
  	}))
})

// Task.
gulp.task('js:task', () => {
	return gulp.src(packageConfig.config.js.dirApp + 'index.js')
		.pipe(webpackStream(webpackConfig))
  	.pipe(gulp.dest(packageConfig.config.js.dest))
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
gulp.task('test:unit', ['test:unit:karma'], () => {
	return gulp.src('/')
})

// Task.
gulp.task('test:unit:karma', function (done) {
  var Server = require('karma').Server

  new Server({configFile: path.join(__dirname, '/karma.config.js'), singleRun: true}, done).start()
})

// Task.
gulp.task('test:unit:coveralls', () => {
  return gulp.src(path.join(__dirname, 'karma/coverage/**/lcov.info')).pipe(coveralls())
})
