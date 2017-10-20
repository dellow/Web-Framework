/**
 *
 * App Entry Point
 *
 * Copyright 2017, Author Name
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
   * _settings
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  App.prototype._settings = {
    usePjax: true
  }

  /**
   * init
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.init = function () {
    if (this._settings.usePjax) {
      // Get plugin.
      require('jquery-pjax')
      // Start Pjax.
      $(document).pjax('a', '.page-main')
      // Run routes on update.
      $('.page-main').on('pjax:end', this.routes.bind(this))
    }
    // Run routes.
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
    modal: (title, body, btn) => {
      // Guard :: Check for a modal.
      if ($('.obj-modal').length) return

      // Define modal
      const tpl = `<div class="obj-modal">
        <div class="obj-modal__window">
          <div class="obj-modal__window__header">` + title + `</div>
          <div class="obj-modal__window__main">
            <div class="page__content">` + body + `</div>
          </div>
          <div class="obj-modal__window__footer">
            <button class="btn btn--common btn--medium" data-js-event="closeModal">` + btn + `</button>
          </div>
        </div>
      </div>`
      // Get 10% of document height.
      let docHeight = ($(window).height() / 100) * 10
      // Add to body.
      $('body').append(tpl)
      // Set maxium height.
      $('.obj-modal__window').css({'maxHeight': ($(window).height() - docHeight)})
      // Wait and show modal.
      setTimeout(() => {
        $('.obj-modal').addClass('active')
      }, 50)
      // Click events.
      $('[data-js-event="closeModal"]').on('click', () => {
        $('.obj-modal').remove()
      })
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
   * preloaders
   * Preloader methods.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.preloaders = {
    button: ($el, destroy) => {
      // Guard :: Check element exists.
      if ($el.length) {
        if (!destroy) {
          if (!$el.hasClass('active')) {
            // Disable the button.
            $el.addClass('active btn--disabled')
            // Content.
            let content = JSON.stringify($el.html())
            // Loader.
            let loader = $('<div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>').css({
              'fill': '#FFFFFF'
            }).hide()
            // Apply preloader.
            $el.css({
              'width': $el.outerWidth(),
              'height': $el.outerHeight(),
              'position': 'relative'
            }).html(loader).attr('data-loader-content', content).addClass('loading')
            // Add CSS.
            loader.css({
              'position': 'absolute',
              'top': '50%',
              'left': '50%',
              'margin-left': -loader.outerWidth() / 2,
              'margin-top': -loader.outerHeight() / 2
            }).show()
            // Simulate button click.
            $el.click()
          }
        } else {
          // Renable the button.
          $el.removeClass('btn--disabled')
          // Remove preloader
          $el.removeClass('loading').html(JSON.parse($el.data('loader-content'))).removeAttr('data-loader-content').css({'width': '', 'height': '', 'position': ''})
        }
      }
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
    window.Router = new Navigo(null, false)
    // Get global route controller.
    require('./routes/global').init()
    // Router.
    window.Router.on({
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
