/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function (Module, window) {
  'use strict'

  /**
   * Module
   * Constructor for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module = function () {
    this.events()
  }

  /**
   * settings
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.settings = {
    menuSize: '90',
    moveContent: true
  }

  /**
   * events
   * Events for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.events = function () {
    var _this = this

    // Extend the events system.
    global.Public.events.extend({
      events: {
        'click .js--mobileMenu--triggerOpen': 'showMenu',
        'click .js--mobileMenu--triggerClose': 'hideMenu'
      },
      showMenu: function (e) {
        return _this.init('show')
      },
      hideMenu: function (e) {
        return _this.init('hide')
      }
    })
  }

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.init = function (action) {
    // Set the mobile menu header height to
    // match the page mobile header height.
    this.setHeaderHeight()
    // Toggle the mobile menu visiblity.
    this.style($('.js--mobileMenu--menu'), (action === 'show' ? {'left': -(100 - this.settings.menuSize) + '%', 'opacity': '1'} : {'left': '-100%', 'opacity': '0'}))
    // Toggle body class.
    if (action === 'show') { $('body').addClass('u-noscroll') } else { $('body').removeClass('u-noscroll') }
    // Toggle the content position.
    if (this.settings.moveContent) {
      this.style($('.js--mobileMenu--content'), (action === 'show' ? {'left': this.settings.menuSize + '%'} : {'left': ''}))
    }
  }

  /**
   * setHeaderHeight
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.setHeaderHeight = function () {
    return $('.page-mobile-menu__header').height(this.calculateHeight($('.js--mobileMenu--header')))
  }

  /**
   * calculateHeight
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.calculateHeight = function (el) {
    return el.outerHeight()
  }

  /**
   * style
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.style = function (el, css) {
    return el.css(css)
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
