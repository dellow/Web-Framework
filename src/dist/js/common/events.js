/**
 *
 * Events
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function (Events, window) {
  'use strict'

  /**
   * Events
   * Constructor for Events.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Events = function () {
  }

  /**
   * events
   * Events events listeners.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Events.prototype = {
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
      // Add event.
      $(document).on(event, selector, function (e) {
        // Add $el to event object
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

  // Export
  module.exports = new Events()
}(window.Events = window.Events || function () {}, window))
