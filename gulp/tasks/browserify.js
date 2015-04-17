/* ================================================== */
/* Require
/* ================================================== */
var gulp         = require('gulp'),
	util 	     = require('gulp-util'),
	gulpif       = require('gulp-if'),
	browserify   = require('browserify'),
	streamify    = require('gulp-streamify'),
	beautify     = require('gulp-beautify'),
	uglify       = require('gulp-uglify'),
	rename       = require('gulp-rename'),
	source       = require('vinyl-source-stream')
	notification = require('node-notifier');

/* ================================================== */
/* Vars
/* ================================================== */
var minify = (GLOBAL.args.config == undefined || GLOBAL.is_production) ? true : false;

/* ================================================== */
/* Functions
/* ================================================== */
function error_handler(err){
	// Show notification.
	notification.notify({
		message: 'Error: ' + err.message
	});
	// Show in terminal log.
	util.log(util.colors.red('Error'), err.message);
}

function browserify_handler(err){
	// Standard error.
	error_handler(err);
	// Don't break stream.
	this.emit('end');
}

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('browserify', function(){
	return browserify(GLOBAL.dist_dir + 'js/app/')
		.bundle()
		.on('error', browserify_handler)
		.pipe(source('index.js'))
		.pipe(gulpif(minify, streamify(uglify()), streamify(beautify({indentSize: 4}))))
		.pipe(rename('build.js'))
		.pipe(gulp.dest(GLOBAL.dist_dir + 'js/build/'));
});
