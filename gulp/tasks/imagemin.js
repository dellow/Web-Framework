/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
	cache    = require('gulp-cache'),
	size     = require('gulp-size'),
	imagemin = require('gulp-imagemin');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('imagemin', function(){
    // Run on production only
    if(GLOBAL.is_production){
      	var ret = gulp.src(GLOBAL.dist_dir + 'images/**/*')
        .pipe(cache(imagemin({
    		progressive: true,
    		interlaced: true
        })))
        .pipe(gulp.dest(GLOBAL.dist_dir + 'images'))
        .pipe(size({title: 'images'}));

        return ret;
    }
});