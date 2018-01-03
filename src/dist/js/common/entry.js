/**
 *
 * Common Entry Point
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
| JavaScript configuration and setup
|
*/
require('./config')

/*
|--------------------------------------------------------------------------
| Modernizr
|--------------------------------------------------------------------------
|
| (via Browsernizr) (check browsernizr/test/** for tests)
|
*/
// require('browsernizr/test/css/transitions')
window.Modernizr = require('browsernizr')

/*
|--------------------------------------------------------------------------
| jQuery
|--------------------------------------------------------------------------
|
| Loads jQuery and assigns to `jQuery` and `$` vars.
|
*/
window.jQuery = require('jquery')
window.$ = require('jquery')

/*
|--------------------------------------------------------------------------
| Underscore
|--------------------------------------------------------------------------
|
| Loads Underscore and assigns to `_` var.
|
*/
window._ = require('underscore')

/*
|--------------------------------------------------------------------------
| Handlebars
|--------------------------------------------------------------------------
|
| Loads Handlebars and assigns to `Handlebars` var.
|
*/
// window.Handlebars = require('handlebars')

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
|
| Loads React and React DOM and assigns to `React` and 'ReactDOM' vars.
|
*/
// window.React = require('react')
// window.ReactDOM = require('react-dom')

/*
|--------------------------------------------------------------------------
| Axios
|--------------------------------------------------------------------------
|
| Loads Axios and assigns to `Axios` var.
|
*/
// window.Axios = require('axios')
// window.Axios.defaults.baseURL = window.config.baseURL

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
|
| Sets up the framework global events system.
|
*/
window.Events = require('./events')

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
| Loads various helper methods for use in the framework.
|
*/
window.Helpers = require('./helpers')

/*
|--------------------------------------------------------------------------
| Breakpoint
|--------------------------------------------------------------------------
|
| Returns information on the current window breakpoint.
|
*/
window.Breakpoint = require('./breakpoint')

/*
|--------------------------------------------------------------------------
| Autotrack
|--------------------------------------------------------------------------
|
| Loads Google Autotrack for analytics.
|
*/
require('autotrack')
