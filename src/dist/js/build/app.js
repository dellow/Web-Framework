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

	/**
	 * Private
	 * Start the private service.
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	**/
	global.Private = __webpack_require__(1)
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
	global.Public = __webpack_require__(2)
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
/* 2 */
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
	    this.modules.Plugins = __webpack_require__(3)
	    this.modules.MobileMenu = __webpack_require__(4)
	  }

	  // Export
	  module.exports = new Public()
	}(window.Public = window.Public || function () {}, window))


/***/ },
/* 3 */
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
/* 4 */
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
	    this.events()
	  }

	  /**
	   * settings
	   * Settings for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.settings = {
	    menuSize: '90',
	    moveContent: true
	  }

	  /**
	   * events
	   * Events for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.events = function () {
	    var _this = this

	    // Extend the events system.
	    global.Public.events.extend({
	      events: {
	        'click .js--mobileMenu--triggerOpen': 'showMenu',
	        'click .js--mobileMenu--triggerClose': 'hideMenu'
	      },
	      showMenu: function (e) {
	        return _this.init('show')
	      },
	      hideMenu: function (e) {
	        return _this.init('hide')
	      }
	    })
	  }

	  /**
	   * init
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.init = function (action) {
	    // Set the mobile menu header height to
	    // match the page mobile header height.
	    this.setHeaderHeight()
	    // Toggle the mobile menu visiblity.
	    this.style($('.js--mobileMenu--menu'), (action === 'show' ? {'left': -(100 - this.settings.menuSize) + '%', 'opacity': '1'} : {'left': '-100%', 'opacity': '0'}))
	    // Toggle the content position.
	    if (this.settings.moveContent) {
	      this.style($('.js--mobileMenu--content'), (action === 'show' ? {'left': this.settings.menuSize + '%'} : {'left': ''}))
	    }
	  }

	  /**
	   * setHeaderHeight
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.setHeaderHeight = function () {
	    return $('.page-mobile-menu__header').height(this.calculateHeight($('.js--mobileMenu--header')))
	  }

	  /**
	   * calculateHeight
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.calculateHeight = function (el) {
	    return el.outerHeight()
	  }

	  /**
	   * style
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.style = function (el, css) {
	    return el.css(css)
	  }

	  // Export
	  module.exports = new Module()
	}(function () {}, window))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);