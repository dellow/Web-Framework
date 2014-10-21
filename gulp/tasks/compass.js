/* ================================================== */
/* Require
/* ================================================== */
var gulp      = require('gulp'),
	gulpif    = require('gulp-if'),
	streamify = require('gulp-streamify'),
	minify    = require('gulp-minify-css'),
	compass   = require('gulp-compass');

/* ================================================== */
/* Vars
/* ================================================== */
var environment = (GLOBAL.is_production) ? 'production' : 'development',
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
	return gulp.src(GLOBAL.dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			environment     : environment,
			css             : GLOBAL.dist_dir + 'css',
			sass            : 'src/dist/css/scss', // Temporary fix while compass doesn't accept './' in path
			// sass            : GLOBAL.dist_dir + 'css/scss',
			sourcemap		: sourcemap,
			logging		    : logging,
			force           : true,
			relativeAssets  : true,
			noLineComments  : true
		}))
		.on('error', handleError)
		.pipe(gulpif(GLOBAL.is_production, streamify(minify())))
		.pipe(gulp.dest(GLOBAL.dist_dir + 'css'));
});