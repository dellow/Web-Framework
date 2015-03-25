/* ================================================== */
/* Require
/* ================================================== */
var args   = require('yargs').argv,
	gulp   = require('gulp'),
	psi    = require('psi'),
	fs 	   = require('fs-extra'),
	header = require('gulp-header');

/* ================================================== */
/* Vars
/* ================================================== */
var url  = args.url || 'http://google.com',
	mode = args.mode || 'desktop';

// Seems to freeze without this.
console.log('Query URL: ' + url);

/* ================================================== */
/* Functions
/* ================================================== */
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
	var matches = url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i),
		domain = matches && matches[1];

    return domain;
}

/* ================================================== */
/* Task
/* ================================================== */
// var options = ['', mode, 'en_GB'];
var options = [];

gulp.task('psi', options, function(){
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
			file = './logs/pagespeed/' + dir;

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
			.pipe(gulp.dest('./logs/pagespeed'));

			// Report
			console.log("Log has been recorded to: " + file);
		});
	});
});