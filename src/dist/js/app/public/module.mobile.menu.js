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
    // Set flag.
    this.menuOpen = false

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
    menuSize: '80',
    moveContent: false
  }

  /**
   * dom
   * Cached DOM elements for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.dom = {
    menu: $('.js--mobileMenu--menu'),
    open: $('.js--mobileMenu--triggerOpen'),
    content: $('.js--mobileMenu--content')
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
        'click .js--mobileMenu--triggerOpen': 'toggleMenu',
        'click .js--mobileMenu--triggerClose': 'hideMenu'
      },
      toggleMenu: function (e) {
        return _this.init((!_this.menuOpen) ? 'show' : 'hide')
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

    return (action === 'show') ? this.showMenu() : this.hideMenu()
  }

  /**
   * showMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.showMenu = function () {
    // Toggle the mobile menu visiblity.
    this.style(this.dom.menu, {'left': -(100 - this.settings.menuSize) + '%', 'opacity': '1'})
    // Add no-scroll class.
    $('body').addClass('u-noscroll')
    // Add active class to button.
    this.dom.open.addClass('active')
    // Toggle the content position.
    if (this.settings.moveContent) {
      this.style(this.dom.content, {'left': this.settings.menuSize + '%'})
    }
    // Reset flag.
    this.menuOpen = true
  }

  /**
   * hideMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.hideMenu = function () {
    // Toggle the mobile menu visiblity.
    this.style(this.dom.menu, {'left': '-100%', 'opacity': '0'})
    // Remove no-scroll class.
    $('body').removeClass('u-noscroll')
    // Add active class to button.
    this.dom.open.removeClass('active')
    // Toggle the content position.
    if (this.settings.moveContent) {
      this.style(this.dom.content, {'left': ''})
    }
    // Reset flag.
    this.menuOpen = false
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
