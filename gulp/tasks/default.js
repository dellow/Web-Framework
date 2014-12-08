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
	'imagemin',
	// Development states
	'dalek',
	'jasmine',
	'jshint'
]);