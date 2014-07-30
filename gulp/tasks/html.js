/* ================================================== */
/* Require
/* ================================================== */
var gulp = require('gulp'),
	html = require('gulp-minify-html');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('html', function(){
    // Run on production only
    if(GLOBAL.is_production){
        var opts = {
            comments: true,
            spare: true
        };

        var ret = gulp.src('./app/*.html')
        .pipe(html(opts))
        .pipe(gulp.dest('./app/'));

        return ret;
    }
});