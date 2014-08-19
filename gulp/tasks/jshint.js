/* ================================================== */
/* Require
/* ================================================== */
var gulp        = require('gulp'),
	gulpif      = require('gulp-if'),
	jshint      = require('gulp-jshint'),
	stylish     = require('jshint-stylish');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jshint', function(){
    // Run on development only
    if(GLOBAL.is_development){
		return gulp.src(GLOBAL.dist_dir + 'js/**/*.js')
		    .pipe(jshint())
		    .pipe(jshint.reporter(stylish));
	}
});