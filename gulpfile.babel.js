/**
 *
 * Gulpfile
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

// Yargs.
var argv = require('yargs').argv

import gulp from 'gulp'
import path from 'path'
import notify from 'gulp-notify'
import runSequence from 'run-sequence'
import gulpif from 'gulp-if'
import sass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import gitRev from 'git-rev'
import imagemin from 'gulp-imagemin'
import nightwatch from 'gulp-nightwatch'
import autoprefixer from 'gulp-autoprefixer'
import standard from 'gulp-standard'
import webpackStream from 'webpack-stream'
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
 *
**/

// Main.
gulp.task('watch', () => {
  // Task :: HTML.
  // gulp.watch(packageConfig.config.src + '**/*.html', {cwd:'./'}, ['html'])
	// Task :: CSS.
	gulp.watch(packageConfig.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
  // Task :: Images.
  gulp.watch(packageConfig.config.dist + 'images/raw/**/*.+(jpg|jpeg|png|gif)', {cwd:'./'}, ['images'])
	// Task :: JS.
	gulp.watch([
    packageConfig.config.js.dirApp + '**/*.js', packageConfig.config.js.dirApp + '**/*.jsx'
  ], {cwd:'./'}, ['js'])
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
    port   : 3010,
		proxy  : packageConfig.config.url
	})
	// Task :: CSS.
	gulp.watch(packageConfig.config.css.dirSCSS + '**/*.scss', {cwd:'./'}, ['css'])
	gulp.watch(packageConfig.config.css.dest, {cwd:'./'}, ['css']).on('change', browserSync.reload)
	// Task :: JS.
  gulp.watch([
    packageConfig.config.js.dirApp + '**/*.js', packageConfig.config.js.dirApp + '**/*.jsx'
  ], {cwd:'./'}, ['js'])
	gulp.watch(packageConfig.config.js.dest + '*.js', {cwd:'./'}, ['js']).on('change', browserSync.reload)
})


// ********************************************************************************************* //


/**
*
* HTML
*
* Compiles HTML templates.
*
* @uses gulp-file-include
*
**/

// Main.
gulp.task('html', () => {
  return gulp.src(packageConfig.config.src + '**/*.html')
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./view/'))
})


// ********************************************************************************************* //


/**
 *
 * CSS
 *
 * Compiles the SCSS files into a single build.css.
 *
 * @uses gulp-autoprefixer
 * @uses gulp-sass
 * @uses gulp-notify
 * @uses gulp-clean-css
 * @uses gulp-if
 *
**/

// Main.
gulp.task('css', ['css:task'], () => {
	return gulp.src('').pipe(notify('CSS build file updated'))
})

// Task.
gulp.task('css:task', () => {
  // Get branch name.
  gitRev.branch((branch) => {
    // Set production flag.
    var isProduction = (branch === 'production' || branch === 'master')
    // Set environment.
    process.env.NODE_ENV = (branch === 'production') ? 'production' : 'development'

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
      .pipe(gulpif(isProduction, cleanCSS({compatibility: 'ie8', debug: true}, (details) => {
        console.log('CSS Original Size: ' + (details.stats.originalSize/1000).toFixed(2) + ' KB')
        console.log('CSS Minified Size: ' + (details.stats.minifiedSize/1000).toFixed(2) + ' KB')
        console.log('Saving: ' + ((details.stats.originalSize/1000) - (details.stats.minifiedSize/1000)).toFixed(2) + ' KB' )
      })))
      .pipe(gulp.dest(packageConfig.config.css.dirDest))
  })
})


// ********************************************************************************************* //


/**
 *
 * JS
 *
 * Uses Webpack to bundle JavaScript.
 *
 * @uses webpack-stream
 * @uses git-rev
 * @uses gulp-notify
 * @uses gulp-uglify
 * @uses gulp-if
 *
**/

// Main.
gulp.task('js', ['js:standard', 'js:task'], () => {
	return gulp.src('').pipe(notify('JavaScript build file updated'))
})

// Standard.
gulp.task('js:standard', () => {
  // Get ignore array.
  var jsFiles = packageConfig.standard.ignore.map((i) => { return '!' + i })
  // Remove ignored files.
  jsFiles.unshift(packageConfig.config.js.dirApp + '**/*.js')

	return gulp.src(jsFiles)
    .pipe(standard())
    .pipe(standard.reporter('default', {
  		breakOnError: true,
  		quiet: true
  	}))
})

// Task.
gulp.task('js:task', () => {
  // Get branch name.
  gitRev.branch((branch) => {
    // Set production flag.
    var isProduction = (branch === 'production' || branch === 'master')
    // Set environment.
    process.env.NODE_ENV = (branch === 'production' || branch === 'master') ? 'production' : 'development'
		// Get webpack config.
		var webpackConfig = require('./webpack.config.js') // Must be defined here. Do not hoist.

  	return gulp.src(packageConfig.config.js.dirApp + 'index.js')
  		.pipe(webpackStream(webpackConfig))
      .pipe(gulpif(isProduction, uglify()))
    	.pipe(gulp.dest(packageConfig.config.js.dest))
  })
})


