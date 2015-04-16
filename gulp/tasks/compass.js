/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	compass = require('gulp-compass');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('compass', function(){
	return gulp.src(GLOBAL.dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			css             : GLOBAL.dist_dir + 'css',
			sass            : GLOBAL.dist_dir + 'css/scss',
			sourcemap       : true,
			force           : true,
			relativeAssets  : true,
			noLineComments  : true,
			assetCacheBuster: false
		}))
		.pipe(gulp.dest(GLOBAL.dist_dir + 'css'));
});
