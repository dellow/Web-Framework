/**
 *
 * Route
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

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
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.init = function () {
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
        'click [data-js-event="someMethod"]': 'someMethod'
      },
      someMethod: (e) => {
        e[0].preventDefault()
      }
    })
  }

  // Export
  module.exports = new Module()

}(function () {}, window))
