/* ================================================== */
/* Require
/* ================================================== */
var gulp       = require('gulp'),
	browserify = require('browserify'),
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
	return browserify(GLOBAL.dist_dir + 'js/app/')
		.bundle()
		.pipe(source('index.js'))
		.pipe(rename('build.js'))
		.on('error', handleError)
		.pipe(gulp.dest(GLOBAL.dist_dir + 'js/build/'));
});
