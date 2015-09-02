/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Dalek Tests > Responsive
 *
**/

module.exports = {
    'Test Google Responsive': function(test){
		test.open('http://google.com')
			.screenshot('dalek_tests/screenshots/google-home.png')
			.resize({width: 400, height: 400})
			.screenshot('dalek_tests/screenshots/google-home-400x400.png')
			.done();
    }
};
