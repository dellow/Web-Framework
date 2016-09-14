/**
 *
 * Gulpfile.helpers.js
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var notify = require('gulp-notify');

module.exports.handleErrors = function(errorObject, callback){
    // Show notification.
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
    // Keep gulp from hanging on this task
    if(typeof this.emit === 'function'){
        this.emit('end');
    }
}