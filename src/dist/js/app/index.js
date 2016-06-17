/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

// Get error handling.
require('./errors');
// Require helpers globally.
global.Helpers = require('./helpers');
// Require breakpoint globally.
global.Breakpoint = require('./breakpoint');
// Get config.
require('./config');


/**
 * Private
 * Start the private service.
 *
 * @since 1.0.0
 * @version 1.0.0
**/
global.Private = require('./private/private');
// Init Private.
Private.init();
// Log it.
Helpers.log(Private);

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