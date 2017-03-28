/**
 *
 * Nightwatch > Helpers
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

// Get package.
var packageConfig = require(process.cwd() + '/package.json').config

module.exports = {
  config: packageConfig,
	getEnv: function (site, slug) {
		// Detect environment.
		if (site === 'production') {
		  // Set the URL for the integration test.
		  var url = packageConfig.url.production + slug
		} else if (site === 'staging') {
		  // Set the URL for the integration test.
		  var url = packageConfig.url.staging + slug
		} else if (site === 'local') {
		  // Set the URL for the integration test.
		  var url = packageConfig.url.local + slug
		} else {
		  // Set the URL for the integration test.
		  var url = packageConfig.url.local + slug
		}

		return url
	}
}
