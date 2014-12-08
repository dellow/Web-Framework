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

	var compass    = function(){gulp.start('compass')},
	    browserify = function(){gulp.start('browserify')},
	    sprite     = function(){gulp.start('sprite')},
	    imagemin   = function(){gulp.start('imagemin')};

	server.listen(35729, function(err){
		if(err){
			return console.log(err);
		}

		// Run Compass on SCSS file changes
		watch({
			glob: GLOBAL.dist_dir + 'css/scss/**/*.scss'
		}, compass);

		// Run Browserify on JS file changes
		watch({
			glob: GLOBAL.dist_dir + 'js/**/*.js'
		}, browserify);

		// Run Imagemin on image updates
		watch({
			glob: GLOBAL.dist_dir + 'images/**/*'
		}, imagemin);

		// Run Sprites on image updates
		watch({
			glob: GLOBAL.dist_dir + 'images/icons/sprite/*.png'
		}, sprite);
	});
});