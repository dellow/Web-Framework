/**
 *
 * Public
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function (Public, window) {
  'use strict'

  var eventsList = []

  /**
   * Public
   * Constructor for Public.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public = function () {
  }

  /**
   * init
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public.prototype.init = function () {
    getModules.call(this)
  }

  /**
   * eventsList
   * Get events as an array list.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public.prototype.eventsList = eventsList

  /**
   * events
   * Public events listeners.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public.prototype.events = {
    events: {},
    extend: function (args) {
      // Extend.
      var extension = $.extend({}, this, args)
      // Setup events.
      $.each(extension.events, function (name, callback) {
        extension.register(name, callback)
      })

      return extension
    },
    register: function (name, callback) {
      var _this = this

      // Cache event.
      var event = name.substr(0, name.indexOf(' '))
      // Cache selector.
      var selector = name.substr(name.indexOf(' ') + 1)
      // Add to array.
      eventsList.push(event + ' : ' + selector)
      eventsList.sort()
      // Add event.
      $(document).on(event, selector, function (e) {
        // Append $el to event object
        e.$el = $(this)
        // Event
        if (typeof _this.event === 'function') {
          e = _this.event(e)
        }
        // Callback
        _this[callback]([e])
      })
    }
  }

  /**
   * plugins
   * Module plugins method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public.prototype.plugins = {
    equalElementHeights: function (el) {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('../../plugins/jquery.equal-heights')
      // Init plugin.
      return el.equalHeights()
    },
    sliders: function (el, options) {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('script!slick-carousel')
      // Init plugin.
      return el.slick(options)
    },
    validation: function (el, options) {
      // DOM check.
      if (!el.length) return

      // Check captcha.
      if ($('#c_a_p_t_c_h_a', el).length) {
        // Set the captcha field value and check the box.
        $('#c_a_p_t_c_h_a', el).prop('checked', true).val('c_a_p_t_c_h_a')
      }
      // Get plugin.
      require('../../plugins/jquery.validation')
      // Init plugin.
      return el.validation(options)
    }
  }

  /**
   * modules
   * Public modules.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Public.prototype.modules = {
  }

  /**
   * getModules
   * Loads any child modules.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  var getModules = function () {
    this.modules.MobileMenu = require('./module.mobile.menu')
    this.modules.DynamicDOM = require('./module.dynamic.dom')
  }

  // Export
  module.exports = new Public()
}(window.Public = window.Public || function () {}, window))
