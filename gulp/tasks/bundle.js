/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    changed  = require('gulp-changed');

/* ================================================== */
/* Vars
/* ================================================== */
var files = [
        GLOBAL.src_dir + '**',
        '!' + GLOBAL.src_dir + '**/{scss,scss/**}',
        '!' + GLOBAL.src_dir + '**/js/{app,app/**}',
        '!' + GLOBAL.src_dir + '**/js/{plugins,plugins/**}',
        '!' + GLOBAL.src_dir + '**/js/{spec,spec/**}',
        '!' + GLOBAL.src_dir + '**/js/{vendor,vendor/**}'
    ];

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('bundle', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(changed(GLOBAL.app_dir))
        .pipe(gulp.dest(GLOBAL.app_dir));
});