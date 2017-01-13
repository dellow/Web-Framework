/**
 *
 * Route
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

import MobileMenu from '../classes/global/mobile.menu'

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
    this.plugins()
    this.init()
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
   * plugins
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.plugins = function () {
    // Init slider.
    window.App.plugins.validation($('.js--validate-form'), {
      serverValidation: false,
      appendErrorToPlaceholder: true,
      msgSep: '',
      successCallback: function(){
        // Check for Google Analytics.
        if(window.config.ga_active){
          // Log it.
          Helpers.log('Setting virtual page view: /form-success.virtual')
          // Set a virtual page for GA.
          ga('send', 'pageview', '/form-success.virtual')
        }
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
  Module.prototype.init = function () {
    MobileMenu.init()
  }

  // Export
  module.exports = new Module()
}(function () {}, window))
