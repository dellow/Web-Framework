/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Dalek Tests > Elements
 *
**/

var urls = {
	home: 'http://google.com/'
};

module.exports = {
	'Header element exists and has banner role': function(test){
		test.open(urls.home)
			.assert.exists('.page-header', 'Header element exists')
			.assert.attr('.page-header', 'role', 'banner')
			.done();
	},
	'Navigation element exists and has navigation role': function(test){
		test.open(urls.home)
			.assert.exists('.navigation', 'Navigation element exists')
			.assert.attr('.navigation', 'role', 'navigation')
			.done();
	},
	'Main element exists and has main role': function(test){
		test.open(urls.home)
			.assert.exists('.main', 'Main element exists')
			.assert.attr('.main', 'role', 'main')
			.done();
	},
	'Footer element exists and contentinfo has role': function(test){
		test.open(urls.home)
			.assert.exists('.page-footer', 'Footer element exists')
			.assert.attr('.page-footer', 'role', 'contentinfo')
			.done();
	}
};
