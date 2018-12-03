/**
 *
 * App Entry Point
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Navigo from 'navigo'

import RouteGlobal from './routes/global'
import RouteHome from './routes/home'

;(function (App, window) 
{

  /**
   * App
   * Constructor for App.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App = function() 
  {
    // Create object to store strings.
    window.config.contentStrings = window.config.contentStrings || {}
  }

  /**
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype._settings = {
    usePjax: false
  }

  /**
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.init = function() 
  {
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
   * Module plugins method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.plugins = {
    modal: (title, body, btn, destroy) => {
      // Check for an existing modal.
      if ($('.obj-modal').length) $('.obj-modal').remove()
      // Check for destroy.
      if (destroy) return $('.obj-modal').remove()

      // Define wrapper.
      const wrapper = `<div class="obj-modal"></div>`
      // Define modal
      const modal = `<div class="obj-modal__window">
        <div class="obj-modal__window__main">
          <div class="layout-content">` + body + `</div>
        </div>
      </div>`
      // Get 10% of document height.
      let docHeight = ($(window).height() / 100) * 10
      // Add to body.
      if (!$('.obj-modal').length) {
        $('body').append(wrapper)
      }
      // Add to wrapper.
      $('.obj-modal').empty().append(modal)
      // Set maxium height.
      $('.obj-modal__window').css({'maxHeight': ($(window).height() - docHeight)})
      // Add title.
      if (title) {
        $('.obj-modal__window').prepend(`
          <div class="obj-modal__window__header">
            <div class="obj-modal__window__header__title">` + title + `</div>
          </div>
        `)
      }
      // Add btn.
      if (btn) {
        $('.obj-modal__window').append(`
          <div class="obj-modal__window__footer">
            <button class="btn btn--common btn--small" data-js-event="closeModal">` + btn + `</button>
          </div>
        `)
      }
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
   * Preloader methods.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.preloaders = {
    svgs: {
      spinner: (width, height, color) => {
        width = (width) ? width : 25
        height = (height) ? height : 25
        color = (color) ? color : '#000'
        return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + width + '" height="' + height + '" fill="' + color + '" viewBox="0 0 50 50" style="display:block;enable-background:new 0 0 50 50;" xml:space="preserve"><path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>'
      },
      circle: (width, height, color) => {
        width = (width) ? width : 25
        height = (height) ? height : 25
        color = (color) ? color : '#000'
        return '<svg width="' + width + '" height="' + height + '" stroke="' + color + '" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>'
      },
      tick: (width, height, color) => {
        width = (width) ? width : 25
        height = (height) ? height : 25
        color = (color) ? color : '#8ac38b'
        return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + width + '" height="' + height + '" viewBox="0 0 100 100" enable-background="new 0 0 ' + width + ' ' + height + '" xml:space="preserve"><polyline class="check" fill="none" stroke="' + color + '" stroke-width="10" stroke-miterlimit="20" points="15,60 40,80 85,20" /></svg>'
      }
    },
    button: function($el, destroy) 
    {
      $el.each((index, btn) => {
        // Set button.
        let $btn = $(btn)
        // Are we destroying?
        if (destroy) {
          // Guard :: Check element has 'js-preloading' class.
          if (!$btn.length || !$btn.hasClass('js-preloading')) return

          // Get storage ID.
          let uid = $btn.attr('data-content-id')
          // Get content from storage.
          let content = JSON.parse(window.config.contentStrings[uid])
          // Renable the button.
          $btn.removeClass('btn--disabled')
          // Remove preloader and content ID.
          $btn.html(content).removeAttr('data-content-id')
          // Remove class.
          $btn.removeClass('js-preloading')
          // Reset styles.
          $btn.css({'width': '', 'height': '', 'position': ''})
        }

        // Are we creating?
        if (!destroy) {
          // Guard :: Check element has 'js-preloading' class.
          if (!$btn.length || $btn.hasClass('js-preloading')) return

          // Get button content.
          let content = JSON.stringify($btn.html())
          // Create a storage ID.
          let uid = window.Helpers.guid()
          // Store content.
          window.config.contentStrings[uid] = content
          // Create preloader.
          let $preloader = $(this.svgs.spinner()).css({'fill': '#FFFFFF'}).hide()
          // Disable the button.
          $btn.addClass('btn--disabled')
          // Add button styles.
          $btn.css({'width': $btn.outerWidth(), 'height': $btn.outerHeight(), 'position': 'relative'})
          // Add preloader and content ID.
          $btn.html($preloader).attr('data-content-id', uid)
          // Add class.
          $btn.addClass('js-preloading')
          // Add preloader styles.
          $preloader.css({'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-left': -$preloader.outerWidth() / 2, 'margin-top': -$preloader.outerHeight() / 2}).show()
        }
      })
    }
  }

  /**
   * Module bootstrap method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.bootstrap = function() 
  {
    // Remove 'no-js' class from html.
    $('html').removeClass('no-js').addClass('js')
  }

  /**
   * Module routes method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.routes = function() 
  {
    // Init Routing.
    window.Router = new Navigo(location.protocol + '//' + location.host, false)
    // Start global route controller init method.
    RouteGlobal.init()
    // Start global route controller listeners method.
    RouteGlobal.listeners()
    // Router.
    window.Router.on({
      '/': () => {
        // Log it.
        window.Helpers.log('Route Loaded: home', '#E19F12')
        // Get route controller.
        let c = RouteHome
        // Check for an init method.
        if (typeof c.init === 'function') c.init()
        // Check for an listeners method.
        if (typeof c.listeners === 'function') c.events()
      }
    }).resolve()
  }

  // Export
  window.App = new App()

}(window.App = window.App || function () {}, window))

// Start.
window.App.init()
