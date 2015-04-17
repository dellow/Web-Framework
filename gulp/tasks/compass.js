/* ================================================== */
/* Require
/* ================================================== */
var gulp         = require('gulp'),
	util 	     = require('gulp-util'),
	gulpif       = require('gulp-if'),
	streamify    = require('gulp-streamify'),
	minify       = require('gulp-minify-css'),
	compass      = require('gulp-compass'),
	notification = require('node-notifier');

/* ================================================== */
/* Vars
/* ================================================== */
var minify 	    = (GLOBAL.args.config == undefined || GLOBAL.is_production) ? true : false,
	environment = (GLOBAL.is_production) ? 'production' : 'development',
	sourcemap 	= (GLOBAL.is_production) ? false : true,
	logging   	= (GLOBAL.is_production) ? false : true;

/* ================================================== */
/* Functions
/* ================================================== */
function error_handler(err){
	// Show notification.
	notification.notify({
		message: 'Error: ' + err.message
	});
	// Show in terminal log.
	util.log(util.colors.red('Error'), err.message);
}

function compass_handler(err){
	// Standard error.
	error_handler(err);
	// Don't break stream.
	this.emit('end');
}

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('compass', function(){
	return gulp.src(GLOBAL.dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			style         : 'expanded',
			environment   : environment,
			css           : GLOBAL.dist_dir + 'css',
			sass          : GLOBAL.dist_dir + 'css/scss',
			sourcemap     : sourcemap,
			logging       : logging,
			force         : true,
			relativeAssets: true,
			noLineComments: true
		}))
		.on('error', browserify_handler)
		.pipe(gulpif(minify, streamify(uglify()), streamify(beautify({indentSize: 4}))))
		.pipe(gulp.dest(GLOBAL.dist_dir + 'css'));
});
