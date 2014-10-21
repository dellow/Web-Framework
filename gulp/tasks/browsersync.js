/* ================================================== */
/* Require
/* ================================================== */
var args        = require('yargs').argv,
	gulp        = require('gulp'),
	watch       = require('gulp-watch'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

/* ================================================== */
/* Vars
/* ================================================== */
var url    = args.url,
	notify = args.notify || false,
	https  = args.https || false;

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('serve', function(){

	var compass    = function(){gulp.start('compass')},
	    browserify = function(){gulp.start('browserify')};

	if(url){
		browserSync({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : true,
			proxy  : url
		});
	}
	else{
		browserSync({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : true,
			server : {
				baseDir: [GLOBAL.src_dir]
			}
		});
	}

	// Run Compass on SCSS file changes
	watch({
		glob: GLOBAL.dist_dir + 'css/scss/**/*.scss'
	}, compass);
	// Run Browserify on JS file changes
	watch({
		glob: GLOBAL.dist_dir + 'js/**/*.js'
	}, browserify);
	// Reload on file changes
	watch({
		glob: [
			GLOBAL.src_dir + '**/*.html',
			GLOBAL.src_dir + '**/*.php',
			GLOBAL.dist_dir + 'css/main.css',
			GLOBAL.dist_dir + 'js/build/build.js'
		]
	}, reload);
});