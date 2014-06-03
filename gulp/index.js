/* ================================================== */
/* Yargs
/* ================================================== */
var args = require('yargs').argv;

/* ================================================== */
/* GLOBAL variables
/* Use very sparingly (http://stackoverflow.com/questions/5447771/node-js-global-variables)
/* ================================================== */
GLOBAL.args           = args.config;
GLOBAL.is_development = (args.config == 'development') ? true : false,
GLOBAL.is_staging     = (args.config == 'staging') ? true : false,
GLOBAL.is_production  = (args.config == 'production') ? true : false;

/* ================================================== */
/* Require
/* ================================================== */
var fs    = require('fs'),
	tasks = fs.readdirSync('./gulp/tasks/');

/* ================================================== */
/* Task
/* ================================================== */
tasks.forEach(function(task){
	require('./tasks/' + task);
});