/**
 *
 * Route
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

import MobileMenu from '../classes/global/mobile.menu'
import TurboLinks from 'turbolinks'

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
    form: $('.js--validate-form')
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
    TurboLinks.start()
    MobileMenu.init()
    this.formValidation()
  }

  /**
   * formValidation
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.formValidation = function () {
    // Init plugin.
    window.App.plugins.validation(this._dom.form, {
      serverValidation: false,
      appendErrorToPlaceholder: true,
      msgSep: '',
      successCallback: function () {
        // Check for Google Analytics.
        if (window.config.ga_active) {
          // Log it.
          window.Helpers.log('Setting virtual page view: /form-success.virtual')
          // Set a virtual page for GA.
          window.ga('send', 'pageview', '/form-success.virtual')
        }
      }
    })
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
