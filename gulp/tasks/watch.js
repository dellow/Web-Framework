/* ================================================== */
/* Require
/* ================================================== */
var gulp  = require('gulp'),
	watch = require('gulp-watch');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	var css = ['compass'],
		js  = ['browserify'];

	gulp.watch('./dist/css/scss/**/*.scss', css);
	gulp.watch('./dist/js/**/*.js', js);
});