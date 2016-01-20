/**
 *
 * Gulpfile
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

/* =========================================================================== */
/* Requires & Vars
/* =========================================================================== */
// Require.
var gulp   = require('gulp'),
	args   = require('yargs').argv,
	gulpif = require('gulp-if'),
	util   = require('gulp-util'),
	notify = require('gulp-notify'),
	buffer = require('vinyl-buffer'),
	header = require('gulp-header'),
	source = require('vinyl-source-stream');

// Vars.
var version        = '1.0.0',
	src_dir        = './src/',
	dist_dir       = './src/dist/',
	is_development = (args.config == 'development') ? true : false,
	is_production  = (args.config == 'production' || args.config == undefined) ? true : false,
	error_handler  = function(err){
		// Show notification.
		gulp.src('gulpfile.js').pipe(notify({
			message: 'Error: ' + err.message
		}));
		// Show in terminal log.
		util.log(util.colors.red('Error'), err.message);
	},
	task_handler = function(err){
		// Standard error.
		error_handler(err);
		// Don't break stream.
		this.emit('end');
	}


/* =========================================================================== */
/* Combined Tasks
/* Tasks that are run when `gulp` is run.
/* =========================================================================== */
// Task.
gulp.task('default', [
	'js',
	'css',
	'images',
	'jshint'
], function(){
	// Show notification.
	gulp.src('gulpfile.js').pipe(notify({
		message: 'Default task is complete'
	}));
});

// Task.
gulp.task('test', [
	'test:unit',
	'test:functional'
], function(){
	// Show notification.
	gulp.src('gulpfile.js').pipe(notify({
		message: 'Test task is complete'
	}));
});


/* =========================================================================== */
/* CSS
/* Compiles the SCSS files using SASS.
/* =========================================================================== */
gulp.task('css', function(){
	// Require.
	var sass         = require('gulp-sass'),
		sourcemaps   = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer');

	// Header template.
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> Stylesheet',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return gulp.src(dist_dir + 'css/scss/build.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
	        outputStyle: (is_production) ? 'compressed' : 'expanded',
        	errLogToConsole: true,
	        onError: function(err){
	            return notify.write(err);
	        }
	    }))
		.on('error', task_handler)
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
        .pipe(sourcemaps.write('./', {
			includeContent        : false,
			sourceRoot            : '',
			sourceMappingURLPrefix: ''
        }))
		.pipe(gulp.dest(dist_dir + 'css'))
		.pipe(notify({message: 'CSS task complete.'}));
});


/* =========================================================================== */
/* JavaScript Compiling
/* Compiles and bundles the JavaScript using Browserify. Common libraries
/* are run on separate task to reduce compiling time. Run `gulp js:common`
/* to rebuild the core libraries (jQuery, Underscore etc).
/* =========================================================================== */
// JS Common Libraries & Vendors.
gulp.task('js:common', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/vendor/').bundle()
		.on('error', task_handler)
		.pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('common.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'))
		.pipe(notify({message: 'JS Common task complete.'}));
});

// JS All Files.
gulp.task('js:all', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/').bundle()
		.on('error', task_handler)
	    .pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('all.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'))
		.pipe(notify({message: 'JS All task complete.'}));
});

// JS Build File (Concatenated All & Common).
gulp.task('js', ['js:all'], function(){
	// Require.
	var concat = require('gulp-concat'),
		uglify = require('gulp-uglify');

	// Header template.
	var header_tpl_env = ['// Set environment variable',
	'window.gulp_env = "<%= env %>";',
	'',
	''].join('\n');
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> JavaScript',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return gulp.src([dist_dir + 'js/compiled/common.js', dist_dir + 'js/compiled/all.js'])
	    .pipe(concat('build.js'))
		.pipe(header(header_tpl_env, {
			env: (is_production) ? 'production' : 'development'
		}))
		.pipe(gulpif(is_production, uglify()))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
	    .pipe(gulp.dest(dist_dir + 'js/build'))
		.on('error', task_handler)
		.pipe(notify({message: 'JS Build task complete.'}));
});


/* =========================================================================== */
/* Watch
/* Watches for .js, .jsx, .hbs and .scss file changes and compile.
/* =========================================================================== */
gulp.task('watch', function(){
	// Run JS Master on JS and HBS file changes.
	gulp.watch([
		dist_dir + 'js/**/*.js',
		dist_dir + 'js/**/*.jsx',
		dist_dir + 'js/**/*.hbs',
        '!' + dist_dir + 'js/build/*.js',
        '!' + dist_dir + 'js/compiled/*.js'
	], ['js']);
	// Run CSS on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
});


/* =========================================================================== */
/* Sync (BrowserSync)
/* Watches for .js, .jsx, .hbs and .scss file changes and compile while reloading
/* all connected browsers with BrowserSync.
/* =========================================================================== */
gulp.task('sync', function(){
	// Require.
	var browserSync = require('browser-sync'),
		reload      = browserSync.reload;

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
				baseDir: [src_dir]
			}
		});
	}

	// Run Browserify on JS and HBS file changes.
	gulp.watch([
		dist_dir + 'js/**/*.js',
		dist_dir + 'js/**/*.jsx',
		dist_dir + 'js/**/*.hbs',
        '!' + dist_dir + 'js/build/*.js',
        '!' + dist_dir + 'js/compiled/*.js'
	], ['js']);
	// Run CSS on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
	// Reload on file changes.
	gulp.watch([
		// src_dir + '**/*.html',
		// src_dir + '**/*.php',
		dist_dir + 'css/build.css', // Master bundled file.
		dist_dir + 'js/build/build.js' // Master bundled file.
	], reload);
});


