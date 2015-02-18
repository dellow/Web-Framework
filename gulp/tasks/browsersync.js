/* ================================================== */
/* Require
/* ================================================== */
var args        = require('yargs').argv,
	gulp        = require('gulp'),
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
gulp.task('server', function(){

	var compass    = function(){gulp.start('compass')},
	    browserify = function(){gulp.start('browserify')},
	    sprite     = function(){gulp.start('sprite')},
	    imagemin   = function(){gulp.start('imagemin')};

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

	// Run Browserify on JS file changes
	gulp.watch(GLOBAL.dist_dir + 'js/**/*.js', browserify);

	// Run Compass on SCSS file changes
	gulp.watch(GLOBAL.dist_dir + 'css/scss/**/*.scss', compass);

	// Run Imagemin on image updates
	gulp.watch(GLOBAL.dist_dir + 'images/**/*', imagemin);

	// Run Sprites on image updates
	gulp.watch(GLOBAL.dist_dir + 'images/icons/sprite/*.png', sprite);

	// Reload on file changes
	gulp.watch([
		GLOBAL.src_dir + '**/*.html',
		GLOBAL.src_dir + '**/*.php',
		GLOBAL.dist_dir + 'css/build.css',
		GLOBAL.dist_dir + 'js/build/build.js'
	], reload);
});