/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	compass = require('gulp-compass');

/* ================================================== */
/* Vars
/* ================================================== */
var minify      = (GLOBAL.is_production) ? 'compressed' : 'expanded',
	environment = (GLOBAL.is_production) ? 'production' : 'development',
	sourcemap   = (GLOBAL.is_production) ? false : true,
	logging     = (GLOBAL.is_production) ? false : true;

/* ================================================== */
/* Handle Errors
/* ================================================== */
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('compass', function(){
	var ret = gulp.src(GLOBAL.dist_dir + 'css/scss/**/*.scss')
	.pipe(compass({
		style           : minify,
		environment     : environment,
		css             : GLOBAL.dist_dir + 'css',
		sass            : GLOBAL.dist_dir + 'css/scss',
		sourcemap		: sourcemap,
		logging		    : logging,
		force           : true,
		relativeAssets  : true,
		noLineComments  : true,
		assetCacheBuster: false
	}))
	.on('error', handleError)
	.pipe(gulp.dest(GLOBAL.dist_dir + 'css'));

	return ret;
});