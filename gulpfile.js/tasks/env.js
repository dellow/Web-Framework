/**
 *
 * Gulpfile > Tasks > Env
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

;(function(GulpTask){

	/* =========================================================================== */
	/* Config
	/* =========================================================================== */
	var config = require('../config.json');


	/* =========================================================================== */
	/* Global Dependencies
	/* =========================================================================== */
	var gulp   = require('gulp'),
		args   = require('yargs').argv;


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		return process.env.NODE_ENV = (args.config == 'production') ? 'production' : 'development';
	}

	// Task
	gulp.task('env', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));