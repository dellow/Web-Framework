/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Intern Tests > Functional > Index
 *
 * Run tests with: ./node_modules/.bin/intern-client config=tests/intern or in the browser at
 * /path/to/framework/node_modules/intern/client.html?config=tests/intern
 *
**/

define({
	excludeInstrumentation: /^(?:tests|node_modules)\//,
	maxConcurrency: 2,
	tunnel: 'BrowserStackTunnel',
	capabilities: {
		'browserstack.selenium_version': '2.45.0'
	},
    tunnelOptions: {
        username: '',
        accessKey: ''
    },
	loaderOptions: {
		packages: [
			{
				name: 'myPackage',
				location: '.'
			}
		]
	},
	suites: [
		'tests/unit/hello'
	],
	functionalSuites: [
		'tests/functional/index'
	],
	environments: [
		{
			browserName: 'chrome',
			version    : '39',
			platform   : ['MAC']
		}
	]
});
