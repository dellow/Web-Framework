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

	// Require the app controller.
	window.App = require('./controller.app');

	// Init new instance of app controller.
	App.init($('.main'));

}(jQuery, window));
