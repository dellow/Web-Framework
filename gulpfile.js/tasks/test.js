/**
 *
 * Gulpfile > Tasks > Test
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

;(function(GulpTask1, GulpTask2, GulpTask3){

	/* =========================================================================== */
	/* Config
	/* =========================================================================== */
	var config = require('../config.json');


	/* =========================================================================== */
	/* Global Dependencies
	/* =========================================================================== */
	var gulp   = require('gulp'),
		args   = require('yargs').argv,
		notify = require('gulp-notify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream');


	/* =========================================================================== */
	/* Task Dependencies
	/* =========================================================================== */
	var Server = require('karma').Server,
	    nightwatch = require('gulp-nightwatch');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	var GulpTask1 = function(){
		// Show notification.
		gulp.src('gulpfile.js').pipe(notify({
			message: 'Test task is complete'
		}));
	}


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	var GulpTask2 = function(){
		return new Server({
			configFile: config.test.karma,
			singleRun: true
		}, function(exitCode){
		    done();
		}).start();
	}


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	var GulpTask3 = function(){
	  	return gulp.src('')
			.pipe(nightwatch({
				configFile: config.test.nightwatch
			}));
	}

	// Task
	gulp.task('test', ['test:unit', 'test:functional'], GulpTask1);
	gulp.task('test:unit', GulpTask2);
	gulp.task('test:functional', GulpTask3);

	// Export
	module.exports = {
	    'test': GulpTask1,
	    'unit': GulpTask2,
	    'functional': GulpTask3
	};

}(function(){}, function(){}, function(){}));