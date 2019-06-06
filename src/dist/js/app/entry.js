/**
 *
 * Entry Point
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

// Create object to store strings.
const contentStrings = {}

const _this = module.exports = {
  init: () => {
    // Remove 'no-js' class from html.
    $('html').removeClass('no-js').addClass('js')
    // Configure Axios.
    _this.Axios.bootstrap()
  },
  Axios: {
    bootstrap: function()
    {
      // Set config.
      this.defaultHeaders = window.Axios.defaults.headers.common = {
        'baseURL': window.config.baseURL || '/',
        'X-Requested-With': 'XMLHttpRequest'
      }
      // Logs the URL on every request.
      window.Axios.interceptors.request.use((config) => {
        // Log it.
        window.Helpers.log(config.url + window.Helpers.parseParamObject(config.params))

        return config
      })
      // Log it.
      window.Helpers.log('Ajax authenticated.')
    },
    prepareForOutgoingRequest: function()
    {
      // Create Axios instance.
      let axiosInstance = window.Axios.create()
      // Remove headers.
      axiosInstance.defaults.headers.common = {}

      return axiosInstance
    },
    resetHeaders: function()
    {
      window.Axios.defaults.headers.common = this.defaultHeaders
    }
  },
  plugins: {
    sliders: (el, options) => {
      // DOM check.
      if (!el.length) return

      // Get plugin.
      require('script-loader!slick-carousel')
      // Init plugin.
      return el.slick(options)
    }
  },
  preloaders: {
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
    button: function ($el, destroy, color, svg, width, height) 
    {
      color = (color) ? color : '#FFFFFF'
      svg = (svg) ? svg : 'default'
      width = (width) ? width : 25
      height = (height) ? height : 25

      // Are we destroying?
      if (destroy) {
        // Guard :: Check element has 'js-preloading' class.
        if (!$el.length || !$el.hasClass('js-preloading')) return

        // Get storage ID.
        let uid = $el.attr('data-content-id')
        // Get content from storage.
        let content = JSON.parse(contentStrings[uid])
        // Renable the button.
        $el.removeClass('btn--disabled')
        // Remove preloader and content ID.
        $el.html(content).removeAttr('data-content-id')
        // Remove class.
        $el.removeClass('js-preloading')
        // Reset styles.
        $el.css({
          'width': '', 
          'height': '', 
          'position': '',
          'box-sizing': ''
        })
      } else {
        $el.each((index, btn) => {
          setTimeout(() => {
            // Set button.
            let $btn = $(btn)
            // Guard :: Check element has 'js-preloading' class.
            if (!$btn.length || $btn.hasClass('js-preloading')) return
  
            // Get button content.
            let content = JSON.stringify($btn.html())
            // Create a storage ID.
            let uid = window.Helpers.guid()
            // Store content.
            contentStrings[uid] = content
            // Create preloader.
            let $preloader = $(this.svgs[svg](width, height, color)).hide()
            // Disable the button.
            $btn.addClass('btn--disabled')
            // Add button styles.
            $btn.css({
              'width': $btn.outerWidth(), 
              'height': $btn.outerHeight(), 
              'position': 'relative',
              'box-sizing': 'border-box'
            })
            // Add preloader and content ID.
            $btn.html($preloader).attr('data-content-id', uid)
            // Add class.
            $btn.addClass('js-preloading')
            // Add preloader styles.
            $preloader.css({'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-left': -$preloader.outerWidth() / 2, 'margin-top': -$preloader.outerHeight() / 2}).show()
          })
        })
      }
    }
  }
}