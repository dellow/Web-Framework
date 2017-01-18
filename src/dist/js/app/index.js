/**
 *
 * App
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

import Navigo from 'navigo'

;(function (App, window) {

  /**
   * App
   * Constructor for App.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App = function () {
  }

  /**
   * init
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.init = function () {
    this.routes()
  }

  /**
   * plugins
   * Module plugins method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.plugins = {
    equalElementHeights: function (el) {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('../libs/jquery.equal-heights')
      // Init plugin.
      return el.equalHeights()
    },
    sliders: function (el, options) {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('script!slick-carousel')
      // Init plugin.
      return el.slick(options)
    },
    validation: function (el, options) {
      // DOM check.
      if (!el.length) return

      // Check captcha.
      if ($('#c_a_p_t_c_h_a', el).length) {
        // Set the captcha field value and check the box.
        $('#c_a_p_t_c_h_a', el).prop('checked', true).val('c_a_p_t_c_h_a')
      }
      // Get plugin.
      require('../libs/jquery.validation')
      // Init plugin.
      return el.validation(options)
    }
  }

  /**
   * routes
   * Module routes method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.routes = function () {
    // Init Routing.
    var Router = new Navigo(null, false)
    // Get global route controller.
    require('./routes/global')
    // Router.
    Router.on({
      '/page': function () {
        // Log it.
        window.Helpers.log('Route Loaded: page')
        // Get route controller.
        // require('./routes/page')
      }
    }).resolve()
  }

  // Export
  module.exports = new App().init()
}(window.App = window.App || function () {}, window))
