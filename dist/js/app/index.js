/*
 *
 * Application or Website name
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
 * To include jQuery or any other library in a module pass it into the self invoking function.
 * The App object should be passed to individual functions. Such as `App.ModuleName.bindEvents(App)`
 *
 */

// App
var App = {};

/* ======================================================== */
/* Libraries
/* ======================================================== */
// jQuery
var $ = jQuery = require('jquery');

/* ======================================================== */
/* Helpers
/* ======================================================== */
// Helpers
App.Helpers = require('./helpers');

/* ======================================================== */
/* Controllers
/* ======================================================== */
// Page Controller
App.PageController = require('./controller.page');

/* ======================================================== */
/* Modules
/* ======================================================== */
// Mobile Menu
App.Menu = require('./module.menu');
// Equal Heights
App.EH   = require('./module.eh');

/* ======================================================== */
/* Debugging
/* ======================================================== */
// Log App
App.Helpers.log(App);

/* ======================================================== */
/* Go
/* ======================================================== */
App.PageController.init();