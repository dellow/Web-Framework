/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    gulpif   = require('gulp-if'),
    html     = require('gulp-minify-html'),
    cache    = require('gulp-cache'),
    size     = require('gulp-size'),
    imagemin = require('gulp-imagemin');

/* ================================================== */
/* Vars
/* ================================================== */
var state   = (GLOBAL.args != undefined) ? GLOBAL.args : 'development',
	release = GLOBAL.releases_dir + 'app_' + Date.now() + '_' + state + '/';

var files = [
    GLOBAL.dist_dir + 'css/main.css',
    GLOBAL.dist_dir + 'js/build/**/*',
    GLOBAL.dist_dir + 'js/vendor/**/*',
    GLOBAL.dist_dir + 'images/**/*.*',
    GLOBAL.src_dir + '*.*'
];

var html_opts = {
    comments: true,
    spare: true
};

/* ================================================== */
/* Task
/* ================================================== */
// Moves all application files to `app` directory and optimises based on
// current state.
gulp.task('bundle', function(){
    sequence('move-bundle', 'html-bundle', 'image-bundle');
});

// Makes a timestamped release of the `src` directory and optimises based
// on current state.
gulp.task('release', function(){
    sequence('move-release', 'html-release', 'image-release');
});


// Bundle tasks
gulp.task('move-bundle', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(gulp.dest(GLOBAL.app_dir));
});
gulp.task('html-bundle', function(){
    // Run on production only
    if(GLOBAL.is_production){
        return gulp.src([GLOBAL.app_dir + '*.html', GLOBAL.app_dir + '*.php'])
            .pipe(html(html_opts))
            .pipe(gulp.dest(GLOBAL.app_dir));
    }
});
gulp.task('image-bundle', function(){
    // Run on production only
    if(GLOBAL.is_production){
        return gulp.src(GLOBAL.app_dir + 'dist/images/**/*')
            .pipe(cache(imagemin({
                progressive: true,
                interlaced: true
            })))
            .pipe(gulp.dest(GLOBAL.app_dir + 'dist/images'))
            .pipe(size({title: 'images'}));
    }
});

// Release tasks
gulp.task('move-release', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(gulp.dest(release));
});
gulp.task('html-release', function(){
    // Run on production only
    if(GLOBAL.is_production){
        return gulp.src([GLOBAL.app_dir + '*.html', GLOBAL.app_dir + '*.php'])
            .pipe(html(html_opts))
            .pipe(gulp.dest(release));
    }
});
gulp.task('image-release', function(){
    // Run on production only
    if(GLOBAL.is_production){
        return gulp.src(GLOBAL.app_dir + 'dist/images/**/*')
            .pipe(cache(imagemin({
                progressive: true,
                interlaced: true
            })))
            .pipe(gulp.dest(release + 'dist/images'))
            .pipe(size({title: 'images'}));
    }
});