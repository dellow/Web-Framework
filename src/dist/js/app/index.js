/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

// Require helpers globally.
require('./helpers');

// Global settings.
window.mobile_breakpoint = 768;
window.wiselinks_enabled = true;
window.helper_log        = (Helpers.isEmpty(window.gulp_env) || window.gulp_env == 'development') ? true : false;
window.ga_active         = (Helpers.isEmpty(window.ga)) ? false : true;

/* ======================================================== */
/* Index
/* ======================================================== */
;(function(window, undefined){
    'use strict';

	// Require the app controller.
	window.App = require('./controller.app');

	// Init new instance of app controller.
	App.init($('.main'));

}(window));
