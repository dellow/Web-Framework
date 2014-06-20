/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	jasmine = require('gulp-jasmine');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jasmine', function(){
	var ret = gulp.src('./dist/js/spec/test.js')
        .pipe(jasmine());

	return ret;
});