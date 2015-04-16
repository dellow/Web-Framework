/* ================================================== */
/* Require
/* ================================================== */
var gulp       = require('gulp'),
	gulpif     = require('gulp-if'),
	browserify = require('browserify'),
	streamify  = require('gulp-streamify'),
	beautify   = require('gulp-beautify'),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	source     = require('vinyl-source-stream');

/* ================================================== */
/* Vars
/* ================================================== */
var minify = (GLOBAL.args.config == undefined || GLOBAL.is_production) ? true : false;

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
		.pipe(gulpif(minify, streamify(uglify()), streamify(beautify({indentSize: 4}))))
		.pipe(rename('build.js'))
		.on('error', handleError)
		.pipe(gulp.dest(GLOBAL.dist_dir + 'js/build/'));
});
