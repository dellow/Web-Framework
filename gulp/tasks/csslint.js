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
		return gulp.src(GLOBAL.dist_dir + 'css/**/*.css')
		    .pipe(csslint())
		    .pipe(csslint.reporter());
	}
});