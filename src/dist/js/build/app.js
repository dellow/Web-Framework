/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 *
	 * Application or Website name
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	// Get error handling.
	__webpack_require__(1)
	// Require helpers globally.
	global.Helpers = __webpack_require__(2)
	// Require breakpoint globally.
	global.Breakpoint = __webpack_require__(3)
	// Get config.
	__webpack_require__(4)

	/**
	 * Private
	 * Start the private service.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	global.Private = __webpack_require__(5)
	// Init Private.
	global.Private.init()
	// Log it.
	global.Helpers.log(global.Private)

	/**
	 * Public
	 * Start the public service.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	global.Public = __webpack_require__(6)
	// Init Public.
	global.Public.init()
	// Log it.
	global.Helpers.log(global.Public)

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 *
	 * Application or Website name
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	  console.log('%c-- ERROR ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;')
	  console.log('%cMessage: ' + errorMsg, 'color: #c5211d')
	  console.log('Script: ' + url + ':' + lineNumber)
	  console.debug('Line: ' + lineNumber + ' | Column: ' + column)
	  // console.log('StackTrace: ' +  errorObj)
	  console.log('%c-- ERROR ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;')
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 *
	 * Helpers
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	;(function (Helpers, window) {
	  'use strict'

	  /**
	  * log
	  * Customised and cross browser console.log.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.log = function (message, type, alertlog) {
	    alertlog = (typeof alertlog === 'undefined')
	    if (typeof console === 'undefined' || typeof console.log === 'undefined') {
	      if (alertlog) {
	        window.alert(message)
	      }
	    } else {
	      var color = (type === 'positive') ? '#097809' : (type === 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0'
	      console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
	      if (message instanceof Array || message instanceof Object) {
	        console.log(message)
	      } else {
	        console.log('%c' + message, 'color: ' + color)
	      }
	      console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
	      console.log('')
	    }
	  }

	  /**
	  * throw
	  * Throws a custom error.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.throw = function (msg) {
	    throw new Error(msg)
	  }

	  /**
	  * breakpoint
	  * Checks the window against a certain breakpoint.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.breakpoint = function (breakpoint) {
	    return (window.innerWidth <= breakpoint)
	  }

	  /**
	  * mhi
	  * Measures a hidden element.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.mhi = function (el) {
	    // Clone element.
	    var clone = el.clone()
	    // Add to DOM in place and measure height.
	    var height = clone.css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto'}).prependTo(el.parent()).outerHeight()
	    // Destroy the clone.
	    clone.remove()

	    return height
	  }

	  /**
	  * isEmpty
	  * Checks if a value is empty, undefined or false.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.isEmpty = function (value) {
	    return (value === undefined || value === null || value === '' || value.length === 0)
	  }

	  /**
	  * debounce
	  * Returns a function, that, as long as it continues to be invoked, will not
	  * be triggered. The function will be called after it stops being called for
	  * N milliseconds. If `immediate` is passed, trigger the function on the
	  * leading edge, instead of the trailing.
	  *
	  * $(window).on('resize', Module.test)
	  *
	  * Module.test = global.Helpers.debounce(function () {
	  *     console.log('This has been debounced')
	  * }, 250)
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.debounce = function (func, wait, immediate) {
	    var timeout

	    return function () {
	      var _this = this
	      var args = arguments

	      var later = function () {
	        timeout = null
	        if (!immediate) {
	          func.apply(_this, args)
	        }
	      }
	      var callNow = immediate && !timeout
	      clearTimeout(timeout)
	      timeout = setTimeout(later, wait)
	      if (callNow) {
	        func.apply(_this, args)
	      }
	    }
	  }

	  /**
	  * preloader
	  * Generates a preloader.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.preloader = function (el, destroy) {
	    destroy = (typeof destroy === 'undefined')
	    el = (typeof el === 'undefined') ? $('body') : el
	    var loader = $('<div class="spinner-wrapper"><svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>')

	    if (!destroy) {
	      if (!$('.spinner-wrapper', el).length) {
	        el.css({'position': 'relative'}).prepend(loader)
	      }
	    } else {
	      $('.spinner-wrapper', el).fadeOut(500, function () {
	        el.css({'position': ''})
	        $(this).remove()
	      })
	    }
	  }

	  /**
	  * ajax
	  * Returns a simple Ajax request. Should use the result with a promise.
	  * Will automatically parse any URL parameters and place them in the JSON
	  * body instead.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  */
	  Helpers.ajax = function (url, request, type, dataType, preloaderElement) {
	    // Default data.
	    var defaultParams = {
	      ajaxrequest: true
	    }
	    var requestParams = (!global.Helpers.isEmpty(request)) ? request : {}
	    // Get params (if any).
	    var optionalParams = global.Helpers.parseURLParams(url)
	    // Merge params to get data.
	    var data = $.extend({}, defaultParams, optionalParams, requestParams)
	    // Request.
	    return $.ajax({
	      url: (url.indexOf('?') !== -1) ? url.split('?')[0] : url,
	      type: (!global.Helpers.isEmpty(type)) ? type : 'POST',
	      dataType: (!global.Helpers.isEmpty(dataType)) ? dataType : 'JSON',
	      data: data,
	      beforeSend: function (jqXHR, settings) {
	        // Log full URL.
	        global.Helpers.log(settings.url + '?' + settings.data)
	        // Add preloader.
	        global.Helpers.preloader((global.Helpers.isEmpty(preloaderElement)) ? $('body') : preloaderElement)
	      },
	      complete: function (jqXHR) {
	        // Destroy preloader.
	        global.Helpers.preloader((global.Helpers.isEmpty(preloaderElement)) ? $('body') : preloaderElement, true)
	      }
	    })
	  }

	  /**
	  * parseURLParams
	  * Converts the URL parameters into an object.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.parseURLParams = function (url) {
	    // Check if URL contains a ?.
	    if (url.indexOf('?') !== -1) {
	      // Split URL at ?
	      var urlParsed = url.split('?')[1]
	      var urlParams = (!global.Helpers.isEmpty(urlParsed)) ? urlParsed : false

	      return (urlParams) ? JSON.parse('{"' + decodeURI(urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : false
	    } else {
	      return {}
	    }
	  }

	  /**
	  * decodeEntities
	  * Decodes HTML entities.
	  *
	  * @since 1.0.0
	  * @version 1.0.0
	  **/
	  Helpers.decodeEntities = function (string) {
	    // Create pseudo element.
	    var pseudo = document.createElement('textarea')
	    // Decode.
	    pseudo.innerHTML = string

	    return pseudo.value
	  }

	  // Export
	  module.exports = Helpers
	}({}, window))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 *
	 * Breakpoint
	 *
	 * Copyright 2016, Author Name
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
	    global.Helpers.log('The current size is: ' + Breakpoint.size + ', the current breakpoint is: ' + Breakpoint.current + ' and the mobile menu size is: ' + Breakpoint.menu)
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
	  global.Helpers.log('The current size is: ' + Breakpoint.size + ', the current breakpoint is: ' + Breakpoint.current + ' and the mobile menu size is: ' + Breakpoint.menu)

	  // Export
	  module.exports = Breakpoint
	}({}, window))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 *
	 * Application or Website name
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	window.config.ga_active = (global.Helpers.isEmpty(window.ga))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

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
	   * modules
	   * Private modules.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Private.prototype.modules = {
	  }

	  /**
	   * init
	   * Module init method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Private.prototype.init = function () {
	    this.getChildModules()
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * Public
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	;(function (Public, window) {
	  'use strict'

	  /**
	   * Public
	   * Constructor for Public.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public = function () {
	  }

	  /**
	   * modules
	   * Public modules.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public.prototype.modules = {
	  }

	  /**
	   * events
	   * Public events listeners.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public.prototype.events = {
	    events: {},
	    extend: function (args) {
	      // Extend.
	      var extension = $.extend({}, this, args)
	      // Setup events.
	      $.each(extension.events, function (name, callback) {
	        extension.register(name, callback)
	      })

	      return extension
	    },
	    register: function (name, callback) {
	      var _this = this

	      // Cache event.
	      var event = name.substr(0, name.indexOf(' '))
	      // Cache selector.
	      var selector = name.substr(name.indexOf(' ') + 1)
	      // Add event.
	      $(document).on(event, selector, function (e) {
	        // Append $el to event object
	        e.$el = $(this)
	        // Event
	        if (typeof _this.event === 'function') {
	          e = _this.event(e)
	        }
	        // Callback
	        _this[callback]([e])
	      })
	    }
	  }

	  /**
	   * init
	   * Module init method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public.prototype.init = function () {
	    getModules.call(this)
	  }

	  /**
	   * getModules
	   * Loads any child modules.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  var getModules = function () {
	    // Require :: Modules
	    this.modules.Plugins = __webpack_require__(7)
	    this.modules.MobileMenu = __webpack_require__(8)
	  }

	  // Export
	  module.exports = new Public()
	}(window.Public = window.Public || function () {}, window))


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 *
	 * Module
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

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
	    // var _this = this

	    // Require :: NPM
	    // require('fancybox')($)
	    // Require :: Plugins
	    // require('../../plugins/jquery.equal-heights')
	    // require('../../plugins/jquery.googlemap')
	    // require('../../plugins/jquery.modals')
	    // require('../../plugins/jquery.validation')
	    // Require :: Vendor
	    // require('../../plugins/vendor/jquery.slider')
	    // require('../../plugins/vendor/jquery.tooltipster')

	    // Document ready.
	    $(function () {
	        // Call methods here.
	    })
	    // Window ready (images loaded).
	    $(window).on('load', function () {
	        // Call methods here.
	    })
	  }

	  /**
	   * equalElementHeights
	   * Equal height elements.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.equalElementHeights = function () {
	    // DOM check.
	    if ($('.js-eh').length) {
	      // Init plugin.
	      $('.js-eh').equalHeights()
	    }
	  }

	  /**
	   * googleMaps
	   * Map events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.googleMaps = function () {
	    // DOM check.
	    if ($('.js-google-map').length) {
	      // Init plugin.
	      $('.js-google-map').googlemap({
	        locations: [
	          'United Kingdom'
	        ]
	      })
	    }
	  }

	  /**
	   * lightboxes
	   * Lightbox events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.lightboxes = function () {
	    // DOM check.
	    if ($('.js-lightbox').length) {
	      // Init plugin.
	      $('.js-lightbox').fancybox({
	        autoWidth: true,
	        autoHeight: true,
	        autoScale: true,
	        transitionIn: 'fade'
	      })
	    }
	  }

	  /**
	   * modals
	   * Modal events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.modals = function () {
	    // DOM check.
	    if ($('.js-modal').length) {
	      // Init plugin.
	      $('.js-modal').modal()
	      // Init plugin on load (or function call).
	      $(window).modal({
	        type: 'modal-slide-left',
	        content: 'Some content here.'
	      })
	      // Destroy created modal.
	      $(window).destroyModal()
	    }
	  }

	  /**
	   * revealDomElement
	   * Reveals a DOM element.
	   *
	   * Usage: <button class="js-reveal" data-reveal-target=".target" data-reveal-alt="Alternative Text" data-reveal-status="hidden">Click Me</button>
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.revealDomElement = function () {
	    // Button click.
	    $(document).on('click', '.js-reveal', function (e) {
	      e.preventDefault()

	      var _self = $(this)
	      var target = _self.data('reveal-target')
	      var modify1 = _self.text()
	      var modify2 = _self.data('reveal-alt')
	      var status = _self.data('reveal-status')

	      // Check we have a target & status.
	      if (target && status) {
	        if (status === 'visible') {
	          // Check for modifier.
	          if (modify2) {
	            // Change text.
	            _self.text(modify2)
	            // Update modifier.
	            _self.data('reveal-alt', modify1)
	          }
	          // Hide element.
	          $(target).addClass('u-hidden').removeClass('u-show')
	          // Update all elements status.
	          $('[data-reveal-target="' + target + '"]').data('reveal-status', 'hidden')
	        } else {
	          // Check for modifier.
	          if (modify2) {
	            // Change text.
	            _self.text(modify2)
	            // Update modifier.
	            _self.data('reveal-alt', modify1)
	          }
	          // Show element.
	          $(target).addClass('u-show').removeClass('u-hidden')
	          // Update all elements status.
	          $('[data-reveal-target="' + target + '"]').data('reveal-status', 'visible')
	        }
	      }
	    })
	  }

	  /**
	   * sliders
	   * Slider events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.sliders = function () {
	    // DOM check.
	    if ($('.js-slider').length) {
	      // Init plugin.
	      $('.js-slider').bxSlider({
	        auto: true,
	        controls: true,
	        pager: false,
	        autoReload: true,
	        infiniteLoop: true,
	        moveSlides: 1,
	        breaks: [
	          {screen: 0, slides: 1, pager: false},
	          {screen: 460, slides: 2},
	          {screen: 768, slides: 3}
	        ]
	      })
	    }
	  }

	  /**
	   * tooltips
	   * Tooltip events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.tooltips = function () {
	    // DOM check.
	    if ($('.js-tooltip').length) {
	      // Init plugin.
	      $('.js-tooltip').tooltipster({
	        delay: 100,
	        animation: 'fade',
	        trigger: 'hover'
	      })
	      // Prevent click. This is for tooltips used in forms where
	      // we might use an anchor instead of a button. We do this
	      // so the button doesn't submit the form and trigger the
	      // validation script.
	      $('.js-tooltip').on('click', function (e) {
	        e.preventDefault()
	      })
	    }
	  }

	  /**
	   * validation
	   * Form validation events.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.validation = function () {
	    // Check captcha.
	    if ($('#c_a_p_t_c_h_a').length) {
	      // Set the captcha field value and check the box.
	      $('#c_a_p_t_c_h_a').prop('checked', true).val('c_a_p_t_c_h_a')
	    }

	    // DOM check.
	    if ($('.js-validate').length) {
	      // Init plugin.
	      $('.js-validate').validation({
	        serverValidation: false,
	        appendErrorToPlaceholder: true,
	        successCallback: function () {
	          // Check for Google Analytics.
	          if (window.config.ga_active) {
	            // Set a virtual page for GA.
	            window.ga('send', 'pageview', '/contact-success.virtual')
	          }
	        }
	      })
	    }
	  }

	  // Export
	  module.exports = new Module()
	}(function () {}, window))


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 *
	 * Module
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

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
	    var _this = this

	    // Document ready.
	    $(function () {
	      // Set active flag.
	      _this.menuActive = false
	      _this.subMenuActive = false

	      // Vars.
	      _this.$button = $('.js-mobile-button')
	      _this.$menu = $('.js-mobile-menu')
	      _this.$content = $('.js-mobile-content')
	      _this.$close = $('.js-close-mobile-menu')
	      _this.$sub_close = $('.js-sub-menu-close')

	      // Start binds on window load / resize.
	      $(window).on('load resize', $.proxy(_this.init, _this))
	    })
	  }

	  /**
	   * init
	   * Init method for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.init = function () {
	    // Check screen is below mobile breakpoint.
	    if (global.Breakpoint.current === 'mobile') {
	      return this.binds()
	    } else {
	      // Reset flag.
	      this.setMenuFlag(false)
	      // Reset any menus.
	      return this.hidePrimaryMenu()
	    }
	  }

	  /**
	   * binds
	   * jQuery event binds for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.binds = function () {
	    var _this = this

	    // Click on the mobile menu.
	    this.$button.on('click', function () {
	      var _self = $(this)

	      if (_this.subMenuActive) {
	        // Hide mobile menu.
	        _this.hideSubMenu()
	        // Set flag.
	        _this.subMenuActive = false
	      } else if (_this.menuActive) {
	        // Hide mobile menu.
	        _this.hidePrimaryMenu(_self)
	        // Set flag.
	        _this.setMenuFlag(false)
	      } else {
	        // Show mobile menu.
	        _this.showPrimaryMenu(_self)
	        // Set flag.
	        _this.setMenuFlag(true)
	      }
	    })

	    // Sub Menu Click.
	    $(_this.$menu).on('click', 'a', function (e) {
	      var _self = $(this)

	      if (_self.next('ul').length) {
	        e.preventDefault()
	        // Init sub menu.
	        _this.showSubMenu(_self.next('ul'))
	      }
	    })

	    // Escape key pressed.
	    $(document).on('keyup', function (e) {
	      // Check key type & menu is active.
	      if (e.keyCode === 27) {
	        // Hide mobile menu.
	        _this.$close.trigger('click')
	      }
	    })

	    // Sub Menu Close.
	    this.$sub_close.on('click', function () {
	      // Check sub menu is active first.
	      if (_this.subMenuActive) {
	        // Hide mobile menu.
	        _this.hideSubMenu()
	        // Set flag.
	        _this.subMenuActive = false
	      }
	    })

	    // Close menu.
	    this.$close.on('click', function () {
	      // Check sub menu is active first.
	      if (_this.subMenuActive) {
	        // Hide mobile menu.
	        _this.hideSubMenu()
	        // Set flag.
	        _this.subMenuActive = false
	      } else if (_this.menuActive) {
	        // Hide mobile menu.
	        _this.hidePrimaryMenu()
	        // Set flag.
	        _this.setMenuFlag(false)
	      }
	    })
	  }

	  /**
	   * showPrimaryMenu
	   * Show menu.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.showPrimaryMenu = function () {
	    // Vars.
	    var docWidth = $(document).width()
	    var doc85 = (docWidth / 100) * 85

	    // Add 85% width to menu.
	    this.$menu.css({'width': doc85})
	    // Move page content 85% left.
	    this.$content.addClass('active-menu').css({'left': doc85})
	    // Add active class to menu button.
	    this.$button.addClass('active-menu')
	    // Restrict body height.
	    $('body').addClass('u-noscroll')
	  }

	  /**
	   * hidePrimaryMenu
	   * Hide menu.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.hidePrimaryMenu = function () {
	    var _this = this

	    // Remove the active class.
	    this.$content.removeClass('active-menu')
	    // Remove active class from menu button.
	    this.$button.removeClass('active-menu')
	    // Remove the active class.
	    this.$content.css({'left': ''})

	    // Wait 10ms.
	    setTimeout(function () {
	      // Remove 90% width to menu.
	      _this.$menu.css({'width': ''})
	      // Restrict body height.
	      $('body').removeClass('u-noscroll')
	    }, 500) // Needs to be the same as the animation speed in the CSS.
	  }

	  /**
	   * showSubMenu
	   * Show sub menu.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.showSubMenu = function (el) {
	    var _this = this

	    // Vars.
	    var menuWidth = _this.$menu.width()
	    var menu95 = (menuWidth / 100) * 95

	    // Add 95% width to sub menu.
	    el.addClass('active-sub-menu').css({'width': menu95})
	    // Wait 10ms.
	    setTimeout(function () {
	      _this.$menu.addClass('sub-menu-active')
	      _this.subMenuActive = true
	    }, 100)
	  }

	  /**
	   * hideSubMenu
	   * Hides sub menu.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.hideSubMenu = function (el) {
	    var _this = this

	    // Set close button text.
	    this.$close.html('X')
	    // Remove 80% width from sub menus.
	    $('.active-sub-menu').css({'width': ''})
	    // Wait 10ms.
	    setTimeout(function () {
	      _this.subMenuActive = false
	    }, 100)
	    // Wait 20ms.
	    setTimeout(function () {
	      _this.$menu.removeClass('sub-menu-active')
	      // Remove active class from sub menus.
	      $('.active-sub-menu').removeClass('active-sub-menu')
	    }, 200)
	  }

	  /**
	   * setMenuFlag
	   * Set flag after 10ms
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.setMenuFlag = function (state) {
	    var _this = this

	    // Wait 10ms.
	    setTimeout(function () {
	      // Set flag.
	      _this.menuActive = state
	    }, 100)
	  }

	  // Export
	  module.exports = new Module()
	}(function () {}, window))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);