/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    changed  = require('gulp-changed'),
    html     = require('gulp-minify-html'),
    cache    = require('gulp-cache'),
    size     = require('gulp-size'),
    imagemin = require('gulp-imagemin');

/* ================================================== */
/* Vars
/* ================================================== */
var state   = (GLOBAL.args != undefined) ? GLOBAL.args : 'development',
    release = GLOBAL.releases_dir + 'app_' + Date.now() + '_' + state + '/',
    files   = [
        GLOBAL.dist_dir + 'css/main.css',
        GLOBAL.dist_dir + 'js/build/**/*',
        GLOBAL.dist_dir + 'js/vendor/**/*',
        GLOBAL.dist_dir + 'images/**/*.*',
        GLOBAL.src_dir + '*.*',
        GLOBAL.src_dir + '.*'
    ];

/* ================================================== */
/* Task
/* ================================================== */
// Moves all application files to `app` directory
gulp.task('bundle', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(changed(GLOBAL.app_dir))
        .pipe(gulp.dest(GLOBAL.app_dir));
});

// Makes a timestamped release of the `src` directory and optimises based on current state.
gulp.task('release', function(){
    sequence('r-move', 'r-minify', 'r-imagemin');
});

// Release sub tasks
gulp.task('r-move', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(gulp.dest('./releases/current'))
        .pipe(gulp.dest(release));
});
gulp.task('r-minify', function(){
    // Run on production only
    if(GLOBAL.is_production){
        // Options
        var opts = {
            comments: true,
            spare: true
        };
        return gulp.src([release + '*.html', release + '*.php'])
            .pipe(html(opts))
            .pipe(gulp.dest('./releases/current'))
            .pipe(gulp.dest(release));
    }
});
gulp.task('r-imagemin', function(){
    // Run on production only
    if(GLOBAL.is_production){
        return gulp.src(release + 'dist/images/**/*')
            .pipe(cache(imagemin({
                progressive: true,
                interlaced: true
            })))
            .pipe(gulp.dest('./releases/current/dist/images'))
            .pipe(gulp.dest(release + 'dist/images'))
            .pipe(size({title: 'images'}));
    }
});