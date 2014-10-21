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
	watch({glob: GLOBAL.dist_dir + 'css/scss/**/*.scss'}, function(){
		gulp.start('compass');
	});
	// Run Browserify on JS file changes
	watch({glob: GLOBAL.dist_dir + 'js/**/*.js'}, function(){
		gulp.start('browserify');
	});

	// Reload on file changes
	watch([
		GLOBAL.src_dir + '**/*.html',
		GLOBAL.src_dir + '**/*.php',
		GLOBAL.dist_dir + 'css/main.css',
		GLOBAL.dist_dir + 'js/build/build.js'
	], reload);
});