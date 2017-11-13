/**
 *
 * Route
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

import MobileMenu from '../classes/global/mobile.menu'

;(function (Module, window) {

  /**
   * Module
   * Constructor for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module = function () {
  }

  /**
   * _settings
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype._settings = {
  }

  /**
   * _dom
   * DOM elements for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype._dom = {
  }

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.init = function () {
    MobileMenu.init()
  }

  /**
   * events
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.events = function () {
    // Extend the events system.
    window.Events.extend({
      events: {
        'click [data-js-event="eventMethod"]': 'eventMethod'
      },
      eventMethod: (e) => {
        e[0].preventDefault()
      }
    })
  }

  // Export
  module.exports = new Module()
  
}(function () {}, window))
