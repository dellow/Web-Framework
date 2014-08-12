/* ================================================== */
/* Require
/* ================================================== */
var args  = require('yargs').argv,
	fs    = require('fs'),
	tasks = fs.readdirSync('./gulp/tasks/');

/* ================================================== */
/* GLOBAL variables
/* Use very sparingly (http://stackoverflow.com/questions/5447771/node-js-global-variables)
/* ================================================== */
GLOBAL.args           = args.config;
GLOBAL.is_development = (args.config == 'development' || args.config == undefined) ? true : false,
GLOBAL.is_staging     = (args.config == 'staging') ? true : false,
GLOBAL.is_production  = (args.config == 'production') ? true : false;
GLOBAL.releases_dir   = './releases/';
GLOBAL.app_dir        = './app/';
GLOBAL.src_dir        = './src/';
GLOBAL.dist_dir       = './src/dist/';

/* ================================================== */
/* Task
/* ================================================== */
tasks.forEach(function(task){
	require('./tasks/' + task);
});