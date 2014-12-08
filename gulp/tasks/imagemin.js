/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    imagemin = require('gulp-imagemin');

/* ================================================== */
/* Task
/* ================================================== */
// Run image optimisations
gulp.task('imagemin', function(){
    return gulp.src(GLOBAL.dist_dir + 'images/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive      : true,
            interlaced       : true
        }))
        .pipe(gulp.dest(GLOBAL.dist_dir + 'images'));
});