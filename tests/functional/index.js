/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Intern Tests > Functional > Index
 *
**/

define(function(require){
	var registerSuite = require('intern!object');
	var assert        = require('intern/chai!assert');

    registerSuite({
        name: 'index',
        'greeting form': function(){
            return this.remote
                .get(require.toUrl('https://hellostew.com/'))
                .setFindTimeout(5000)
                .findByCssSelector('.content h1')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'Hello! I am a Web Developer working for Surefire Media in Nantwich.', 'Intro text should be set.');
                });
        }
    });
});
