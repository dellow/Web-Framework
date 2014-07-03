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
// Placeholder
require('../plugins/jquery.placeholder');

;(function($, window, undefined){
	'use strict';

    // Object
    var site = site || {};

    $(function(){
		// Form validation
	    if($('.validate').length){
	        $('.validate').validation({
	            serverValidation: true,
	            preloaderSize   : 20,
	            preloaderHEX    : '#000000'
	        });
	    }
		// Lightbox
	    if($('.lightbox').length){
	        $('.lightbox').lightbox({
	            // No options
	        });
	    }
		// Tabs
	    if($('.tabs').length){
	        $('.tabs').tabs({
	            // No options
	        });
	    }
		// Accordion
	    if($('.accordion').length){
	        $('.accordion').accordion({
	            // No options
	        });
	    }
		// Placeholder polyfill
	    if(!Modernizr.input.placeholder){
	        $('input, textarea').placeholder();
	    }
    });


	// Export object for use.
	window.site = site;

}(jQuery, window));