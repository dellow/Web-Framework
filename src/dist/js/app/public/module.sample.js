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
   * events
   * Events for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module.prototype.events = function () {
    var _this = this

    // Extend the events system.
    global.Public.events.extend({
      events: {
        'click .js--moduleName--trigger': 'eventMethod'
      },
      eventMethod: function (e) {
        // // Globally cache this element.
        _this.$self = $(e.currentTarget)
        // // Data attribute.
        // var dataAttr = this.$self.data('sample') || false

        window.alert('Target clicked.')
      }
    })
  }

  /**
   * moduleMethod
   * A description.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module.prototype.moduleMethod = function () {
    return false
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
