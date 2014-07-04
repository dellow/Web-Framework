/**
 * site.js
 * Controller JS file.
**/

// jQuery
var $ = jQuery = require('jquery');
// Extensions
require('../plugins/jquery.extensions');
// Form validation
require('../plugins/jquery.validation');
// Lightbox
require('../plugins/jquery.lightbox');
// Slider
require('../plugins/jquery.bxslider');
// Placeholder
require('../plugins/jquery.placeholder');

;(function($, window, undefined){
	'use strict';

    // Object
    var site = site || {};

    $(function(){
		// Placeholder polyfill
	    if(!Modernizr.input.placeholder){
	        $('input, textarea').placeholder();
	    }
    });

	// Export object for use.
	window.site = site;

}(jQuery, window));