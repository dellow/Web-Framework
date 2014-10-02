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
/* Modules
/* ======================================================== */
// Module Name
App.ModuleName = require('./name.module');
// Wiselinks
App.Wiselinks = require('./wiselinks.module');
// Equal Heights
App.EqualHeights = require('./equal-heights.module');

/* ======================================================== */
/* Debugging
/* ======================================================== */
// Log App
App.Helpers.log(App);

/* ======================================================== */
/* Go!
/* ======================================================== */
// Module description
App.ModuleName.init();
// Wiselinks
App.Wiselinks.init(App.Helpers);
// Listen for DOM elements that need to be of
// equal height.
App.EqualHeights.init();