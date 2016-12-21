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
        // Globally cache this element.
        var $self = $(e[0].currentTarget)
        // // Data attribute.
        var dataAttr = $self.data('sample') || false

        return _this.moduleMethod($self, dataAttr)
      }
    })
  }

  /**
   * moduleMethod
   * METHOD_DESCRIPTION
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module.prototype.moduleMethod = function ($el, data) {
    window.alert('Target clicked.')
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
