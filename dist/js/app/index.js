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
window.debugging         = true;
window.ga_active         = (typeof window.ga !== "undefined") ? true : false;


/* ==========================================================================
/* Libraries
========================================================================== */
// jQuery.
var $ = jQuery = require('jquery');
// Handlebars.
// var H = Handlebars = require('handlebars');
// Backbone.
// var B = Backbone = require('backbone'); Backbone.$ = $;


/* ==========================================================================
/* Helpers
========================================================================== */
// Helpers.
require('./helpers');


/* ==========================================================================
/* Controllers
========================================================================== */
// Page Controller.
var PageController = require('./controller.page');


/* ==========================================================================
/* Router
========================================================================== */
// Init new instance.
var pc = new PageController();
pc.init($('.main'));
