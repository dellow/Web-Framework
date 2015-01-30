/* ================================================== */
/* Require
/* ================================================== */
var gulp       = require('gulp'),
	watch      = require('gulp-watch'),
	lr         = require('tiny-lr'),
	server     = lr();

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	server.listen(35729, function(err){
		var browserify = function(){gulp.start('browserify')},
		    compass    = function(){gulp.start('compass')},
		    imagemin   = function(){gulp.start('imagemin')};

		if(err){
			return console.log(err);
		}

		// Run Browserify on JS file changes
		watch(GLOBAL.dist_dir + 'js/**/*.js', browserify);
		// Run Compass on SCSS file changes
		watch(GLOBAL.dist_dir + 'css/scss/**/*.scss', compass);
		// Run Imagemin on image updates
		watch(GLOBAL.dist_dir + 'images/**/*.*', imagemin);
	});
});