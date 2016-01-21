/**
 *
 * Gulpfile > Tasks > Sync
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
		args   = require('yargs').argv,
		notify = require('gulp-notify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream');


	/* =========================================================================== */
	/* Task Dependencies
	/* =========================================================================== */
	var browserSync = require('browser-sync'),
		reload      = browserSync.reload;


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		// Vars.
		var url    = args.url || false,
		    notify = args.notify || false,
		    xip    = args.xip || true,
		    https  = args.https || false;

	    if(url){
	        browserSync.init({
	            open   : 'external',
	            browser: ['google chrome'],
	            notify : notify,
	            https  : https,
	            xip    : xip,
	            proxy  : url
	        });
	    }
	    else{
	        browserSync.init({
	            open   : 'external',
	            browser: ['google chrome'],
	            notify : notify,
	            https  : https,
	            xip    : xip,
	            server : {
	                baseDir: [config.src]
	            }
	        });
	    }

	    // Run Browserify on JS and HBS file changes.
	    gulp.watch([
	        config.dist + 'js/**/*.js',
	        config.dist + 'js/**/*.hbs',
	        '!' + config.dist + 'js/build/*.js',
	        '!' + config.dist + 'js/compiled/*.js'
	    ], ['js']);
	    // Run CSS on SCSS file changes.
	    gulp.watch(config.dist + 'css/scss/**/*.scss', ['css']);
	    // Reload on file changes.
	    gulp.watch([
	        // config.src + '**/*.html',
	        // config.src + '**/*.php',
	        config.dist + 'css/build.css', // Master bundled file.
	        config.dist + 'js/build/build.js' // Master bundled file.
	    ], reload);
	}

	// Task
	gulp.task('sync', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));