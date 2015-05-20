/* =========================================================================== */
/* GLOBAL Requires & GLOBAL Variables
/* Use very sparingly (http://stackoverflow.com/questions/5447771/node-js-global-variables)
/* =========================================================================== */
// Require.
var gulp = require('gulp');

// Vars.
var src_dir   = './',
	dist_dir  = './dist/';


/* =========================================================================== */
/* Combined Tasks & Global Requires
/* =========================================================================== */
// Task.
gulp.task('default', [
	'browserify',
	'compass',
	'jasmine',
	'jshint'
]);



/* =========================================================================== */
/* Browserify
/* =========================================================================== */
gulp.task('browserify', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename'),
		source     = require('vinyl-source-stream');

	// Task.
	return browserify(dist_dir + 'js/app/')
		.bundle()
		.pipe(source('index.js'))
		.pipe(rename('build.js'))
		.pipe(gulp.dest(dist_dir + 'js/build/'));
});



/* =========================================================================== */
/* Compass
/* =========================================================================== */
gulp.task('compass', function(){
	// Require.
	var compass = require('gulp-compass');

	// Task.
	return gulp.src(dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			css             : dist_dir + 'css',
			sass            : dist_dir + 'css/scss',
			sourcemap       : true,
			force           : true,
			relativeAssets  : true,
			noLineComments  : true,
			assetCacheBuster: false
		}))
		.pipe(gulp.dest(dist_dir + 'css'));
});



/* =========================================================================== */
/* Dalek
/* =========================================================================== */
gulp.task('dalek', function(){
	// Require.
	var dalek = require('gulp-dalek'),
		stylish = require('jshint-stylish');

	// Files.
	var tests = [
		dist_dir + 'js/spec/dalek/examples.js',
		dist_dir + 'js/spec/dalek/general.js'
	];

	// Task
	return gulp.src(tests)
		.pipe(
			dalek({
				browser : [
					'phantomjs',
					// 'chrome'
				],
				reporter: [
					'console',
					// 'html',
					// 'junit'
				]
			})
		);
});



/* =========================================================================== */
/* Jasmine
/* =========================================================================== */
gulp.task('jasmine', function(){
	// Require.
	var karma = require('gulp-karma');

	// Files. (Also needs setting in karma.conf.js)
	var tests = [
		dist_dir + 'js/spec/jasmine/general.js'
	];

    // Task.
	return gulp.src(tests)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action    : 'run'
		}));
});



/* =========================================================================== */
/* JS Hint
/* =========================================================================== */
gulp.task('jshint', function(){
	// Require.
	var jshint  = require('gulp-jshint'),
		stylish = require('jshint-stylish');

    // Task.
	return gulp.src(dist_dir + 'js/app/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});



/* =========================================================================== */
/* Watch
/* =========================================================================== */
gulp.task('watch', function(){
	// Run Browserify on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/*.js', dist_dir + 'js/plugins/*.js', dist_dir + 'js/**/*.hbs'], ['browserify']);
	// Run Compass on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['compass']);
});
