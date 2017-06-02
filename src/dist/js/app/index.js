/**
 *
 * App Entry Point
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

import Navigo from 'navigo'
import TurboLinks from 'turbolinks'

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
    // Start TurboLinks.
    TurboLinks.start()
    // Reset routes when TurboLinks loads.
    document.addEventListener('turbolinks:load', this.routes.bind(this))
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
    modal: function (options) {
      // Get plugin.
      require('../libs/jquery.modal')
      // Init plugin.
      return $(window).modal(options)
    },
    sliders: function (el, options) {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('script-loader!slick-carousel')
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
    require('./routes/global').init()
    // Router.
    Router.on({
      // '/page': () => {
      //   // Log it.
      //   window.Helpers.log('Route Loaded: page', '#E19F12')
      //   // Get route controller.
      //   let c = require('./routes/page')
      //   // Check for an init method.
      //   if (typeof c.init === 'function') c.init()
      //   // Check for an events method.
      //   if (typeof c.events === 'function') c.events()
      // }
    }).resolve()
  }

  // Export
  window.App = new App()
}(window.App = window.App || function () {}, window))

// Start.
window.App.init()
