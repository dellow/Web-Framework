/* =========================================================================== */
/* GLOBAL Requires & GLOBAL Variables
/* Use very sparingly (http://stackoverflow.com/questions/5447771/node-js-global-variables)
/* =========================================================================== */
// Require.
var gulp         = require('gulp'),
	args         = require('yargs').argv,
	gulpif       = require('gulp-if'),
	util 	     = require('gulp-util'),
	buffer       = require('vinyl-buffer'),
	source       = require('vinyl-source-stream'),
	notification = require('node-notifier');

// Vars.
var version        = '1.0.0',
	is_development = (args.config == 'development' || args.config == undefined) ? true : false,
	is_production  = (args.config == 'production') ? true : false,
	src_dir        = './src/',
	dist_dir       = './src/dist/';

// Functions.
function error_handler(err){
	// Show notification.
	notification.notify({
		message: 'Error: ' + err.message
	});
	// Show in terminal log.
	util.log(util.colors.red('Error'), err.message);
}
function task_handler(err){
	// Standard error.
	error_handler(err);
	// Don't break stream.
	this.emit('end');
}



/* =========================================================================== */
/* Combined Tasks & Global Requires
/* =========================================================================== */
// Task.
gulp.task('default', [
	'browserify',
	'compass',
	'imagemin'
]);



/* =========================================================================== */
/* Browserify
/* =========================================================================== */
gulp.task('browserify', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename'),
		beautify   = require('gulp-beautify'),
		uglify     = require('gulp-uglify');

	// Vars.
	var should_min = (args.config == undefined || is_production) ? true : false;
	// Header template.
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> JavaScript',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return browserify(dist_dir + 'js/app/').bundle()
	    .pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(gulpif(should_min, uglify(), beautify({indentSize: 4})))
		.pipe(rename('build.js'))
		.pipe(header(header_tpl, {
			type   : (should_min) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
		.pipe(gulp.dest(dist_dir + 'js/build/'));
});



/* =========================================================================== */
/* Compass
/* =========================================================================== */
gulp.task('compass', function(){
	// Require.
	var compass     = require('gulp-compass'),
		cssbeautify = require('gulp-cssbeautify'),
		minify      = require('gulp-minify-css');

	// Vars.
	var should_min = (args.config == undefined || is_production) ? true : false;
	// Header template.
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> Stylesheet',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return gulp.src(dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			style         : 'expanded',
			environment   : (is_production) ? 'production' : 'development',
			css           : dist_dir + 'css',
			sass          : dist_dir + 'css/scss',
			sourcemap     : (is_production) ? false : true,
			logging       : (is_production) ? false : true,
			force         : true,
			relativeAssets: true,
			noLineComments: true
		}))
		.on('error', task_handler)
	    .pipe(buffer())
		.pipe(gulpif(should_min, minify(), cssbeautify({indent: '    ', autosemicolon: true})))
		.pipe(header(header_tpl, {
			type   : (should_min) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
		.pipe(gulp.dest(dist_dir + 'css'));
});



/* =========================================================================== */
/* Imagemin
/* =========================================================================== */
gulp.task('imagemin', function(){
	// Require.
	var imagemin = require('gulp-imagemin');

	// Task
    return gulp.src(dist_dir + 'images/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive      : true,
            interlaced       : true
        }))
        .pipe(gulp.dest(dist_dir + 'images'));
});



/* =========================================================================== */
/* Sprite
/* =========================================================================== */
gulp.task('sprite', function(){
	// Require.
	var sprite = require('css-sprite').stream;

	// Task
	return gulp.src(dist_dir + 'images/icons/sprite/*.png')
	    .pipe(sprite({
			base64     : false,
			retina     : false,
			background : '#FFFFFF',
			margin     : 5,
			orientation: 'horizontal',
			prefix     : 'css-sprite',
			name       : 'sprite',
			style      : dist_dir + 'css/scss/site/_sprites.scss',
			cssPath    : '../images/icons/',
			processor  : 'scss'
	    }))
	    .pipe(gulpif('*.png', gulp.dest(dist_dir + 'images/icons'), gulp.dest(dist_dir + 'css/scss/site')))
});



/* =========================================================================== */
/* Sync
/* =========================================================================== */
gulp.task('sync', function(){
	// Require.
	var browserSync = require('browser-sync'),
		reload      = browserSync.reload;

	// Vars.
	var url    = args.url || false,
		notify = args.notify || false,
		xip    = args.xip || true,
		https  = args.https || false;

	if(url){
		browserSync.init({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : xip,
			proxy  : url
		});
	}
	else{
		browserSync.init({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : xip,
			server : {
				baseDir: [src_dir]
			}
		});
	}

	// Run Browserify on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/*.js', dist_dir + 'js/plugins/*.js', dist_dir + 'js/**/*.hbs'], ['browserify']);
	// Run Compass on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['compass']);
	// Reload on file changes.
	gulp.watch([
		src_dir + '**/*.html',
		src_dir + '**/*.php',
		dist_dir + 'css/build.css',
		dist_dir + 'js/build/build.js'
	], reload);
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
