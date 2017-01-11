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
