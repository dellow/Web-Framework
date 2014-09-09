/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    changed  = require('gulp-changed'),
    html     = require('gulp-minify-html'),
    cache    = require('gulp-cache'),
    size     = require('gulp-size'),
    imagemin = require('gulp-imagemin'),
    base64   = require('gulp-base64');

/* ================================================== */
/* Vars
/* ================================================== */
var state   = (GLOBAL.args != undefined) ? GLOBAL.args : 'development',
    release = GLOBAL.releases_dir + 'app_' + Date.now() + '_' + state + '/',
    files   = [
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
// Moves all application files to `app` directory
gulp.task('bundle', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(changed(GLOBAL.app_dir))
        .pipe(gulp.dest(GLOBAL.app_dir));
});

// Makes a timestamped release of the `src` directory and optimises based on current state.
gulp.task('release', function(){
    sequence('r-move', 'r-minify', 'r-base64', 'r-imagemin');
});

// Release sub tasks
gulp.task('r-move', ['compass', 'browserify'], function(){
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
            spare   : true
        };
        return gulp.src([release + '*.html', release + '*.php'])
            .pipe(html(opts))
            .pipe(gulp.dest('./releases/current'))
            .pipe(gulp.dest(release));
    }
});
gulp.task('r-base64', function(){
    // Run on production only
    if(GLOBAL.is_production){
        // Options
        var opts = {
            baseDir     : '',
            extensions  : ['svg', 'png', 'gif', /\.jpg#datauri$/i],
            maxImageSize: 8*1024, // bytes
            debug       : false
        };
        return gulp.src(release + 'dist/css/*.css')
            .pipe(base64(opts))
            .pipe(gulp.dest('./releases/current/dist/css'))
            .pipe(gulp.dest(release + 'dist/css'));
    }
});
gulp.task('r-imagemin', function(){
    // Run on production only
    if(GLOBAL.is_production){
        // Options
        var opts = {
            progressive: true,
            interlaced : true
        };
        return gulp.src(release + 'dist/images/**/*')
            .pipe(cache(imagemin(opts)))
            .pipe(gulp.dest('./releases/current/dist/images'))
            .pipe(gulp.dest(release + 'dist/images'))
            .pipe(size({title: 'images'}));
    }
});