/**
 *
 * Gulpfile > Tasks > PSI
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
	var psi    = require('psi'),
	    header = require('gulp-header'),
		fs     = require('fs-extra');


	/* =========================================================================== */
	/* Task
	/* =========================================================================== */
	GulpTask = function(){
		// Vars
		var url  = args.url || 'http://google.com',
			mode = args.mode || 'desktop',
			options = [];

		// Seems to freeze without this.
		console.log('Query URL: ' + url);

		// Functions
		function convert_object(obj){
			var arr = [];
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
					var k = key.replace(/([A-Z])/g, ' $1'),
						k = k.replace(/^./, function(str){return str.toUpperCase()});

					arr.push(k + ' = ' + obj[key]);
				}
			};

			return arr.join(',');
		}
		function get_name(str){
			if(str.indexOf('http://') !=-1 || str.indexOf('https://') !=-1 || str.indexOf('www://') !=-1){
				var matches = url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i),
					domain = matches && matches[1];
			}
			else{
				var domain = str;
			}

			return domain;
		}
		
		psi(url, function(err, data){
			// Stats template.
			var stats = ['-----------------------------------',
				'Date: <%= date %>',
				'-',
				'Total Score: <%= score %>',
				'-',
				'URL: <%= url %>',
				'-',
				'Page Title: <%= title %>',
				'-',
				'Strategy / Mode: <%= mode %>',
				'-',
				'Page Stats:',
				'<%= pageStats %>',
				'-----------------------------------',
				'',
				''].join('\n');

			var dir  = get_name(url),
				file = './psi/' + dir;

			// Create file
			fs.ensureFile(file, function(err){
				// Task
				gulp.src(file)
				.pipe(header(stats, {
					date     : Date(),
					pageStats: convert_object(data.pageStats).split(',').join("\r\n"),
					score    : data.score,
					title    : data.title,
					mode     : mode,
					url      : data.id
				}))
				.pipe(gulp.dest('./psi/'))
				.pipe(notify({message: 'PSI task complete. Log has been recorded to: ' + file}));
			});
		});
	}

	// Task
	gulp.task('psi', GulpTask);

	// Export
	module.exports = GulpTask;

}(function(){}));