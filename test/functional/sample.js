/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Tests > Functional > Sample
 *
**/

var urls = {
	home: 'http://google.com/'
};

module.exports = {
	before: function(browser){
		console.log('Starting functional tests...');
	},
	after: function(browser){
		console.log('Ending functional tests...');
	},
	beforeEach: function(browser){

	},
	afterEach: function(browser){

	},
	'Header element exists and has banner role': function(browser){
		browser
			.url(urls.home)
			.waitForElementVisible('body', 1000)
      		.pause(1000)
			.assert.elementPresent('.page-header')
			.verify.attributeEquals('.page-header', 'role', 'banner')
	},
	'Navigation element exists and has navigation role': function(browser){
		browser
			.url(urls.home)
			.waitForElementVisible('body', 1000)
      		.pause(1000)
			.assert.elementPresent('.navigation')
			.verify.attributeEquals('.navigation', 'role', 'navigation')
	},
	'Main element exists and has main role': function(browser){
		browser
			.url(urls.home)
			.waitForElementVisible('body', 1000)
      		.pause(1000)
			.assert.elementPresent('.main')
			.verify.attributeEquals('.main', 'role', 'main')
	},
	'Footer element exists and has contentinfo role': function(browser){
		browser
			.url(urls.home)
			.waitForElementVisible('body', 1000)
      		.pause(1000)
			.assert.elementPresent('.page-footer')
			.verify.attributeEquals('.page-footer', 'role', 'contentinfo')
			.end();
	}
};
