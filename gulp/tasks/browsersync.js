/* ================================================== */
/* Require
/* ================================================== */
var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('serve', function(){
	var css = ['compass', reload],
		img = ['imagemin', reload],
		js  = ['browserify', reload];

	browserSync({
		notify: false,
		// https: true,
		server: {
			baseDir: ['./app']
		}
	});

	gulp.watch(['./app/**/*.html'], reload);
	gulp.watch(['./app/dist/css/**/*.css'], css);
	gulp.watch(['./app/dist/images/**/*'], img);
	gulp.watch(['./app/dist/js/**/*.js'], js);
});