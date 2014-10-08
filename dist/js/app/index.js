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
App.PageController = require('./page.controller');

/* ======================================================== */
/* Modules
/* ======================================================== */
// Module Name
App.ModuleName   = require('./name.module');
// Equal Heights
App.EqualHeights = require('./equal-heights.module');

/* ======================================================== */
/* Debugging
/* ======================================================== */
// Log App
App.Helpers.log(App);

/* ======================================================== */
/* Go
/* ======================================================== */
// Page Controller
App.PageController.init(App);
// Module description
App.ModuleName.init();
// Listen for DOM elements that need to be of equal height.
App.EqualHeights.init();