/**
 * forms.js
 * Forms JS file.
**/

// jQuery
var $ = jQuery = require('jquery');
// Form validation
require('../plugins/jquery.validation');

;(function($, window, undefined){
    'use strict';

    // Object
    var forms = forms || {};

	// Form validation
    if($('.validate').length){
        $('.validate').validation({
            serverValidation: false,
            preloaderSize   : 20,
            preloaderHEX    : '#FFFFFF'
        });
    }

    // Export object for use.
    window.forms  = forms;

}(jQuery, window));