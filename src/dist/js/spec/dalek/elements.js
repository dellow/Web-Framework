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

module.exports = {
	'Header element exists': function(test){
		test.open('index.html')
		.assert.exists('.page-header', 'Header element exists')
			.done();
	},
	'Main element exists': function(test){
		test.open('index.html')
		.assert.exists('.main', 'Main element exists')
			.done();
	},
	'Footer element exists': function(test){
		test.open('index.html')
		.assert.exists('.page-footer', 'Footer element exists')
			.done();
	}
};
