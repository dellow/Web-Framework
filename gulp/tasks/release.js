/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    changed  = require('gulp-changed'),
    html     = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin');

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
        '!' + GLOBAL.src_dir + '**/js/{spec,spec/**}'
    ];

/* ================================================== */
/* Task
/* ================================================== */
// Makes a timestamped release of the `src` directory and optimises based on current state.
gulp.task('release', function(){
    // Run sequence tasks.
    if(GLOBAL.is_production){
        sequence('release-task-move', 'release-sync', 'release-task-minify', 'release-task-imagemin');
    }
    else{
        sequence('release-task-move', 'release-sync');
    }
});

/* ================================================== */
/* Sub Tasks
/* ================================================== */
// Moves files to the release directory.
gulp.task('release-task-move', ['compass', 'browserify'], function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(gulp.dest(release));
});

// Syncs the files to 'current' directory within release.
// This will only move changed files.
gulp.task('release-sync', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(changed('./releases/current'))
        .pipe(gulp.dest('./releases/current'));
});

// Minifies HTML.
// Production only.
gulp.task('release-task-minify', function(){
    // Options
    var opts = {
        comments: true,
        spare   : true
    };
    return gulp.src([release + '*.html', release + '*.php'])
        .pipe(html(opts))
        .pipe(gulp.dest('./releases/current'))
        .pipe(gulp.dest(release));
});

// Run image optimisations
// Production only.
gulp.task('release-task-imagemin', function(){
    // Options
    var opts = {
        optimizationLevel: 3,
        progressive      : true,
        interlaced       : true
    };
    return gulp.src(release + 'dist/images/**/*')
        .pipe(imagemin(opts))
        .pipe(gulp.dest('./releases/current/dist/images'));
});