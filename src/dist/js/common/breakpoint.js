/**
 *
 * Breakpoint
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

;(function (Breakpoint, window) {
  'use strict'

  /**
   * refreshValue
   * Method for retrieving the current breakpoint range and mobile menu..
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Breakpoint.refreshValue = function () {
    // Set the current.
    this.current = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/["']/g, '')
    // Set the menu.
    this.menu = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '')
    // Set the size.
    this.size = window.innerWidth
  }

  /**
   * If window is resized, reset the current breakpoint.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  $(window).on('resize', function () {
    // Get current breakpoint.
    Breakpoint.refreshValue()
    // Log it.
    window.Helpers.log('The current size is: ' + Breakpoint.size + ', the current breakpoint is: ' + Breakpoint.current + ' and the mobile menu size is: ' + Breakpoint.menu)
  })

  /**
   * On load get window size.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  // Get current breakpoint.
  Breakpoint.refreshValue()
  // Log it.
  window.Helpers.log('The current size is: ' + Breakpoint.size + ', the current breakpoint is: ' + Breakpoint.current + ' and the mobile menu size is: ' + Breakpoint.menu)

  // Export
  module.exports = Breakpoint
}({}, window))
