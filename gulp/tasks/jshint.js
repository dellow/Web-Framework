/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	jshint  = require('gulp-jshint'),
	stylish = require('jshint-stylish');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jshint', function(){
    // Run on development only
	return gulp.src(GLOBAL.dist_dir + 'js/app/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});
