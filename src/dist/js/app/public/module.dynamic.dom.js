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
    failSilently: false
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
        'change .js--dynamic-dom': 'updateDOM'
      },
      updateDOM: function (e) {
        e[0].preventDefault()

        // Get value.
        var value = $(e[0].currentTarget).val()
        // Get DOM target.
        var target = $(e[0].currentTarget).data('dynamic-dom') || false

        return (target && $(target).length) ? _this.updateTarget(value, $(target)) : _this.reportNoTarget()
      }
    })
  }

  /**
   * updateTarget
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module.prototype.updateTarget = function (value, $target) {
    return $target.html(value)
  }

  /**
   * reportNoTarget
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module.prototype.reportNoTarget = function () {
    return (!this.settings.failSilently) ? window.Helpers.throw('No DOM target specified.') : null
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
