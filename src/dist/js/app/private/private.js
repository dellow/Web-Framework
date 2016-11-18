/**
 *
 * Private
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function (Private, window) {
  'use strict'

  /**
   * Private
   * Constructor for Private.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Private = function () {
  }

  /**
   * init
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Private.prototype.init = function () {
    getModules.call(this)
  }

  /**
   * modules
   * Public modules.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Private.prototype.modules = {
  }

  /**
   * getModules
   * Loads any child modules.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  var getModules = function () {
  }

  // Export
  module.exports = new Private()
}(window.Private = window.Private || function () {}, window))
