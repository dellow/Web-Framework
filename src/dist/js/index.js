/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

// Google Analytics Autotrack.
require('autotrack');
// Require helpers globally.
global.Helpers = require('./helpers');
// Require breakpoint globally.
global.Breakpoint = require('./breakpoint');
// Get config.
require('./config');


/**
 * App
 * Start the app service.
 *
 * @since 1.0.0
 * @version 1.0.0
**/
global.App = require('./app/app');
// Init App.
App.init();
// Log it.
Helpers.log(App);

/**
 * Public
 * Start the public service.
 *
 * @since 1.0.0
 * @version 1.0.0
**/
global.Public = require('./public/public');
// Init Public.
Public.init();
// Log it.
Helpers.log(Public);