/* ================================================== */
/* Require
/* ================================================== */
var gulp = require('gulp');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('default', [
	// All states
	'browserify',
	'compass',
	// Development states
	'csslint',
	'jasmine',
	'jshint',
	// Bundle must run last
	'bundle'
]);