/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	csslint = require('gulp-csslint');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('csslint', function(){
    // Run on development only
    if(GLOBAL.is_development){
		var ret = gulp.src('./app/dist/css/**/*.css')
	    .pipe(csslint())
	    .pipe(csslint.reporter());

		return ret;
	}
});