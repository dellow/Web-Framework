/**
 *
 * Wepback > Tests
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

var context = require.context('./src/dist/js/', true, /__tests__\/*(.+).js/)
context.keys().forEach(context)
