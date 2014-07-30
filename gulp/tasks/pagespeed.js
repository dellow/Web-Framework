/* ================================================== */
/* Require
/* ================================================== */
var args      = require('yargs').argv,
	gulp      = require('gulp'),
	pagespeed = require('psi');

/* ================================================== */
/* Vars
/* ================================================== */
var url  = args.url || 'http://google.com',
	mode = args.mode || 'desktop';

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('pagespeed', pagespeed.bind(null, {
	url: url,
	strategy: mode
}));