// ********************************************************************************************* //


/**
 *
 * Images
 *
 * Optimises images.
 *
 * @uses gulp-imagemin
 * @uses gulp-notify
 *
**/

// Main.
gulp.task('images', () => {
	return gulp.src(packageConfig.config.dist + 'images/raw/**/*', {base: packageConfig.config.dist + 'images/raw/'})
    .pipe(imagemin())
    .pipe(gulp.dest(packageConfig.config.dist + 'images/optimised'))
    .pipe(notify('Images optimised'))
})


// ********************************************************************************************* //


/**
 *
 * Minify
 *
 * Minfy CSS and JavaScript.
 *
 * @uses gulp-clean-css
 * @uses gulp-uglify
 * @uses git-rev
 * @uses runSequence
 * @uses gulp-notify
 *
**/

// Main.
gulp.task('minify', () => {
  runSequence('minify:css', 'minify:js', 'images')
})

// CSS.
gulp.task('minify:css', () => {
  // Get branch name.
  return gitRev.branch((branch) => {
    // Check branch name.
    if (branch === 'production' || branch === 'master') {
      // Set environment.
      process.env.NODE_ENV = 'production'
      // Double check environment.
      if (process.env.NODE_ENV == 'production') {
        return gulp.src(packageConfig.config.css.dest)
          .pipe(cleanCSS({compatibility: 'ie8', debug: true}, (details) => {
            console.log('CSS Original Size: ' + (details.stats.originalSize/1000).toFixed(2) + ' KB')
            console.log('CSS Minified Size: ' + (details.stats.minifiedSize/1000).toFixed(2) + ' KB')
            console.log('Saving: ' + ((details.stats.originalSize/1000) - (details.stats.minifiedSize/1000)).toFixed(2) + ' KB' )
          }))
          .pipe(gulp.dest(packageConfig.config.css.dirDest))
          .pipe(notify('CSS minified.'))
      } else {
        return gulp.src('').pipe(notify('Failed to set Node environment to production'))
      }
    } else {
      return gulp.src('').pipe(notify('Couldn\'t minify, branch is not master or production.'))
    }
  })
})

// JavaScript.
gulp.task('minify:js', () => {
  // Get branch name.
  return gitRev.branch((branch) => {
    // Check branch name.
    if (branch === 'production' || branch === 'master') {
      // Set environment.
      process.env.NODE_ENV = 'production'
      // Double check environment.
      if (process.env.NODE_ENV == 'production') {
        return gulp.src(packageConfig.config.js.dest + '*.js')
          .pipe(uglify())
          .pipe(gulp.dest(packageConfig.config.js.dest))
          .pipe(notify('JavaScript minified.'))
      } else {
        return gulp.src('').pipe(notify('Failed to set Node environment to production'))
      }
    } else {
    	return gulp.src('').pipe(notify('Couldn\'t minify, branch is not master or production.'))
    }
  })
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
 * @uses gulp-nightwatch
 * @uses gulp-notify
 *
**/

// Task.
gulp.task('test', ['test:unit', 'test:integration'], () => {
  return gulp.src('')
})

// Task.
gulp.task('test:unit', ['test:unit:karma'], () => {
  return gulp.src('')
})

// Task.
gulp.task('test:unit:karma', (done) => {
  var Server = require('karma').Server

  new Server({configFile: path.join(__dirname, '/karma.config.babel.js'), singleRun: true}, (code) => {
    if (code == 1){
      return gulp.src('').pipe(notify('Unit tests failed. Exiting'))
      done('Unit Test Failures')
    } else {
      return gulp.src('').pipe(notify('Unit tests passed'))
      done()
    }
  }).start()
})

// Task.
gulp.task('test:unit:coveralls', () => {
  return gulp.src(path.join(__dirname, 'karma/coverage/**/lcov.info')).pipe(coveralls())
})

// Task.
gulp.task('test:integration', () => {
  // Nightwatch environment.
  let nightwatchEnvironment = (argv.env) ? argv.env : 'local'
  // Log it.
  console.log('Running integration tests in ' + nightwatchEnvironment + ' mode.')

  return gulp.src('')
    .pipe(nightwatch({
      configFile: path.join(__dirname, './nightwatch.json'),
      cliArgs: {
        env: nightwatchEnvironment
      }
    }))
    .pipe(notify('Integration tests passed'))
})


// ********************************************************************************************* //


/**
 *
 * Release
 *
 * Builds all assets and runs tests.
 *
 * @uses runSequence
 *
**/

// Task.
gulp.task('release', (done) => {
  runSequence('test', 'css', 'images', 'js', 'minify')
})
