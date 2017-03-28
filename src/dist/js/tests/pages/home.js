/**
 *
 * Integration Tests
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

// URL slug.
const slug = ''

module.exports = {
  'Header element exists and has banner role': (browser) => {
  	browser
      .url(browser.globals.getEnv(browser.globals.site, slug))
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.page-header')
      .verify.attributeEquals('.page-header', 'role', 'banner')
        .end()
  },
  'Navigation element exists and has navigation role': (browser) => {
  	browser
      .url(browser.globals.getEnv(browser.globals.site, slug))
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.navigation')
      .verify.attributeEquals('.navigation', 'role', 'navigation')
        .end()
  },
  'Main element exists and has main role': (browser) => {
  	browser
      .url(browser.globals.getEnv(browser.globals.site, slug))
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.main')
      .verify.attributeEquals('.main', 'role', 'main')
        .end()
  },
  'Footer element exists and has contentinfo role': (browser) => {
  	browser
      .url(browser.globals.getEnv(browser.globals.site, slug))
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.page-footer')
      .verify.attributeEquals('.page-footer', 'role', 'contentinfo')
        .end()
  }
}
