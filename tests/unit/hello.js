/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Intern Tests > Unit > Hello
 *
**/

define(function(require){
	var registerSuite = require('intern!object');
	var assert        = require('intern/chai!assert');
	var hello         = require('tests/samples/hello');

    registerSuite({
        name: 'hello',

        greet: function () {
            assert.strictEqual(hello.greet('Murray'), 'Hello, Murray!',
                'hello.greet should return a greeting for the person named in the first argument');

            assert.strictEqual(hello.greet(), 'Hello, world!',
                'hello.greet with no arguments should return a greeting to "world"');
        }
    });
});
