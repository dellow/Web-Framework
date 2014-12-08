/* ================================================== */
/* Require
/* ================================================== */
var args      = require('yargs').argv,
	gulp      = require('gulp'),
	pagespeed = require('psi'),
	fs 		  = require('fs-extra'),
	header    = require('gulp-header');

/* ================================================== */
/* Vars
/* ================================================== */
var url  = args.url || 'http://google.com',
	mode = args.mode || 'desktop';

/* ================================================== */
/* Functions
/* ================================================== */
function convert_object(obj){
	var arr = [];
	for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	    	var k = key.replace(/([A-Z])/g, ' $1'),
	    		k = k.replace(/^./, function(str){ return str.toUpperCase(); });

	        arr.push(k + ' = ' + obj[key]);
	    }
	};

	return arr.join(',');
}

function get_name(str){
	// Remove protocol
	var a = str.replace(/^(https?|ftp|www):\/\/(www)./g, '');
	var b = a.substr(0, a.indexOf('/'));

    return b;
}

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('pagespeed', function(){
	pagespeed({
		url     : url,
		strategy: mode,
		locale  : 'en_GB'
	}, function(err, data){
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
				url      : data.id
			}))
			.pipe(gulp.dest('./logs/pagespeed'));

			// Report
			console.log("Log has been recorded to: " + file);
		});

	});
});