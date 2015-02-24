/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * To include jQuery or any other library in a module pass it into the self invoking function.
 *
**/

// Global settings.
window.mobile_breakpoint = 768;
window.debugging         = false;
window.ga_active         = (typeof window.ga !== "undefined") ? true : false;

/* ======================================================== */
/* Libraries
/* ======================================================== */
// jQuery
var $ = jQuery = require('jquery');

/* ======================================================== */
/* Helpers
/* ======================================================== */
// Helpers
require('./helpers');

/* ======================================================== */
/* Controllers
/* ======================================================== */
// Page Controller
require('./controller.page');

/* ======================================================== */
/* Go
/* ======================================================== */
PageController.init($('.main'));