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
	return gulp.src(GLOBAL.dist_dir + 'js/spec/tests-jasmine.js')
        .pipe(jasmine());
});
