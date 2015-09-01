/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Dalek Tests > Examples
 *
**/

module.exports = {
	'doctorwhotv.co.uk - Navigation visible': function(test){
		test.open('http://doctorwhotv.co.uk/')
			.query('#main-nav .mega-sub-menu')
			.assert.visible()
			.click()
			.end()
			.done();
	},
	'fab.com - Search, view product, add to cart': function(test){
		test.open('http://fab.com/')
			.type('.filter_shop_name_input', 'boots')
			.submit('.searchBar form')
			.query('.product:nth-child(3) .prodImgBlock')
			.click()
			.end()
			.query('#productPricingDetails .prodPgAddcartAchrButton')
			.assert.attr('data-attr-btnname', 'top_cart')
			.click()
			.wait(4000)
			.end()
			.done();
	},
	'github.com - Take screenshot': function(test){
		test.open('https://github.com')
			.screenshot('dalek/screenshots/github-home.png')
			.done();
	},
	'github.com - Test protocol': function(test){
		test.open('http://github.com')
			.assert.url('https://github.com/', 'Protocol changed to https')
			.done();
	},
	'github.com - Copy testing': function(test){
		test.open('https://github.com')
			.assert.exists('a[href="/contact"]', 'Contact link exists')
			.click('a[href="/contact"]')
			.screenshot('dalek/screenshots/github-contact.png')
			.assert.title().is('Contact GitHub · GitHub', 'Page title is correct')
			.type('#form_name', 'The Doctor')
			.screenshot('dalek/screenshots/github-contact-entered.png')
			.done();
	},
	'google.com - Page title testing': function(test){
		test.open('https://google.com')
			.assert.title().is('Google', 'Page title is correct.')
			.done();
	},
	'news.ycombinator.com - Page title testing': function(test){
		test.open('https://news.ycombinator.com/news')
			.assert.title().is('Hacker News', 'Page title is correct.')
			.click('a[href="newest"]')
			.waitForElement('body')
			.assert.title().is('New Links | Hacker News', 'Page title is correct.')
			.done();
	}
};
