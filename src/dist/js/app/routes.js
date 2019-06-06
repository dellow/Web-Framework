/**
 *
 * Routes
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

module.exports = {
  '/': () => {
    // Log it.
    window.Helpers.log('Route Loaded: home', '#E19F12')
    // Get route controller.
    let c = require('./routes/home').default
    // Check for an init method.
    if (typeof c.init === 'function') c.init()
    // Check for an listeners method.
    if (typeof c.listeners === 'function') c.listeners()
  }
}