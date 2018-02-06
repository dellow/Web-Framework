/**
 *
 * App Entry Point
 *
 * Copyright 2018, Author Name
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
    // Create object to store strings.
    window.config.contentStrings = window.config.contentStrings || {}
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
    usePjax: false
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
    // Run bootstrap.
    this.bootstrap()
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
    sliders: (el, options) => {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('script-loader!slick-carousel')
      // Init plugin.
      return el.slick(options)
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
    svgs: {
      spinner: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>'
    },
    overlay: function ($el, message, destroy) {
      // Are we destroying?
      if (destroy) {
        // Guard :: Check element has 'u-preloading' class.
        if (!$el.length || !$el.hasClass('u-preloading')) return

        // Remove overlay.
        $('.u-overlay', $el).remove()
        // Remove class.
        $el.removeClass('u-preloading')
      }

      // Are we creating?
      if (!destroy) {
        // Guard :: Check element has 'u-preloading' class.
        if (!$el.length || $el.hasClass('u-preloading')) return

        // Set message.
        message = (message) ? message : 'Loading...'
        // Add styles.
        $el.css({'position': 'relative'})
        // Create preloader.
        let $preloader = $(`
          <div class="u-overlay">
            <div class="u-overlay__body">
              <div>` + this.svgs.spinner + `</div>
              <div>` + message + `</div>
            </div>
          </div>
        `)
        // Apply overlay.
        $el.prepend($preloader).addClass('u-preloading')
      }
    },
    button: function ($el, destroy) {
      $el.each((index, btn) => {
        // Set button.
        let $btn = $(btn)
        // Are we destroying?
        if (destroy) {
          // Guard :: Check element has 'u-preloading' class.
          if (!$btn.length || !$btn.hasClass('u-preloading')) return

          // Get storage ID.
          let uid = $btn.attr('data-content-id')
          // Get content from storage.
          let content = JSON.parse(window.config.contentStrings[uid])
          // Renable the button.
          $btn.removeClass('btn--disabled')
          // Remove preloader and content ID.
          $btn.html(content).removeAttr('data-content-id')
          // Remove class.
          $btn.removeClass('u-preloading')
          // Reset styles.
          $btn.css({'width': '', 'height': '', 'position': ''})
        }

        // Are we creating?
        if (!destroy) {
          // Guard :: Check element has 'u-preloading' class.
          if (!$btn.length || $btn.hasClass('u-preloading')) return

          // Get button content.
          let content = JSON.stringify($btn.html())
          // Create a storage ID.
          let uid = window.Helpers.guid()
          // Store content.
          window.config.contentStrings[uid] = content
          // Create preloader.
          let $preloader = $(this.svgs.spinner).css({'fill': '#FFFFFF'}).hide()
          // Disable the button.
          $btn.addClass('btn--disabled')
          // Add button styles.
          $btn.css({'width': $btn.outerWidth(), 'height': $btn.outerHeight(), 'position': 'relative'})
          // Add preloader and content ID.
          $btn.html($preloader).attr('data-content-id', uid)
          // Add class.
          $btn.addClass('u-preloading')
          // Add preloader styles.
          $preloader.css({'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-left': -$preloader.outerWidth() / 2, 'margin-top': -$preloader.outerHeight() / 2}).show()
        }
      })
    }
  }

  /**
   * bootstrap
   * Module bootstrap method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.bootstrap = function () {
    // Remove 'no-js' class from html.
    $('html').removeClass('no-js').addClass('js')
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
    window.Router = new Navigo(location.protocol + '//' + location.host, false)
    // Start global route controller init method.
    require('./routes/global').init()
    // Start global route controller events method.
    require('./routes/global').events()
    // Router.
    window.Router.on({
      '/': () => {
        // Log it.
        window.Helpers.log('Route Loaded: home', '#E19F12')
        // Get route controller.
        let c = require('./routes/home')
        // Check for an init method.
        if (typeof c.init === 'function') c.init()
        // Check for an events method.
        if (typeof c.events === 'function') c.events()
      }
    }).resolve()
  }

  // Export
  window.App = new App()

}(window.App = window.App || function () {}, window))

// Start.
window.App.init()
