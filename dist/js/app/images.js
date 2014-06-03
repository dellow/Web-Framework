/**
 * images.js
 * Images JS file.
**/

// jQuery
var $ = jQuery = require('jquery');
// Lightbox
require('../plugins/jquery.lightbox');

;(function($, window, undefined){
    'use strict';

    // Object
    var images = images || {};

	// Lightbox
    if($('.lightbox').length){
        $('.lightbox').lightbox({
            // No options
        });
    }

    // Export object for use.
    window.images  = images;

}(jQuery, window));