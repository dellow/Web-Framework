/* ================================================== */
/* Require
/* ================================================== */
var gulp       = require('gulp'),
	gulpif     = require('gulp-if'),
	browserify = require('browserify'),
	streamify  = require('gulp-streamify'),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	source     = require('vinyl-source-stream');

/* ================================================== */
/* Handle Errors
/* ================================================== */
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('browserify', function(){
	var ret = browserify(GLOBAL.dist_dir + 'js/app/')
		.bundle()
		.pipe(source('index.js'))
		.pipe(gulpif(GLOBAL.is_production, streamify(uglify())))
		.pipe(rename('build.js'))
		.on('error', handleError)
		.pipe(gulp.dest(GLOBAL.dist_dir + 'js/build/'));

	return ret;
});