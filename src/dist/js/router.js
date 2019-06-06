/**
 *
 * Router
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Navigo from 'navigo'

// Init Router.
const Router = new Navigo(location.protocol + '//' + location.host, false)

// Global routes.
const GlobalAppRoute = require('./app/routes/global').default
GlobalAppRoute.init()
GlobalAppRoute.listeners()

// Define routes.
Router.on({
  ...require('./app/routes'), 
  // ...require('./shopify/routes'), 
  // ...require('./surepress/routes')
})

// Resolve routes.
Router.resolve()