/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	changed = require('gulp-changed');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('sync', function(){
    var ret = gulp.src('./app/*')
        .pipe(changed('./release/src'))
        .pipe(gulp.dest('./release/src'));

    return ret;
});