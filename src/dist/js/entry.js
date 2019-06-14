/**
 *
 * Entry Point
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

// Get entry.
window.App = require('./app/entry')
// Start.
window.App.init()

// // Get entry.
// window.SureShopify = require('./shopify/entry')
// // Start.
// window.SureShopify.init()

// // Get entry.
// window.SurePress = require('./surepress/entry')
// // Start.
// window.SurePress.init()

// Get vue.
require('./vue')

// Get router.
require('./router')