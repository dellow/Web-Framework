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
GLOBAL.dist_dir = './dist/';

/* ================================================== */
/* Task
/* ================================================== */
tasks.forEach(function(task){
	require('./tasks/' + task);
});
