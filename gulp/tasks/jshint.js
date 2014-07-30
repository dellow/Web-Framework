/* ================================================== */
/* Require
/* ================================================== */
var gulp        = require('gulp'),
	gulpif      = require('gulp-if'),
	jshint      = require('gulp-jshint')

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jshint', function(){
    // Run on development only
    if(GLOBAL.is_development){
		var ret = gulp.src(GLOBAL.dist_dir + 'js/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'));

		return ret;
	}
});