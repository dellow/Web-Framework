/**
 * polyfills.js
 * Polyfills JS file.
**/

// jQuery
var $ = jQuery = require('jquery');
// Placeholder
require('../plugins/jquery.placeholder');

;(function($, window, undefined){
    'use strict';

    // Object
    var polyfills = polyfills || {};

	// Placeholder polyfill
    if(!Modernizr.input.placeholder){
        $('input, textarea').placeholder();
    }

    // Export object for use.
    window.polyfills = polyfills;

}(jQuery, window));