/* =========================================================================== */
/* JSHint.
/* Runs linting on the all .js files in `src/dist/js/app` with JSHint.
/* =========================================================================== */
gulp.task('jshint', function(){
	// Vars.
	var jshint  = require('gulp-jshint'),
		stylish = require('jshint-stylish');

    // Task.
	return gulp.src(dist_dir + 'js/app/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish))
		.pipe(notify({message: 'JSHint task complete.'}));
});


/* =========================================================================== */
/* Images
/* Optimises images for web with Imagemin.
/* =========================================================================== */
gulp.task('images', function(){
	// Require.
	var imagemin = require('gulp-imagemin')
		cache	 = require('gulp-cache');

	// Task.
    return gulp.src(dist_dir + 'images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive      : true,
            interlaced       : true
        })))
        .pipe(gulp.dest(dist_dir + 'images'))
		.pipe(notify({message: 'Images task complete.'}));
});


/* =========================================================================== */
/* Testing - Unit
/* Runs all unit tests with Jasmine via Karma.
/* =========================================================================== */
gulp.task('test:unit', function(done){
	// Require.
	var Server = require('karma').Server;

    // Task.
	return new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function(exitCode){
	    done();
	}).start();
});


/* =========================================================================== */
/* Testing - Functional
/* Runs all functional tests with Nightwatch.
/* =========================================================================== */
gulp.task('test:functional', function(){
	// Require.
	var nightwatch = require('gulp-nightwatch');

    // Task.
  	return gulp.src('')
		.pipe(nightwatch({
			configFile: __dirname + '/nightwatch.json'
		}));
});


/* =========================================================================== */
/* Tools - Sprite
/* Bundles all files in `src/dist/images/icons/sprite` into a single sprite and adds
/* SASS rules in `src/dist/css/scss/site/sprites.scss`.
/* =========================================================================== */
gulp.task('sprite', function(){
	// Require.
	var sprity = require('sprity');

	// Task.
    return sprity.src({
		src         : dist_dir + 'images/icons/png/*.png',
		style       : dist_dir + 'css/scss/site/_sprites.scss',
		cssPath     : '../images/icons/',
		margin      : 0,
		base64      : false,
		retina      : true,
		background  : '#FFFFFF',
		orientation : 'horizontal',
		prefix      : 'css-sprite',
		name        : 'sprite',
		processor   : 'sass',
		'style-type': 'scss'
	})
    .pipe(gulpif('*.png', gulp.dest(dist_dir + 'images/icons'), gulp.dest(dist_dir + 'css/scss/site')))
	.pipe(notify({message: 'Sprite task complete.'}));
});


/* =========================================================================== */
/* Tools - Release
/* Copies all files except SASS, JS, JSX and HBS build files to a new release named
/* by version in the `app` folder
/* =========================================================================== */
gulp.task('release', function(){
	// Vars.
	var files = [
        './src/**/*.*',
        '!' + dist_dir + '**/*.scss',
		'!' + dist_dir + 'js/index.js',
		'!' + dist_dir + 'js/helpers.js',
		'!' + dist_dir + 'js/app/**/*',
        '!' + dist_dir + 'js/public/**/*',
        '!' + dist_dir + 'js/compiled/**/*',
        '!' + dist_dir + 'js/plugins/**/*',
        '!' + dist_dir + 'js/vendor/**/*'
    ];

	// Vars.
	var v = args.ver || ver;

    // Task.
	return gulp.src(files, {base: src_dir})
		.pipe(gulp.dest('releases/release-' + v));
});


/* =========================================================================== */
/* Tools - PSI
/* Runs a Google Page Speed test on a given URL and stores the result in a
/* logfile in `psi/<domain>`. Subsequent tests on the same URL will be
/* appended to the same file.
/* =========================================================================== */
gulp.task('psi', function(){
	// Require.
	var psi = require('psi'),
		fs  = require('fs-extra');

	// Vars.
	var url  = args.url || 'http://google.com',
		mode = args.mode || 'desktop';

	// Seems to freeze without this.
	console.log('Query URL: ' + url);

	// Functions.
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

	// Task.
	// var options = ['', mode, 'en_GB'];
	var options = [];

	// Task.
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
});


/* =========================================================================== */
/* SAMPLE
/* This is a sample task for the future.
/* =========================================================================== */
// gulp.task('sample', function(){
// 	// Check environment.
// 	if(!is_development){
// 		if(this.seq.slice(-1)[0] == 'default'){
// 			util.log(util.colors.yellow('Warning: Task skipped. Not run with default profile.'));
// 			return;
// 		}
// 		else{
// 			throw new Error('This task must be run in development mode. Try running `gulp ' + this.seq.slice(-1)[0] + ' --config development`.');
// 		}
// 	}

// 	// Require.
// 	var module = require('gulp-module');

//     // Task.
//   	return gulp.src(src_dir)
// 		.pipe(module());
// });
