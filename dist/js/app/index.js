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
App.Menu         = require('./module.menu');
// Equal Heights
App.EqualHeights = require('./module.equal-heights');

/* ======================================================== */
/* Debugging
/* ======================================================== */
// Log App
App.Helpers.log(App);

/* ======================================================== */
/* Go
/* ======================================================== */
App.PageController.init(App);
App.Menu.init(768);
App.EqualHeights.init();