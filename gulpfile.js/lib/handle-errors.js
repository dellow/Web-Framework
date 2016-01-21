/**
 *
 * Gulpfile > Lib > Handle Errors
 *
 * Copyright 2016, Web Framework by Stewart Dellow
 * MIT License (MIT)
 *
**/

/* =========================================================================== */
/* Global Dependencies
/* =========================================================================== */
var notify = require('gulp-notify'),
    util   = require('gulp-util');


module.exports = function(errorObject, callback){
    // Show notification.
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
    // Show in terminal log.
    util.log(util.colors.red('Error'), errorObject.message);
    // Keep gulp from hanging on this task
    if(typeof this.emit === 'function'){
        this.emit('end');
    }
}