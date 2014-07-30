/* ================================================== */
/* Require
/* ================================================== */
var gulp        = require('gulp'),
	gulpif      = require('gulp-if'),
	jshint      = require('gulp-jshint'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('jshint', function(){
    // Run on development only
    if(GLOBAL.is_development){
		var ret = gulp.src(GLOBAL.dist_dir + 'js/**/*.js')
	    .pipe(reload({stream: true, once: true}))
	    .pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulpif(!browserSync.active, $.jshint.reporter('fail')));

		return ret;
	}
});