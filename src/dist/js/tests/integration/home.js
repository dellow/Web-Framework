/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
 * Tests > Integration > Sample
 *
**/

var path = require('path')
var package = require(path.join(__dirname, './package.json'))

var page = '/'

module.exports = {
	before: function(browser){
		console.log('Starting integration tests...')
	},
	after: function(browser){
		console.log('Ending integration tests...')
	},
	beforeEach: function(browser){

	},
	afterEach: function(browser){

	},
	'Header element exists and has banner role': function(browser){
		browser
      .url(package.config.url + page)
      .waitForElementVisible('body', 1000)
        .pause(1000)
      .assert.elementPresent('.page-header')
      .verify.attributeEquals('.page-header', 'role', 'banner')
	},
	'Navigation element exists and has navigation role': function(browser){
		browser
      .url(package.config.url + page)
      .waitForElementVisible('body', 1000)
        .pause(1000)
      .assert.elementPresent('.navigation')
      .verify.attributeEquals('.navigation', 'role', 'navigation')
	},
	'Main element exists and has main role': function(browser){
		browser
    .url(package.config.url + page)
    .waitForElementVisible('body', 1000)
      .pause(1000)
    .assert.elementPresent('.main')
    .verify.attributeEquals('.main', 'role', 'main')
	},
	'Footer element exists and has contentinfo role': function(browser){
		browser
    .url(package.config.url + page)
    .waitForElementVisible('body', 1000)
      .pause(1000)
    .assert.elementPresent('.page-footer')
    .verify.attributeEquals('.page-footer', 'role', 'contentinfo')
      .end()
	}
}
