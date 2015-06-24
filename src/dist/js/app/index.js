/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

// Global settings.
window.mobile_breakpoint = 768;
window.wiselinks_enabled = true;
window.helper_log        = (typeof window.gulp_env == "undefined" || window.gulp_env == 'development') ? true : false;
window.ga_active         = (typeof window.ga !== "undefined") ? true : false;

/* ======================================================== */
/* Index
/* ======================================================== */
;(function($, window, undefined){
    'use strict';

	// Require helpers globally.
	require('./helpers');

	// Require the page controller.
	var Page = require('./controller.page');

	// Init new instance of page controller.
	var page = new Page();
	page.init($('.main'));

}(jQuery, window));
