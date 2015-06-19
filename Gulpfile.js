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
	'js',
	'css',
	'jshint'
]);

// Task.
gulp.task('tests', [
	'dalek',
	'jasmine'
]);



/* =========================================================================== */
/* JS (Common)
/* =========================================================================== */
gulp.task('js_common', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename'),
		source     = require('vinyl-source-stream');

	// Task.
	return browserify(dist_dir + 'js/vendor/').bundle()
		.pipe(source('index.js'))
		.pipe(rename('common.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'));
});



/* =========================================================================== */
/* JS (App)
/* =========================================================================== */
gulp.task('js_app', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename'),
		source     = require('vinyl-source-stream');

	// Task.
	return browserify(dist_dir + 'js/app/').bundle()
		.pipe(source('index.js'))
		.pipe(rename('app.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'));
});



/* =========================================================================== */
/* JS (Master)
/* =========================================================================== */
gulp.task('js', ['js_app'], function(){
	// Require.
	var concat = require('gulp-concat');

	// Task.
	return gulp.src([dist_dir + 'js/compiled/common.js', dist_dir + 'js/compiled/app.js'])
	    .pipe(concat('build.js'))
	    .pipe(gulp.dest(dist_dir + 'js/build'));
});



/* =========================================================================== */
/* CSS
/* =========================================================================== */
gulp.task('css', function(){
	// Require.
	var sass         = require('gulp-sass'),
		sourcemaps   = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer');

	// Task.
	return gulp.src(dist_dir + 'css/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
	        outputStyle: 'expanded'
	    }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(sourcemaps.write('/', {includeContent: false}))
		.pipe(gulp.dest(dist_dir + 'css'));
});



/* =========================================================================== */
/* Watch
/* =========================================================================== */
gulp.task('watch', function(){
	// Run Browserify on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/*.js', dist_dir + 'js/plugins/*.js', dist_dir + 'js/**/*.hbs'], ['js']);
	// Run Compass on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
});



/* =========================================================================== */
/* Dalek
/* =========================================================================== */
gulp.task('dalek', function(){
	// Require.
	var dalek = require('gulp-dalek');

	// Files.
	var tests = [
		// dist_dir + 'js/spec/dalek/examples.js',
		dist_dir + 'js/spec/dalek/elements.js',
		dist_dir + 'js/spec/dalek/roles.js'
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
					'html',
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
