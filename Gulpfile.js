/* =========================================================================== */
/* GLOBAL Requires & GLOBAL Variables
/* Use very sparingly (http://stackoverflow.com/questions/5447771/node-js-global-variables)
/* =========================================================================== */
// Require.
var gulp         = require('gulp'),
	args         = require('yargs').argv,
	gulpif       = require('gulp-if'),
	util 	     = require('gulp-util'),
	streamify    = require('gulp-streamify'),
	notification = require('node-notifier');

// Vars.
var is_development = (args.config == 'development' || args.config == undefined) ? true : false,
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
/* Browsersync
/* =========================================================================== */
gulp.task('browserify', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename'),
		beautify   = require('gulp-beautify'),
		uglify     = require('gulp-uglify'),
		source     = require('vinyl-source-stream');

	// Vars.
	var minify = (args.config == undefined || is_production) ? true : false;

	// Task.
	return browserify(dist_dir + 'js/app/')
		.bundle()
		.on('error', task_handler)
		.pipe(source('index.js'))
		.pipe(gulpif(minify, streamify(uglify()), streamify(beautify({
			indentSize: 4
		}))))
		.pipe(rename('build.js'))
		.pipe(gulp.dest(dist_dir + 'js/build/'));
});



/* =========================================================================== */
/* Browsersync
/* =========================================================================== */
gulp.task('server', function(){
	// Require.
	var browserSync = require('browser-sync'),
		reload      = browserSync.reload;

	// Vars.
	var url        = args.url,
		notify     = args.notify || false,
		https      = args.https || false,
		compass    = function(){gulp.start('compass')},
	    browserify = function(){gulp.start('browserify')};

	if(url){
		browserSync({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : true,
			proxy  : url
		});
	}
	else{
		browserSync({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : true,
			server : {
				baseDir: [src_dir]
			}
		});
	}

	// Run Browserify on JS file changes
	gulp.watch(dist_dir + 'js/**/*.js', browserify);

	// Run Compass on SCSS file changes
	gulp.watch(dist_dir + 'css/scss/**/*.scss', compass);

	// Reload on file changes
	gulp.watch([
		src_dir + '**/*.hbs',
		src_dir + '**/*.html',
		src_dir + '**/*.php',
		dist_dir + 'css/build.css',
		dist_dir + 'js/build/build.js'
	], reload);
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
		.pipe(gulpif(should_min, streamify(minify()), streamify(cssbeautify({
			indent       : '    ',
			autosemicolon: true
        }))))
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
/* Sprites
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
/* Watch
/* =========================================================================== */
gulp.task('watch', function(){
	// Require.
	var lr     = require('tiny-lr'),
		server = lr();

	// Task.
	server.listen(35729, function(err){
		var browserify = function(){gulp.start('browserify')},
		    compass    = function(){gulp.start('compass')};

		if(err){
			return console.log(err);
		}

		// Run Browserify on JS file changes
		gulp.watch(dist_dir + 'js/**/*.js', browserify);
		// Run Browserify on HBS file changes
		gulp.watch(dist_dir + 'js/**/*.hbs', browserify);
		// Run Compass on SCSS file changes
		gulp.watch(dist_dir + 'css/scss/**/*.scss', compass);
	});
});
