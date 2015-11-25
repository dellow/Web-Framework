/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Tests > Unit > Sample
 *
 * Jasmine test examples: http://evanhahn.com/how-do-i-jasmine/
 *
**/


/* ======================================================== */
/* Libraries
/* ======================================================== */
// Import libraries needed to perform this test.
window.$ = require('jquery');


/* ======================================================== */
/* Data
/* ======================================================== */
// Define function.
var helloWorld = function(){
	return 'Hello world!';
}
// Get module.
// var Module = require('../../src/dist/js/public/module.sample');


/* ======================================================== */
/* Tests
/* ======================================================== */
// Suite.
describe('Hello world', function(){
	// Spec.
	it('says hello', function(){
		expect(helloWorld()).toEqual('Hello world!');
	});
	// Spec.
	it('says hello', function(){
		expect(helloWorld()).toEqual('Hellox world!');
	});
	// Spec.
    it('says world', function(){
        expect(helloWorld()).toContain('world');
    });
	// Spec.
	// it('says close', function(){
	// 	expect(Module.test()).toEqual('close');
	// });
});
