/**
 *
 * Wepback > Tests
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var context = require.context('./src/dist/js/tests/unit/', true, /__tests__\/*(.+).js/); context.keys().forEach(context)
