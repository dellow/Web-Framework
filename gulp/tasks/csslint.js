/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	csslint = require('gulp-csslint');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('csslint', function(){
	var ret = gulp.src('./dist/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());

	return ret;
});