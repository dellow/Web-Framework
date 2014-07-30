/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	jasmine = require('gulp-jasmine');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jasmine', function(){
    // Run on development only
    if(GLOBAL.is_development){
		var ret = gulp.src(GLOBAL.dist_dir + 'js/spec/test.js')
	        .pipe(jasmine());

		return ret;
    }
});