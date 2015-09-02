/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Dalek Tests > Roles
 *
**/

module.exports = {
	'Header has "banner" role': function(test){
		test.open('index.html')
			.assert.attr('.page-header', 'role', 'banner')
			.done();
	},
	'Main has "main" role': function(test){
		test.open('index.html')
			.assert.attr('.main', 'role', 'main')
			.done();
	},
	'Navigation has "navigation" role': function(test){
		test.open('index.html')
			.assert.attr('.navigation', 'role', 'navigation')
			.done();
	},
	'Sidebar has "complimentary" role': function(test){
		test.open('index.html')
			.assert.attr('.sidebar', 'role', 'complimentary')
			.done();
	},
	'Footer has "contentinfo" role': function(test){
		test.open('index.html')
			.assert.attr('.page-footer', 'role', 'contentinfo')
			.done();
	}
};
