/* ================================================== */
/* Require
/* ================================================== */
var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    changed  = require('gulp-changed'),
    html     = require('gulp-minify-html');

/* ================================================== */
/* Vars
/* ================================================== */
var state   = (GLOBAL.args != undefined) ? GLOBAL.args : 'development',
    release = GLOBAL.releases_dir + 'app_' + Date.now() + '_' + state + '/',
    files   = [
        GLOBAL.src_dir + '**',
        '!' + GLOBAL.src_dir + '**/{.help,.help/**}',
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
        sequence('release-task-move', 'release-sync', 'release-task-minify');
    }
    else{
        sequence('release-task-move', 'release-sync');
    }
});

/* ================================================== */
/* Sub Tasks
/* ================================================== */
// Moves files to the release directory and run the
// Compass and Browserify tasks.
gulp.task('release-task-move', ['compass', 'browserify'], function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(gulp.dest(release));
});

// Syncs the files to 'current' directory within release.
// This will only move changed files.
gulp.task('release-sync', function(){
    return gulp.src(files, {base: GLOBAL.src_dir})
        .pipe(changed(GLOBAL.releases_dir + 'current'))
        .pipe(gulp.dest(GLOBAL.releases_dir + 'current'));
});

// Minifies HTML.
// Production only.
gulp.task('release-task-minify', function(){
    return gulp.src([release + '*.html'])
        .pipe(html({
            comments: true,
            spare   : true
        }))
        .pipe(gulp.dest(GLOBAL.releases_dir + 'current'))
        .pipe(gulp.dest(release));
});