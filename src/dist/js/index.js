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

// Require App.
global.App = require('./app/app');
// Init App.
App.init();
// Log it.
Helpers.log(App);

// Require Public.
global.Public = require('./public/public');
// Init App.
Public.init();
// Log it.
Helpers.log(Public);