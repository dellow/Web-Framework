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

	  var eventsList = []

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
	   * eventsList
	   * Get events as an array list.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public.prototype.eventsList = eventsList

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
	      // Add to array.
	      eventsList.push(event + ' : ' + selector)
	      eventsList.sort()
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
	   * plugins
	   * Module plugins method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Public.prototype.plugins = {
	    equalElementHeights: function (el) {
	      // DOM check.
	      if (!el.length) return

	      // Get plugin.
	      __webpack_require__(3)
	      // Init plugin.
	      el.equalHeights()
	    },
	    sliders: function (el, options) {
	      // DOM check.
	      if (!el.length) return

	      // Get plugin.
	      __webpack_require__(4)
	      // Init plugin.
	      el.bxSlider(options)
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
	      __webpack_require__(5)
	      // Init plugin.
	      el.validation(options)
	    }
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
	   * getModules
	   * Loads any child modules.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  var getModules = function () {
	    this.modules.MobileMenu = __webpack_require__(6)
	    this.modules.DynamicDOM = __webpack_require__(7)
	  }

	  // Export
	  module.exports = new Public()
	}(window.Public = window.Public || function () {}, window))


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 *
	 * Equal Heights
	 * jquery.equal-heights.js
	 *
	 * Copyright 2014, Stewart Dellow
	 * Some information on the license.
	 *
	 * $('.js-eh').equalHeights();
	 *
	**/

	;(function($, window, undefined){
	    'use strict';

	    // Set helpers.
	    var helpers = {};

	    /**
	     * Plugin
	     * Return a unique plugin instance.
	    **/
	    var Plugin = function(elem, options){
	        this.elem     = elem;
	        this.$elem    = $(elem);
	        this.options  = options;
	        this.metadata = this.$elem.data('plugin-options');
	    }

	    /**
	     * $.fn.equalHeights
	     * Return a unique plugin instance.
	    **/
	    $.fn.equalHeights = function(options){
	        return this.each(function(){
	            new Plugin(this, options).init();
	        });
	    };

	    /**
	     * $.fn.equalHeights.defaults
	     * Default options.
	    **/
	    $.fn.equalHeights.defaults = {
	        widths: false
	    }

	    /**
	     * Plugin.prototype
	     * Init.
	    **/
	    Plugin.prototype = {
	        init: function(){
	            // this
	            var _self = this;

	            // Global settings.
	            _self.settings = $.extend({}, $.fn.equalHeights.defaults, _self.options);
	            // Run the plugin.
	            _self.run();

	            return _self;
	        },
	        run: function(){
	            // Set the breakpoints
	            var breakpoints = (this.$elem.data('eh-breakpoints')) ? this.$elem.data('eh-breakpoints').split('|') : [320, 9999];
	            // Go!
	            this.watch_window(this.$elem, breakpoints[0], breakpoints[1]);
	        },
	        calculate: function(el){
	            var _self = this;

	            var boxes = $('[data-eh="true"]', el);
	            // Reset the height attribute to `auto` (or nothing).
	            this.reset_sizes(el);
	            // Map all qualifying element heights to an array.
	            var heights = boxes.map(function(){
	                return $(this).height();
	            }).get();
	            // Map all qualifying element heights to an array.
	            var widths = boxes.map(function(){
	                return $(this).outerWidth() + $(this).css('margin-left');
	            }).get();
	            // Get the largest value from the array.
	            var large_height = Math.max.apply(Math, heights);
	            var large_width = Math.max.apply(Math, widths);
	            // Apply the CSS height to all qualifying elements.
	            boxes.each(function(){
	                $(this).height(large_height);
	                // Are we doing widths?
	                if(_self.settings.widths){
	                    $(this).css({'min-width': large_width});
	                }
	            });
	        },
	        watch_window: function(el, breakpoint1, breakpoint2){
	            var _self = this;

	            $(function(){
	                _self.run_sizes(el, breakpoint1, breakpoint2);
	            });
	            $(window).on('resize', function(){
	                _self.run_sizes(el, breakpoint1, breakpoint2);
	            });
	        },
	        run_sizes: function(el, breakpoint1, breakpoint2){
	            var _self = this;

	            return ($(window).width() >= breakpoint1 && $(window).width() <= breakpoint2) ?  _self.calculate(el) : _self.reset_sizes(el);
	        },
	        reset_sizes: function(el){
	            var _self = this;

	            var boxes = $('[data-eh="true"]', el);
	            // Reset the height attribute to `auto` (or nothing).
	            boxes.each(function(){
	                $(this).css({'height': 'auto'});
	                // Are we doing widths?
	                if(_self.settings.widths){
	                    $(this).css({'min-width': 'none'});
	                }
	            });
	        }
	    }

	})(jQuery, window);


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * BxSlider v4.1.2 - Fully loaded, responsive content slider
	 * http://bxslider.com
	 *
	 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
	 * Written while drinking Belgian ales and listening to jazz
	 *
	 * Released under the MIT license - http://opensource.org/licenses/MIT
	 */
	 /* ===================================================================================== */
	 /**
	 * Custom modifications of one of my favourite responsive sliders.
	 * ---------------------------------------------------------------------------------------
	 * - Author: Rahisify
	 * - Url   : http://rahisify.com
	 * ---------------------------------------------------------------------------------------
	 * (1) Added data attributes support
	 * (2) Added break points support
	 * (3) Added automatic reload option
	 * (4) Added self calling capability
	 * ---------------------------------------------------------------------------------------
	 * - Would not be possible without the awesome work of Steven Wanderski.
	 * - Released under same license - not for sale!
	 * ---------------------------------------------------------------------------------------
	 */

	;(function($){

		var plugin = {};

		var defaults = {

			// GENERAL
			mode: 'horizontal',
			slideSelector: '',
			infiniteLoop: true,
			hideControlOnEnd: false,
			speed: 500,
			easing: null,
			slideMargin: 0,
			startSlide: 0,
			randomStart: false,
			captions: false,
			ticker: false,
			tickerHover: false,
			adaptiveHeight: false,
			adaptiveHeightSpeed: 500,
			video: false,
			useCSS: true,
			preloadImages: 'visible',
			responsive: true,
			slideZIndex: 50,
			wrapperClass: 'bx-wrapper',

			// TOUCH
			touchEnabled: true,
			swipeThreshold: 50,
			oneToOneTouch: true,
			preventDefaultSwipeX: true,
			preventDefaultSwipeY: false,

			// PAGER
			pager: true,
			pagerType: 'full',
			pagerShortSeparator: ' / ',
			pagerSelector: null,
			buildPager: null,
			pagerCustom: null,

			// CONTROLS
			controls: true,
			nextText: 'Next',
			prevText: 'Prev',
			nextSelector: null,
			prevSelector: null,
			autoControls: false,
			startText: 'Start',
			stopText: 'Stop',
			autoControlsCombine: false,
			autoControlsSelector: null,

			// AUTO
			auto: false,
			pause: 4000,
			autoStart: true,
			autoDirection: 'next',
			autoHover: false,
			autoDelay: 0,
			autoSlideForOnePage: false,

			// CAROUSEL
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 0,
			slideWidth: 0,
	    autoReload: false,

			// CALLBACKS
			onSliderLoad: function() {},
			onSlideBefore: function() {},
			onSlideAfter: function() {},
			onSlideNext: function() {},
			onSlidePrev: function() {},
			onSliderResize: function() {}
		}

		$.fn.bxSlider = function(options){

			if(this.length == 0) return this;

			// support mutltiple elements
			if(this.length > 1){
				this.each(function(){$(this).bxSlider(options)});
				return this;
			}

			// create a namespace to be used throughout the plugin
			var slider = {};
			// set a reference to our slider element
			var el = this;
			plugin.el = this;

			/**
			 * Makes slideshow responsive
			 */
			// first get the original window dimens (thanks alot IE)
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();



			/**
			 * ===================================================================================
			 * = PRIVATE FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Initializes namespace settings to be used throughout plugin
			 */
			var init = function(){

	      // merge user-supplied options with the defaults
				slider.settings = $.extend({}, defaults, options);

			 /**
	     * ===================================================================================
			 *  CUSTOM MODIFICATIONS (Delete this block if you disapprove!)
			 * ===================================================================================
			 */

	      // set up carousel if initial options intended to do so
	      setupCarousel();

	      // screen width we will be referring to
	      var currentWidth = $(window).width();
	      // force the slider to use this width(disable if you disapprove!)
	      windowWidth = currentWidth;

	      /* DEFINE FUNCTIONS WE WILL USE
	      -----------------------------------------------------------------*/

	      // calculates slide width
	      function calcSlideWidth (fullW, numSlides, margin) {

	        var calcWidth = (fullW-(margin*(numSlides-1))) / numSlides;
	        return Math.floor(calcWidth);

	      }

	      // sets break point options
	      function setBreakOptions(breakObj) {

	        for(var key in breakObj) {
	          slider.settings[key] = breakObj[key];
	        }

	      }

	      // sets up carousel from available options
	      function setupCarousel() {

	        if(slider.settings.slides) {
	          slider.settings.maxSlides = slider.settings.slides;
	          slider.settings.minSlides = slider.settings.slides;
	          slider.settings.slideWidth = calcSlideWidth (windowWidth, slider.settings.slides, slider.settings.slideMargin);
	        }

	      }

	      // converts string into valid JSON format
	      function jsonify(str) {

	        str = str.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
	        str = str.replace(/'/g, '"');
	        var jsonArray = jQuery.parseJSON(str);
	        return jsonArray;

	      }

	      // (1) Grab data options if available
	      // ---------------------------------------------------------------------------------

	      var dataOptions = $(el).attr('data-options');

	      if(dataOptions) {

	        //add curly brackets if not there
	        var lastChar = dataOptions.charAt(dataOptions.length-1);
	        var firstChar = dataOptions.charAt(0);

	        if(firstChar != "{" && lastChar != "}" ) {
	          dataOptions = "{" + dataOptions + "}";
	        }

	        // exploit JSON parser to lessen work
	        var opts = jsonify(dataOptions);

	        for (var key in opts) {
	          slider.settings[key] = opts[key];
	        }
	        // set up carousel if options intended to do so
	        setupCarousel();

	      }

	      // (2) Grab breaks from data attributes if available
	      // ---------------------------------------------------------------------------------

	      var dataBreaks = $(el).attr('data-breaks');


	      if(dataBreaks) {
	        // exploit JSON parser to lessen work
	        slider.settings.breaks = jsonify(dataBreaks);
	      }

	      // (3) proceed to process(if available) the user supplied break points
	      // ---------------------------------------------------------------------------------

	      if(slider.settings.breaks) {

	        // Sort in ascending order in case of mix up
	         slider.settings.breaks.sort(function(a, b) {
	          return a.screen - b.screen;
	         });

	        // Process breaks
	        for(var i = 0; i < slider.settings.breaks.length; ++i) {

	          var currentBreak =  slider.settings.breaks[i];
	          var nextBreak = {};
	          var min = currentBreak.screen;
	          var max;

	          if(i < slider.settings.breaks.length - 1) { // next break exists

	            nextBreak = slider.settings.breaks[i+1];
	            max = nextBreak.screen;

	            if(currentWidth >= min && currentWidth < max) {
	              setBreakOptions(currentBreak);
	            }

	          } else { // just use current break coz next one does not exist

	            if(currentWidth >= min) {
	              setBreakOptions(currentBreak);
	            }
	          }

	        }

	        // set up carousel if options intended to do so
	        setupCarousel();

	      }


			/**
			 * ===================================================================================
			 * = CUSTOM MODIFICATIONS /END
			 * ===================================================================================
			 */

				// parse slideWidth setting
				slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
				// store the original children
				slider.children = el.children(slider.settings.slideSelector);
				// check if actual number of slides is less than minSlides / maxSlides
				if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
				if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
				// if random start, set the startSlide setting to random number
				if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
				// store active slide information
				slider.active = { index: slider.settings.startSlide }
				// store if the slider is in carousel mode (displaying / moving multiple slides)
				slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
				// if carousel, force preloadImages = 'all'
				if(slider.carousel) slider.settings.preloadImages = 'all';
				// calculate the min / max width thresholds based on min / max number of slides
				// used to setup and update carousel slides dimensions
				slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
				slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				// store the current state of the slider (if currently animating, working is true)
				slider.working = false;
				// initialize the controls object
				slider.controls = {};
				// initialize an auto interval
				slider.interval = null;
				// determine which property to use for transitions
				slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
				// determine if hardware acceleration can be used
				slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
					// create our test div element
					var div = document.createElement('div');
					// css transition properties
					var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
					// test for each property
					for(var i in props){
						if(div.style[props[i]] !== undefined){
							slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
							slider.animProp = '-' + slider.cssPrefix + '-transform';
							return true;
						}
					}
					return false;
				}());
				// if vertical mode always make maxSlides and minSlides equal
				if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
				// save original style data
				el.data("origStyle", el.attr("style"));
				el.children(slider.settings.slideSelector).each(function() {
				  $(this).data("origStyle", $(this).attr("style"));
				});
				// perform all DOM / CSS modifications
				setup();
			}

			/**
			 * Performs all DOM and CSS modifications
			 */
			var setup = function(){
				// wrap el in a wrapper
				el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
				// store a namspace reference to .bx-viewport
				slider.viewport = el.parent();
				// add a loading div to display while images are loading
				slider.loader = $('<div class="bx-loading" />');
				slider.viewport.prepend(slider.loader);
				// set el to a massive width, to hold any needed slides
				// also strip any margin and padding from el
				el.css({
					width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
					position: 'relative'
				});
				// if using CSS, add the easing property
				if(slider.usingCSS && slider.settings.easing){
					el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
				// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
				}else if(!slider.settings.easing){
					slider.settings.easing = 'swing';
				}
				var slidesShowing = getNumberSlidesShowing();
				// make modifications to the viewport (.bx-viewport)
				slider.viewport.css({
					width: '100%',
					overflow: 'hidden',
					position: 'relative'
				});
				slider.viewport.parent().css({
					maxWidth: getViewportMaxWidth()
				});
				// make modification to the wrapper (.bx-wrapper)
				if(!slider.settings.pager) {
					slider.viewport.parent().css({
					margin: '0 auto 0px'
					});
				}
				// apply css to all slider children
				slider.children.css({
					'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
					listStyle: 'none',
					position: 'relative'
				});
				// apply the calculated width after the float is applied to prevent scrollbar interference
				slider.children.css('width', calcSlideWidthidth());
				// if slideMargin is supplied, add the css
				if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
				if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
				// if "fade" mode, add positioning and z-index CSS
				if(slider.settings.mode == 'fade'){
					slider.children.css({
						position: 'absolute',
						zIndex: 0,
						display: 'none'
					});
					// prepare the z-index on the showing element
					slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
				}
				// create an element to contain all slider controls (pager, start / stop, etc)
				slider.controls.el = $('<div class="bx-controls" />');
				// if captions are requested, add them
				if(slider.settings.captions) appendCaptions();
				// check if startSlide is last slide
				slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
				// if video is true, set up the fitVids plugin
				if(slider.settings.video) el.fitVids();
				// set the default preload selector (visible)
				var preloadSelector = slider.children.eq(slider.settings.startSlide);
				if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
				// only check for control addition if not in "ticker" mode
				if(!slider.settings.ticker){
					// if pager is requested, add it
					if(slider.settings.pager) appendPager();
					// if controls are requested, add them
					if(slider.settings.controls) appendControls();
					// if auto is true, and auto controls are requested, add them
					if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
					// if any control option is requested, add the controls wrapper
					if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
				// if ticker mode, do not allow a pager
				}else{
					slider.settings.pager = false;
				}
				// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
				loadElements(preloadSelector, start);
			}

			var loadElements = function(selector, callback){
				var total = selector.find('img, iframe').length;
				if (total == 0){
					callback();
					return;
				}
				var count = 0;
				selector.find('img, iframe').each(function(){
					$(this).one('load', function() {
					  if(++count == total) callback();
					}).each(function() {
					  if(this.complete) $(this).load();
					});
				});
			}

			/**
			 * Start the slider
			 */
			var start = function(){

				// if infinite loop, prepare additional slides
				if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
					var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
					var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
					var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
					el.append(sliceAppend).prepend(slicePrepend);
				}
				// remove the loading DOM element
				slider.loader.remove();
				// set the left / top position of "el"
				setSlidePosition();
				// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
				if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
				// set the viewport height
				slider.viewport.height(getViewportHeight());
				// make sure everything is positioned just right (same as a window resize)
				el.redrawSlider();
				// onSliderLoad callback
				slider.settings.onSliderLoad(slider.active.index);
				// slider has been fully initialized
				slider.initialized = true;
				// bind the resize call to the window
				if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
				// if auto is true and has more than 1 page, start the show
				if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
				// if ticker is true, start the ticker
				if (slider.settings.ticker) initTicker();
				// if pager is requested, make the appropriate pager link active
				if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
				// check for any updates to the controls (like hideControlOnEnd updates)
				if (slider.settings.controls) updateDirectionControls();
				// if touchEnabled is true, setup the touch events
				if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
			}

			/**
			 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
			 */
			var getViewportHeight = function(){
				var height = 0;
				// first determine which children (slides) should be used in our height calculation
				var children = $();
				// if mode is not "vertical" and adaptiveHeight is false, include all children
				if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
					children = slider.children;
				}else{
					// if not carousel, return the single active child
					if(!slider.carousel){
						children = slider.children.eq(slider.active.index);
					// if carousel, return a slice of children
					}else{
						// get the individual slide index
						var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
						// add the current slide to the children
						children = slider.children.eq(currentIndex);
						// cycle through the remaining "showing" slides
						for (i = 1; i <= slider.settings.maxSlides - 1; i++){
							// if looped back to the start
							if(currentIndex + i >= slider.children.length){
								children = children.add(slider.children.eq(i - 1));
							}else{
								children = children.add(slider.children.eq(currentIndex + i));
							}
						}
					}
				}
				// if "vertical" mode, calculate the sum of the heights of the children
				if(slider.settings.mode == 'vertical'){
					children.each(function(index) {
					  height += $(this).outerHeight();
					});
					// add user-supplied margins
					if(slider.settings.slideMargin > 0){
						height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
					}
				// if not "vertical" mode, calculate the max height of the children
				}else{
					height = Math.max.apply(Math, children.map(function(){
						return $(this).outerHeight(false);
					}).get());
				}

				if(slider.viewport.css('box-sizing') == 'border-box'){
					height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
								parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
				}else if(slider.viewport.css('box-sizing') == 'padding-box'){
					height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
				}

				return height;
			}

			/**
			 * Returns the calculated width to be used for the outer wrapper / viewport
			 */
			var getViewportMaxWidth = function(){
				var width = '100%';
				if(slider.settings.slideWidth > 0){
					if(slider.settings.mode == 'horizontal'){
						width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
					}else{
						width = slider.settings.slideWidth;
					}
				}
				return width;
			}

			/**
			 * Returns the calculated width to be applied to each slide
			 */
			var calcSlideWidthidth = function(){
				// start with any user-supplied slide width
				var newElWidth = slider.settings.slideWidth;
				// get the current viewport width
				var wrapWidth = slider.viewport.width();
				// if slide width was not supplied, or is larger than the viewport use the viewport width
				if(slider.settings.slideWidth == 0 ||
					(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
					slider.settings.mode == 'vertical'){
					newElWidth = wrapWidth;
				// if carousel, use the thresholds to determine the width
				}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
					if(wrapWidth > slider.maxThreshold){
						// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
					}else if(wrapWidth < slider.minThreshold){
						newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
					}
				}
				return newElWidth;
			}

			/**
			 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
			 */
			var getNumberSlidesShowing = function(){
				var slidesShowing = 1;
				if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
					// if viewport is smaller than minThreshold, return minSlides
					if(slider.viewport.width() < slider.minThreshold){
						slidesShowing = slider.settings.minSlides;
					// if viewport is larger than minThreshold, return maxSlides
					}else if(slider.viewport.width() > slider.maxThreshold){
						slidesShowing = slider.settings.maxSlides;
					// if viewport is between min / max thresholds, divide viewport width by first child width
					}else{
						var childWidth = slider.children.first().width() + slider.settings.slideMargin;
						slidesShowing = Math.floor((slider.viewport.width() +
							slider.settings.slideMargin) / childWidth);
					}
				// if "vertical" mode, slides showing will always be minSlides
				}else if(slider.settings.mode == 'vertical'){
					slidesShowing = slider.settings.minSlides;
				}
				return slidesShowing;
			}

			/**
			 * Returns the number of pages (one full viewport of slides is one "page")
			 */
			var getPagerQty = function(){
				var pagerQty = 0;
				// if moveSlides is specified by the user
				if(slider.settings.moveSlides > 0){
					if(slider.settings.infiniteLoop){
						pagerQty = Math.ceil(slider.children.length / getMoveBy());
					}else{
						// use a while loop to determine pages
						var breakPoint = 0;
						var counter = 0
						// when breakpoint goes above children length, counter is the number of pages
						while (breakPoint < slider.children.length){
							++pagerQty;
							breakPoint = counter + getNumberSlidesShowing();
							counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
						}
					}
				// if moveSlides is 0 (auto) divide children length by sides showing, then round up
				}else{
					pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
				}
				return pagerQty;
			}

			/**
			 * Returns the number of indivual slides by which to shift the slider
			 */
			var getMoveBy = function(){
				// if moveSlides was set by the user and moveSlides is less than number of slides showing
				if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
					return slider.settings.moveSlides;
				}
				// if moveSlides is 0 (auto)
				return getNumberSlidesShowing();
			}

			/**
			 * Sets the slider's (el) left or top position
			 */
			var setSlidePosition = function(){
				// if last slide, not infinite loop, and number of children is larger than specified maxSlides
				if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
					if (slider.settings.mode == 'horizontal'){
						// get the last child's position
						var lastChild = slider.children.last();
						var position = lastChild.position();
						// set the left position
						setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
					}else if(slider.settings.mode == 'vertical'){
						// get the last showing index's position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						var position = slider.children.eq(lastShowingIndex).position();
						// set the top position
						setPositionProperty(-position.top, 'reset', 0);
					}
				// if not last slide
				}else{
					// get the position of the first showing slide
					var position = slider.children.eq(slider.active.index * getMoveBy()).position();
					// check for last slide
					if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
					// set the repective position
					if (position != undefined){
						if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
						else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
					}
				}
			}

			/**
			 * Sets the el's animating property position (which in turn will sometimes animate el).
			 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
			 *
			 * @param value (int)
			 *  - the animating property's value
			 *
			 * @param type (string) 'slider', 'reset', 'ticker'
			 *  - the type of instance for which the function is being
			 *
			 * @param duration (int)
			 *  - the amount of time (in ms) the transition should occupy
			 *
			 * @param params (array) optional
			 *  - an optional parameter containing any variables that need to be passed in
			 */
			var setPositionProperty = function(value, type, duration, params){
				// use CSS transform
				if(slider.usingCSS){
					// determine the translate3d value
					var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
					// add the CSS transition-duration
					el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
					if(type == 'slide'){
						// set the property value
						el.css(slider.animProp, propValue);
						// bind a callback method - executes when CSS transition completes
						el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
							// unbind the callback
							el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
							updateAfterSlideTransition();
						});
					}else if(type == 'reset'){
						el.css(slider.animProp, propValue);
					}else if(type == 'ticker'){
						// make the transition use 'linear'
						el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
						el.css(slider.animProp, propValue);
						// bind a callback method - executes when CSS transition completes
						el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
							// unbind the callback
							el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
							// reset the position
							setPositionProperty(params['resetValue'], 'reset', 0);
							// start the loop again
							tickerLoop();
						});
					}
				// use JS animate
				}else{
					var animateObj = {};
					animateObj[slider.animProp] = value;
					if(type == 'slide'){
						el.animate(animateObj, duration, slider.settings.easing, function(){
							updateAfterSlideTransition();
						});
					}else if(type == 'reset'){
						el.css(slider.animProp, value)
					}else if(type == 'ticker'){
						el.animate(animateObj, speed, 'linear', function(){
							setPositionProperty(params['resetValue'], 'reset', 0);
							// run the recursive loop after animation
							tickerLoop();
						});
					}
				}
			}

			/**
			 * Populates the pager with proper amount of pages
			 */
			var populatePager = function(){
				var pagerHtml = '';
				var pagerQty = getPagerQty();
				// loop through each pager item
				for(var i=0; i < pagerQty; i++){
					var linkContent = '';
					// if a buildPager function is supplied, use it to get pager link value, else use index + 1
					if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
						linkContent = slider.settings.buildPager(i);
						slider.pagerEl.addClass('bx-custom-pager');
					}else{
						linkContent = i + 1;
						slider.pagerEl.addClass('bx-default-pager');
					}
					// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
					// add the markup to the string
					pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
				};
				// populate the pager element with pager links
				slider.pagerEl.html(pagerHtml);
			}

			/**
			 * Appends the pager to the controls element
			 */
			var appendPager = function(){
				if(!slider.settings.pagerCustom){
					// create the pager DOM element
					slider.pagerEl = $('<div class="bx-pager" />');
					// if a pager selector was supplied, populate it with the pager
					if(slider.settings.pagerSelector){
						$(slider.settings.pagerSelector).html(slider.pagerEl);
					// if no pager selector was supplied, add it after the wrapper
					}else{
						slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
					}
					// populate the pager
					populatePager();
				}else{
					slider.pagerEl = $(slider.settings.pagerCustom);
				}
				// assign the pager click binding
				slider.pagerEl.on('click', 'a', clickPagerBind);
			}

			/**
			 * Appends prev / next controls to the controls element
			 */
			var appendControls = function(){
				slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
				slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
				// bind click actions to the controls
				slider.controls.next.bind('click', clickNextBind);
				slider.controls.prev.bind('click', clickPrevBind);
				// if nextSlector was supplied, populate it
				if(slider.settings.nextSelector){
					$(slider.settings.nextSelector).append(slider.controls.next);
				}
				// if prevSlector was supplied, populate it
				if(slider.settings.prevSelector){
					$(slider.settings.prevSelector).append(slider.controls.prev);
				}
				// if no custom selectors were supplied
				if(!slider.settings.nextSelector && !slider.settings.prevSelector){
					// add the controls to the DOM
					slider.controls.directionEl = $('<div class="bx-controls-direction" />');
					// add the control elements to the directionEl
					slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
					// slider.viewport.append(slider.controls.directionEl);
					slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
				}
			}

			/**
			 * Appends start / stop auto controls to the controls element
			 */
			var appendControlsAuto = function(){
				slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
				slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
				// add the controls to the DOM
				slider.controls.autoEl = $('<div class="bx-controls-auto" />');
				// bind click actions to the controls
				slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
				slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
				// if autoControlsCombine, insert only the "start" control
				if(slider.settings.autoControlsCombine){
					slider.controls.autoEl.append(slider.controls.start);
				// if autoControlsCombine is false, insert both controls
				}else{
					slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
				}
				// if auto controls selector was supplied, populate it with the controls
				if(slider.settings.autoControlsSelector){
					$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
				// if auto controls selector was not supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
				}
				// update the auto controls
				updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
			}

			/**
			 * Appends image captions to the DOM
			 */
			var appendCaptions = function(){
				// cycle through each child
				slider.children.each(function(index){
					// get the image title attribute
					var title = $(this).find('img:first').attr('title');
					// append the caption
					if (title != undefined && ('' + title).length) {
	                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
	                }
				});
			}

			/**
			 * Click next binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickNextBind = function(e){
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				el.goToNextSlide();
				e.preventDefault();
			}

			/**
			 * Click prev binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPrevBind = function(e){
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				el.goToPrevSlide();
				e.preventDefault();
			}

			/**
			 * Click start binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickStartBind = function(e){
				el.startAuto();
				e.preventDefault();
			}

			/**
			 * Click stop binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickStopBind = function(e){
				el.stopAuto();
				e.preventDefault();
			}

			/**
			 * Click pager binding
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var clickPagerBind = function(e){
				// if auto show is running, stop it
				if (slider.settings.auto) el.stopAuto();
				var pagerLink = $(e.currentTarget);
				if(pagerLink.attr('data-slide-index') !== undefined){
					var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
					// if clicked pager link is not active, continue with the goToSlide call
					if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
					e.preventDefault();
				}
			}

			/**
			 * Updates the pager links with an active class
			 *
			 * @param slideIndex (int)
			 *  - index of slide to make active
			 */
			var updatePagerActive = function(slideIndex){
				// if "short" pager type
				var len = slider.children.length; // nb of children
				if(slider.settings.pagerType == 'short'){
					if(slider.settings.maxSlides > 1) {
						len = Math.ceil(slider.children.length/slider.settings.maxSlides);
					}
					slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
					return;
				}
				// remove all pager active classes
				slider.pagerEl.find('a').removeClass('active');
				// apply the active class for all pagers
				slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
			}

			/**
			 * Performs needed actions after a slide transition
			 */
			var updateAfterSlideTransition = function(){
				// if infinte loop is true
				if(slider.settings.infiniteLoop){
					var position = '';
					// first slide
					if(slider.active.index == 0){
						// set the new position
						position = slider.children.eq(0).position();
					// carousel, last slide
					}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
						position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
					// last slide
					}else if(slider.active.index == slider.children.length - 1){
						position = slider.children.eq(slider.children.length - 1).position();
					}
					if(position){
						if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
						else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
					}
				}
				// declare that the transition is complete
				slider.working = false;
				// onSlideAfter callback
				slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}

			/**
			 * Updates the auto controls state (either active, or combined switch)
			 *
			 * @param state (string) "start", "stop"
			 *  - the new state of the auto show
			 */
			var updateAutoControls = function(state){
				// if autoControlsCombine is true, replace the current control with the new state
				if(slider.settings.autoControlsCombine){
					slider.controls.autoEl.html(slider.controls[state]);
				// if autoControlsCombine is false, apply the "active" class to the appropriate control
				}else{
					slider.controls.autoEl.find('a').removeClass('active');
					slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
				}
			}

			/**
			 * Updates the direction controls (checks if either should be hidden)
			 */
			var updateDirectionControls = function(){
				if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
					// if first slide
					if (slider.active.index == 0){
						slider.controls.prev.addClass('disabled');
						slider.controls.next.removeClass('disabled');
					// if last slide
					}else if(slider.active.index == getPagerQty() - 1){
						slider.controls.next.addClass('disabled');
						slider.controls.prev.removeClass('disabled');
					// if any slide in the middle
					}else{
						slider.controls.prev.removeClass('disabled');
						slider.controls.next.removeClass('disabled');
					}
				}
			}

			/**
			 * Initialzes the auto process
			 */
			var initAuto = function(){
				// if autoDelay was supplied, launch the auto show using a setTimeout() call
				if(slider.settings.autoDelay > 0){
					var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
				// if autoDelay was not supplied, start the auto show normally
				}else{
					el.startAuto();
				}
				// if autoHover is requested
				if(slider.settings.autoHover){
					// on el hover
					el.hover(function(){
						// if the auto show is currently playing (has an active interval)
						if(slider.interval){
							// stop the auto show and pass true agument which will prevent control update
							el.stopAuto(true);
							// create a new autoPaused value which will be used by the relative "mouseout" event
							slider.autoPaused = true;
						}
					}, function(){
						// if the autoPaused value was created be the prior "mouseover" event
						if(slider.autoPaused){
							// start the auto show and pass true agument which will prevent control update
							el.startAuto(true);
							// reset the autoPaused value
							slider.autoPaused = null;
						}
					});
				}
			}

			/**
			 * Initialzes the ticker process
			 */
			var initTicker = function(){
				var startPosition = 0;
				// if autoDirection is "next", append a clone of the entire slider
				if(slider.settings.autoDirection == 'next'){
					el.append(slider.children.clone().addClass('bx-clone'));
				// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
				}else{
					el.prepend(slider.children.clone().addClass('bx-clone'));
					var position = slider.children.first().position();
					startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
				}
				setPositionProperty(startPosition, 'reset', 0);
				// do not allow controls in ticker mode
				slider.settings.pager = false;
				slider.settings.controls = false;
				slider.settings.autoControls = false;
				// if autoHover is requested
				if(slider.settings.tickerHover && !slider.usingCSS){
					// on el hover
					slider.viewport.hover(function(){
						el.stop();
					}, function(){
						// calculate the total width of children (used to calculate the speed ratio)
						var totalDimens = 0;
						slider.children.each(function(index){
						  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
						});
						// calculate the speed ratio (used to determine the new speed to finish the paused animation)
						var ratio = slider.settings.speed / totalDimens;
						// determine which property to use
						var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
						// calculate the new speed
						var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
						tickerLoop(newSpeed);
					});
				}
				// start the ticker loop
				tickerLoop();
			}

			/**
			 * Runs a continuous loop, news ticker-style
			 */
			var tickerLoop = function(resumeSpeed){
				speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
				var position = {left: 0, top: 0};
				var reset = {left: 0, top: 0};
				// if "next" animate left position to last child, then reset left to 0
				if(slider.settings.autoDirection == 'next'){
					position = el.find('.bx-clone').first().position();
				// if "prev" animate left position to 0, then reset left to first non-clone child
				}else{
					reset = slider.children.first().position();
				}
				var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
				var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
				var params = {resetValue: resetValue};
				setPositionProperty(animateProperty, 'ticker', speed, params);
			}

			/**
			 * Initializes touch events
			 */
			var initTouch = function(){
				// initialize object to contain all touch values
				slider.touch = {
					start: {x: 0, y: 0},
					end: {x: 0, y: 0}
				}
				slider.viewport.bind('touchstart', onTouchStart);
			}

			/**
			 * Event handler for "touchstart"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchStart = function(e){
				if(slider.working){
					e.preventDefault();
				}else{
					// record the original position when touch starts
					slider.touch.originalPos = el.position();
					var orig = e.originalEvent;
					// record the starting touch x, y coordinates
					slider.touch.start.x = orig.changedTouches[0].pageX;
					slider.touch.start.y = orig.changedTouches[0].pageY;
					// bind a "touchmove" event to the viewport
					slider.viewport.bind('touchmove', onTouchMove);
					// bind a "touchend" event to the viewport
					slider.viewport.bind('touchend', onTouchEnd);
				}
			}

			/**
			 * Event handler for "touchmove"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchMove = function(e){
				var orig = e.originalEvent;
				// if scrolling on y axis, do not prevent default
				var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
				var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
				// x axis swipe
				if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
					e.preventDefault();
				// y axis swipe
				}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
					e.preventDefault();
				}
				if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
					var value = 0;
					// if horizontal, drag along x axis
					if(slider.settings.mode == 'horizontal'){
						var change = orig.changedTouches[0].pageX - slider.touch.start.x;
						value = slider.touch.originalPos.left + change;
					// if vertical, drag along y axis
					}else{
						var change = orig.changedTouches[0].pageY - slider.touch.start.y;
						value = slider.touch.originalPos.top + change;
					}
					setPositionProperty(value, 'reset', 0);
				}
			}

			/**
			 * Event handler for "touchend"
			 *
			 * @param e (event)
			 *  - DOM event object
			 */
			var onTouchEnd = function(e){
				slider.viewport.unbind('touchmove', onTouchMove);
				var orig = e.originalEvent;
				var value = 0;
				// record end x, y positions
				slider.touch.end.x = orig.changedTouches[0].pageX;
				slider.touch.end.y = orig.changedTouches[0].pageY;
				// if fade mode, check if absolute x distance clears the threshold
				if(slider.settings.mode == 'fade'){
					var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
					if(distance >= slider.settings.swipeThreshold){
						slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}
				// not fade mode
				}else{
					var distance = 0;
					// calculate distance and el's animate property
					if(slider.settings.mode == 'horizontal'){
						distance = slider.touch.end.x - slider.touch.start.x;
						value = slider.touch.originalPos.left;
					}else{
						distance = slider.touch.end.y - slider.touch.start.y;
						value = slider.touch.originalPos.top;
					}
					// if not infinite loop and first / last slide, do not attempt a slide transition
					if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
						setPositionProperty(value, 'reset', 200);
					}else{
						// check if distance clears threshold
						if(Math.abs(distance) >= slider.settings.swipeThreshold){
							distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
							el.stopAuto();
						}else{
							// el.animate(property, 200);
							setPositionProperty(value, 'reset', 200);
						}
					}
				}
				slider.viewport.unbind('touchend', onTouchEnd);
			}

			/**
			 * Window resize event callback
			 */
			var resizeWindow = function(e){
				// don't do anything if slider isn't initialized.
				if(!slider.initialized) return;
				// get the new window dimens (again, thank you IE)
				var windowWidthNew = $(window).width();
				var windowHeightNew = $(window).height();
				// make sure that it is a true window resize
				// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
				// are resized. Can you just die already?*
				if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
					// set the new window dimens
					windowWidth = windowWidthNew;
					windowHeight = windowHeightNew;
					// update all dynamic elements
					el.redrawSlider();
					// Call user resize handler
					slider.settings.onSliderResize.call(el, slider.active.index);
				}
			}

			/**
			 * ===================================================================================
			 * = PUBLIC FUNCTIONS
			 * ===================================================================================
			 */

			/**
			 * Performs slide transition to the specified slide
			 *
			 * @param slideIndex (int)
			 *  - the destination slide's index (zero-based)
			 *
			 * @param direction (string)
			 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
			 */
			el.goToSlide = function(slideIndex, direction){
				// if plugin is currently in motion, ignore request
				if(slider.working || slider.active.index == slideIndex) return;
				// declare that plugin is in motion
				slider.working = true;
				// store the old index
				slider.oldIndex = slider.active.index;
				// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
				if(slideIndex < 0){
					slider.active.index = getPagerQty() - 1;
				// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
				}else if(slideIndex >= getPagerQty()){
					slider.active.index = 0;
				// set active index to requested slide
				}else{
					slider.active.index = slideIndex;
				}
				// onSlideBefore, onSlideNext, onSlidePrev callbacks
				slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				if(direction == 'next'){
					slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				}else if(direction == 'prev'){
					slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
				}
				// check if last slide
				slider.active.last = slider.active.index >= getPagerQty() - 1;
				// update the pager with active class
				if(slider.settings.pager) updatePagerActive(slider.active.index);
				// // check for direction control update
				if(slider.settings.controls) updateDirectionControls();
				// if slider is set to mode: "fade"
				if(slider.settings.mode == 'fade'){
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
						slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
					}
					// fade out the visible child and reset its z-index value
					slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
					// fade in the newly requested slide
					slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
						$(this).css('zIndex', slider.settings.slideZIndex);
						updateAfterSlideTransition();
					});
				// slider mode is not "fade"
				}else{
					// if adaptiveHeight is true and next height is different from current height, animate to the new height
					if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
						slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
					}
					var moveBy = 0;
					var position = {left: 0, top: 0};
					// if carousel and not infinite loop
					if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
						if(slider.settings.mode == 'horizontal'){
							// get the last child position
							var lastChild = slider.children.eq(slider.children.length - 1);
							position = lastChild.position();
							// calculate the position of the last slide
							moveBy = slider.viewport.width() - lastChild.outerWidth();
						}else{
							// get last showing index position
							var lastShowingIndex = slider.children.length - slider.settings.minSlides;
							position = slider.children.eq(lastShowingIndex).position();
						}
						// horizontal carousel, going previous while on first slide (infiniteLoop mode)
					}else if(slider.carousel && slider.active.last && direction == 'prev'){
						// get the last child position
						var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
						var lastChild = el.children('.bx-clone').eq(eq);
						position = lastChild.position();
					// if infinite loop and "Next" is clicked on the last slide
					}else if(direction == 'next' && slider.active.index == 0){
						// get the last clone position
						position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
						slider.active.last = false;
					// normal non-zero requests
					}else if(slideIndex >= 0){
						var requestEl = slideIndex * getMoveBy();
						position = slider.children.eq(requestEl).position();
					}

					/* If the position doesn't exist
					 * (e.g. if you destroy the slider on a next click),
					 * it doesn't throw an error.
					 */
					if ("undefined" !== typeof(position)) {
						var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
						// plugin values to be animated
						setPositionProperty(value, 'slide', slider.settings.speed);
					}
				}
			}

			/**
			 * Transitions to the next slide in the show
			 */
			el.goToNextSlide = function(){
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.last) return;
				var pagerIndex = parseInt(slider.active.index) + 1;
				el.goToSlide(pagerIndex, 'next');
			}

			/**
			 * Transitions to the prev slide in the show
			 */
			el.goToPrevSlide = function(){
				// if infiniteLoop is false and last page is showing, disregard call
				if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
				var pagerIndex = parseInt(slider.active.index) - 1;
				el.goToSlide(pagerIndex, 'prev');
			}

			/**
			 * Starts the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.startAuto = function(preventControlUpdate){
				// if an interval already exists, disregard call
				if(slider.interval) return;
				// create an interval
				slider.interval = setInterval(function(){
					slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
				}, slider.settings.pause);
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
			}

			/**
			 * Stops the auto show
			 *
			 * @param preventControlUpdate (boolean)
			 *  - if true, auto controls state will not be updated
			 */
			el.stopAuto = function(preventControlUpdate){
				// if no interval exists, disregard call
				if(!slider.interval) return;
				// clear the interval
				clearInterval(slider.interval);
				slider.interval = null;
				// if auto controls are displayed and preventControlUpdate is not true
				if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
			}

			/**
			 * Returns current slide index (zero-based)
			 */
			el.getCurrentSlide = function(){
				return slider.active.index;
			}

			/**
			 * Returns current slide element
			 */
			el.getCurrentSlideElement = function(){
				return slider.children.eq(slider.active.index);
			}

			/**
			 * Returns number of slides in show
			 */
			el.getSlideCount = function(){
				return slider.children.length;
			}

			/**
			 * Update all dynamic slider elements
			 */
			el.redrawSlider = function(){
				// resize all children in ratio to new screen size
				slider.children.add(el.find('.bx-clone')).width(calcSlideWidthidth());
				// adjust the height
				slider.viewport.css('height', getViewportHeight());
				// update the slide position
				if(!slider.settings.ticker) setSlidePosition();
				// if active.last was true before the screen resize, we want
				// to keep it last no matter what screen size we end on
				if (slider.active.last) slider.active.index = getPagerQty() - 1;
				// if the active index (page) no longer exists due to the resize, simply set the index as last
				if (slider.active.index >= getPagerQty()) slider.active.last = true;
				// if a pager is being displayed and a custom pager is not being used, update it
				if(slider.settings.pager && !slider.settings.pagerCustom){
					populatePager();
					updatePagerActive(slider.active.index);
				}
			}

			/**
			 * Destroy the current instance of the slider (revert everything back to original state)
			 */
			el.destroySlider = function(){
				// don't do anything if slider has already been destroyed
				if(!slider.initialized) return;
				slider.initialized = false;
				$('.bx-clone', this).remove();
				slider.children.each(function() {
					$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
				});
				$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
				$(this).unwrap().unwrap();
				if(slider.controls.el) slider.controls.el.remove();
				if(slider.controls.next) slider.controls.next.remove();
				if(slider.controls.prev) slider.controls.prev.remove();
				if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
				$('.bx-caption', this).remove();
				if(slider.controls.autoEl) slider.controls.autoEl.remove();
				clearInterval(slider.interval);
				if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
			}

			/**
			 * Reload the slider (revert all DOM changes, and re-initialize)
			 */
			el.reloadSlider = function(settings){
				if (settings != undefined) options = settings;
				el.destroySlider();
				init();
			}

			/**
			 * auto reload functionality
			 */
	    $(window).resize(function() {
	      if(slider.settings.autoReload) {
	        el.reloadSlider();
	      }
	    });

			init();

			// returns the current jQuery object
			return this;
		}

	})(jQuery);


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 *
	 * Form Validation
	 * jquery.validation.js
	 *
	 * Copyright 2014, Stewart Dellow
	 * Some information on the license.
	 *
	 * $('.form').validation();
	 *
	 * Setting Error Messages:
	 * If no error message is set a generic one will be used (this can be changed in options). You can set an error message by
	 * one of two ways. Either by using the `data-validation-message` HTML attribute on the field in question or by entering
	 * a validation message in a hidden HTML element. You must pass the class of this HTML element in the options. The default
	 * element is: $('.error-message').
	 *
	 * Callback:
	 * You can supply a callback function which is called on success in the options like so:
	 *      $('.js-validate').validation({
	 *          ...
	 *          successCallback  : function(parameters){
	 *              console.log(parameters);
	 *          }
	 *      });
	 * If you are using server validation, the `parameters` argument will supply the results of the validation.
	 *
	 *
	 * domains                 : Array. Adds to default array of top level domains for the email checker to spell check against.
	 * localStorage            : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
	 * serverValidation        : Boolean. Whether to use server validation or not.
	 * disableAjax             : Boolean. Disables AJAX. serverValidation must be false.
	 * onlyVisibleFields       : Boolean. Whether to only validate against visible fields or not.
	 * appendErrorToPlaceholder: Boolean. Append the error message to the form field placeholder.
	 * disableButtons          : Boolean. Disable the form buttons while processing.
	 * scrollToError           : Boolean. If enabled animates a scroll to the first field with an error.
	 * fadeOutAnimationSpeed   : Integer. Speed to fade out the form on success.
	 * serverID                : String. Post var to send to server side to identify AJAX response.
	 * emailRegEx              : String. RegEx to check email addresses against.
	 * passRegEx               : String. RegEx to check passwords against.
	 * urlRegEx                : String. RegEx to check URLs against.
	 * errorBoxClass           : String. Class to apply to the error box.
	 * errorClass              : String. Class to apply to fields with an error.
	 * msgSep                  : String. Used to separate the field label and the error message.
	 * defaultErrorMsg         : String. Field error message if one isn't supplied in the HTML.
	 * defaultSuccessMsg       : String. Form success message if one isn't supplied in the HTML.
	 * defaultSuggestText      : String. Email suggestion text.
	 * errorBoxElement         : String. HTML element type that wraps the error message.
	 * preloaderTemplate       : String. HTML template for the preloader. Can include inline styles or use in external stylesheet.
	 * validateElement         : jQuery Element. A valid jQuery element to specify fields that aren't required but should be validated if entered.
	 * successElement          : jQuery Element. A valid jQuery element that holds the success message.
	 * customValidationMethod  : Function. Function containing any custom methods to validate against. Must return the element.
	 * successCallback         : Function. Function to be called on success of validation. Provides array of fields as parameter if using server validation.
	 *
	**/

	;(function($, window, undefined){
	    'use strict';

	    // Email suggester object.
	    var suggester = {};

	    // Set helpers.
	    var helpers = {};

	    /**
	     * Plugin
	     * Return a unique plugin instance.
	    **/
	    var Plugin = function(elem, options){
	        this.elem     = elem;
	        this.$elem    = $(elem);
	        this.options  = options;
	        this.metadata = this.$elem.data('plugin-options');
	    }

	    /**
	     * $.fn.validation
	     * Return a unique plugin instance.
	    **/
	    $.fn.validation = function(options){
	        return this.each(function(){
	            new Plugin(this, options).init();
	        });
	    };

	    /**
	     * $.fn.validation.defaults
	     * Default options.
	    **/
	    $.fn.validation.defaults = {
	        domains                 : [],
	        localStorage            : true,
	        serverValidation        : true,
	        disableAjax             : false,
	        onlyVisibleFields       : false,
	        appendErrorToPlaceholder: false,
	        disableButtons          : false,
	        scrollToError           : false,
	        fadeOutAnimationSpeed   : 500,
	        serverID                : 'ajaxrequest',
	        emailRegEx              : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	        passRegEx               : /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
	        urlRegEx                : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
	        errorBoxClass           : 'js-validation-error',
	        errorClass              : 'js-validation-field-error',
	        msgSep                  : ' -',
	        defaultErrorMsg         : 'Please enter a value',
	        defaultSuccessMsg       : 'The form has been successfully submitted.',
	        defaultSuggestText      : 'Did you mean',
	        errorBoxElement         : '<span/>',
	        preloaderTemplate       : '<div class="loader" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#FFFFFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
	        validateElement         : $('.js-validation-validate'),
	        successElement          : $('.js-validation-form-success'),
	        customValidationMethod  : null,
	        successCallback         : function(parameters){}
	    };

	    /**
	     * Plugin.prototype
	     * Init.
	    **/
	    Plugin.prototype = {
	        init: function(){
	            // this
	            var _self = this;

	            // Global settings.
	            _self.settings = $.extend({}, $.fn.validation.defaults, _self.options);
	            // Global arrays
	            _self.error_array; _self.group_array;
	            // Action for the form.
	            _self.form_action = (_self.$elem.data('action')) ? _self.$elem.data('action') : _self.$elem.attr('action');
	            // Cache fields.
	            _self.fields      = $('input, select, textarea', _self.$elem);
	            // Cache the reset button element.
	            _self.reset       = $('button[type="reset"], input[type="reset"]', _self.$elem);
	            // Cache the submit button element.
	            _self.button      = $('button[type="submit"], input[type="submit"]', _self.$elem);
	            // Success element.
	            _self.success_element = (_self.settings.successElement.length) ? _self.settings.successElement : _self.$elem.before($('<div class="js-validation-form-success">' + _self.settings.defaultSuccessMsg + '</div>'));
	            // Empty array for elements. Set once the form is submitted.
	            _self.$element_array = [];

	            // Do jQuery event binds.
	            _self.binds();
	            // Run the plugin.
	            _self.run();

	            return _self;
	        },
	        binds: function(){
	            var _self = this;

	            // On submit.
	            _self.$elem.on('submit', function(e){
	                e.preventDefault();

	                _self.set_fields();
	                _self.process();
	            });
	            // On reset.
	            _self.reset.on('click', function(e){
	                _self.validation_reset(e);
	            });
	            // On field change.
	            _self.fields.change(function(){
	                _self.save_to_localStorage($(this));
	            });
	        },
	        run: function(){
	            // Add 'novalidate' attribute to form.
	            this.$elem.attr('novalidate', 'novalidate');
	            // Process fields.
	            this.process_fields();
	            // Get localStorage.
	            this.get_localStorage();
	        },
	        set_fields: function(){
	            var _self = this;

	            // Put all required fields into array.
	            var fields_array = $('[required]', _self.$elem).map(function(){
	                if(_self.settings.onlyVisibleFields){
	                    if($(this).is(':visible')){
	                        return $(this).attr('name');
	                    }
	                }
	                else{
	                    return $(this).attr('name');
	                }
	            });
	            // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
	            fields_array = helpers.remove_duplicates(fields_array);
	            // Reverts the fields_array into an array of DOM elements.
	            _self.$element_array = $.map(fields_array, function(field, i){
	                return $('[name="' + field + '"]', _self.$elem);
	            });
	        },
	        process_fields: function(){
	            var _self = this;

	            // Put all required fields into array.
	            var fields_array = $('[required]', _self.$elem).map(function(){
	                if(_self.settings.onlyVisibleFields){
	                    if($(this).is(':visible')){
	                        return $(this).attr('name');
	                    }
	                }
	                else{
	                    return $(this).attr('name');
	                }
	            });
	            // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
	            fields_array = helpers.remove_duplicates(fields_array);
	            // Reverts the fields_array into an array of DOM elements.
	            _self.$element_array = $.map(fields_array, function(field, i){
	                return $('[name="' + field + '"]', _self.$elem);
	            });

	            $.each(_self.$element_array, function(){
	                // Field type specific actions.
	                switch($(this).attr('type')){
	                    case 'email':
	                        _self.setup_email_field($(this));
	                    break;
	                    case 'url':
	                        _self.setup_url_field($(this));
	                    break;
	                }
	            });
	        },
	        setup: function(){
	            // Global error array.
	            this.error_array = [];
	            // Create an array for checkboxes and radio inputs.
	            this.group_array = [];
	            // Create an array for messages that have no fields.
	            this.leftovers = [];
	        },
	        ajax_request: function(url, request){
	            return $.ajax({
	                type    : 'POST',
	                url     : url,
	                data    : request,
	                dataType: 'JSON'
	            });
	        },
	        apply_preloader: function(el){
	            // Content.
	            var content = JSON.stringify(el.html());
	            // Loader.
	            var loader = $(this.settings.preloaderTemplate).hide();
	            // Apply preloader.
	            el.css({
	                'width'   : el.outerWidth(),
	                'height'  : el.outerHeight(),
	                'position': 'relative'
	            }).html(loader).attr('data-loader-content', content).addClass('loading');
	            loader.css({
	                'position'   : 'absolute',
	                'top'        : '50%',
	                'left'       : '50%',
	                'margin-left': -loader.outerWidth() / 2,
	                'margin-top' : -loader.outerHeight() / 2
	            }).show();
	        },
	        destroy_preloader: function(el){
	            // Content.
	            var content = JSON.parse(el.data('loader-content'));
	            // Remove preloader
	            el.removeClass('loading').html(content).removeAttr('data-loader-content').css({
	                'width'   : '',
	                'height'  : '',
	                'position':''
	            });
	        },
	        disable_button: function(disable){
	            if(this.settings.disableButtons){
	                // Disable
	                if(disable){
	                    // Disable the submit button.
	                    this.button.prop('disabled', true);
	                }
	                else{
	                    // Enable the submit button.
	                    this.button.prop('disabled', false);
	                }
	            }
	        },
	        clear_localStorage: function(){
	            this.fields.each(function(){
	                localStorage.removeItem($(this).attr('name'));
	            });
	        },
	        get_localStorage: function(){
	            if(this.settings.localStorage && typeof(Storage) !== 'undefined'){
	                this.fields.each(function(){
	                    // Vars
	                    var input_name = $(this).attr('name');

	                    if(localStorage[input_name]){
	                        if($(this).is('select')){
	                            $('option[selected="selected"]', this).removeAttr('selected');
	                            $('option[value="' + localStorage[input_name] + '"]', this).prop('selected', true);
	                        }
	                        else if($(this).is('input[type="radio"]')){
	                            if($(this).val() == localStorage[input_name]){
	                                $(this).prop('checked', true);
	                            }
	                        }
	                        else if($(this).is('input[type="checkbox"]')){
	                            var checkboxes = localStorage[input_name].split(',');
	                            $('input[name="' + input_name + '"]').each(function(i){
	                                if(checkboxes[i] != '' && $(this).val() == checkboxes[i]){
	                                    $(this).prop('checked', true);
	                                }
	                            });
	                        }
	                        else{
	                            $(this).val(localStorage[input_name]);
	                        }
	                    };
	                });
	            }
	        },
	        save_to_localStorage: function(el){
	            if(this.settings.localStorage && typeof(Storage) !== 'undefined'){
	                // Vars
	                var input_name = el.attr('name');

	                if(el.is('input[type="checkbox"]')){
	                    // Vars
	                    var checkbox_array = [];

	                    $('input[name="' + input_name + '"]').each(function(i){
	                        if($(this).is(':checked')){
	                            checkbox_array.push($(this).val());
	                        }
	                        else{
	                            checkbox_array.push('');
	                        }
	                    });
	                    localStorage[input_name] = checkbox_array;
	                }
	                else{
	                    localStorage[input_name] = el.val();
	                }
	            }
	        },
	        setup_email_field: function(el){
	            var _self = this;

	            el.after($('<div class="js-validation-suggestion">' + _self.settings.defaultSuggestText + ' <a href="#" class="js-validation-alternative-email"><span class="js-validation-address">address</span>@<span class="js-validation-domain">domain.com</span></a>?</div>'));

	            el.on('blur', function(){
	                suggester.init(_self, el, _self.settings.domains);
	            });
	        },
	        setup_url_field: function(el){
	            el.on('blur', function(){
	                var value = el.val();
	                if(value !== '' && !value.match(/^http([s]?):\/\/.*/)){
	                    el.val('http://' + value);
	                }
	            });
	        },
	        reset_errors: function(form){
	            // Set form.
	            form = (typeof form !== 'undefined') ? form : this;
	            // Remove error class from form.
	            form.$elem.removeClass('js-validation-form-has-errors');
	            // Remove generic form messages.
	            $('.js-validation-form-messages').empty();
	            // Remove error class from fields.
	            $('.js-validation-field-has-errors', form.$elem).removeClass('js-validation-field-has-errors');
	            // Remove error class from fieldsets.
	            $('.js-validation-fieldset-has-errors', form.$elem).removeClass('js-validation-fieldset-has-errors');
	            // Remove error class from inputs with placeholder error..
	            $('.js-validation-field--placeholder', form.$elem).removeClass('js-validation-field--placeholder');
	            $('.js-validation-field--placeholder--span', form.$elem).remove();
	            // Hide email suggester.
	            $('.js-validation-suggestion', form.$elem).hide();
	            // Remove current classes.
	            $('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass);
	            $('.' + form.settings.errorBoxClass, form.$elem).remove();
	        },
	        attach_errors: function(arr){
	            var _self = this;

	            // Remove empty elements.
	            arr = jQuery.grep(arr, function(n, i){
	              return (n !== "" && n != null);
	            });
	            // Remove previous errors.
	            _self.reset_errors();
	            // Un-disable stuff.
	            _self.disable_button(false);
	            // Add error class to form.
	            _self.$elem.addClass('js-validation-form-has-errors');
	            // Add new ones.
	            $.each(arr, function(index){
	                if($(this) == undefined){return;}
	                var a = $(this),
	                    el = a[0].input;

	                // Get error message.
	                var error = (a[0].msg !== '') ? a[0].msg : _self.settings.defaultErrorMsg;
	                // Separator.
	                var message = (_self.settings.msgSep) ? (error) ? _self.settings.msgSep + ' <span class="js-validation-msg">' + error + '</span>' : '' : '<span class="js-validation-msg">' + error + '</span>';

	                // Check element exists in the DOM.
	                if(el.length && el.is(':input') && el.attr('type') !== 'hidden'){
	                    // Apply error class to field.
	                    el.addClass(_self.settings.errorClass).parent('.obj-form-field').addClass('js-validation-field-has-errors');
	                    // Field specific actions.
	                    if(el.attr('type') === 'checkbox' || el.attr('type') === 'radio'){
	                        // Add error element to field.
	                        el.closest('.obj-form-field').find('label, .label').first().append($(_self.settings.errorBoxElement).addClass(_self.settings.errorBoxClass).html(message));
	                        // Apply to nearest label if checkbox or radio.
	                        el.closest('label').addClass(_self.settings.errorClass);
	                    }
	                    else{
	                        if(_self.settings.appendErrorToPlaceholder){
	                            // Find label.
	                            el.parent().find('label, .label').addClass(_self.settings.errorClass);
	                            // Check value length.
	                            if(el.val().length > 0){
	                                // Add error class to placeholder.
	                                el.parent('.obj-form-field').addClass('js-validation-field--placeholder');
	                                // Add a span to the field.
	                                el.before('<span class="js-validation-field--placeholder--span">' + error + '</span>');
	                            }
	                            else{
	                                // Add error to placeholder.
	                                el.attr('placeholder', error);
	                            }
	                        }
	                        else{
	                            // Add error element to field.
	                            el.parent().find('label, .label').append($(_self.settings.errorBoxElement).addClass(_self.settings.errorBoxClass).html(message));
	                        }
	                    }
	                    // Set errors on fieldset.
	                    el.closest('fieldset').addClass('js-validation-fieldset-has-errors');
	                    // Scroll to first error field.
	                    if(index == 0 && _self.settings.scrollToError){
	                        // Determine fieldset.
	                        var fieldset = el.parentsUntil('fieldset').parent();
	                        // Check if el has parent fieldset.
	                        if(fieldset.length){
	                            $('html, body').animate({
	                                scrollTop: (fieldset.offset().top - 25)
	                            }, 500);
	                        }
	                        else{
	                            $('html, body').animate({
	                                scrollTop: (el.offset().top - 25)
	                            }, 500);
	                        }
	                    }
	                }
	                else if(!el.is(':input')){
	                    el.prepend('<p>' + error + '</p>').show();
	                }
	                else{
	                    _self.leftovers.push(error);
	                }
	            });
	        },
	        field_checker: function(field){
	            var _self = this;
	            var obj;
	            var msg = field.data('validation-message') || '';

	            // Checkboxes and radio.
	            if((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0){
	                return obj = {
	                    input: field,
	                    msg  : msg
	                }
	            }
	            // Email fields.
	            else if(field.attr('type') === 'email' && !_self.settings.emailRegEx.test(field.val())){
	                return obj = {
	                    input: field,
	                    msg  : msg
	                }
	            }
	            // URL fields.
	            else if(field.attr('type') === 'url' && !_self.settings.urlRegEx.test(field.val())){
	                return obj = {
	                    input: field,
	                    msg  : msg
	                }
	            }
	            // Check for existence.
	            else if(field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-'){
	                return obj = {
	                    input: field,
	                    msg  : msg
	                }
	            }
	        },
	        js_validate_fields: function(){
	            var _self = this;

	            // Put all empty fields into array.
	            _self.error_array = $.map(_self.$element_array, function(field, i){
	                return _self.field_checker(field);
	            });
	            // Custom validation method.
	            if($.isFunction(_self.settings.customValidationMethod)){
	                _self.error_array.push(_self.settings.customValidationMethod());
	            }
	            // Validate non required fields with length.
	            _self.$elem.find(_self.settings.validateElement).each(function(){
	                if($(this).val() !== ''){
	                    _self.error_array.push(_self.field_checker($(this)));
	                }
	            });

	            // Array of elements for the callback.
	            var parameters = null;

	            // Outcome.
	            if(_self.error_array.length === 0){
	                _self.success('js', parameters);
	            }
	            else{
	                _self.validation_error();
	            }
	        },
	        server_validate_fields: function(){
	            var _self = this;

	            // Check for a form action.
	            if(_self.form_action !== ''){
	                // Set flag.
	                var fatalerror = false;
	                // Ajax request.
	                var ajax_promise = _self.ajax_request(_self.form_action, _self.$elem.serialize() + '&' + _self.settings.serverID + '=true');

	                // Process promise.
	                ajax_promise.done(function(xhr){
	                    // If error.
	                    if(xhr.type == 'error'){
	                        if(typeof xhr.field !== 'undefined'){
	                            var obj = {
	                                input: (xhr.field.indexOf('.') === 0) ? $(xhr.field) : $('[name="' + xhr.field + '"]', _self.$elem),
	                                msg  : (typeof xhr.response !== 'undefined') ? xhr.response : xhr.responses[i]
	                            }
	                            _self.error_array.push(obj);
	                        }
	                        else{
	                            // Loops through the response and adds them to the error_array.
	                            for(var i = 0, ii = xhr.fields.length; i < ii; i++){
	                                var obj = {
	                                    input: (xhr.field.indexOf('.') === 0) ? $(xhr.field) : $('[name="' + xhr.fields[i] + '"]', _self.$elem),
	                                    msg  : (typeof xhr.response !== 'undefined') ? xhr.response : xhr.responses[i]
	                                }
	                                _self.error_array.push(obj);
	                            }
	                        }
	                    }

	                    // Array of elements for the callback.
	                    var parameters = _self.$elem.serializeArray();

	                    // Outcome.
	                    if(_self.error_array.length === 0 && !fatalerror){
	                        _self.success('server', parameters);
	                    }
	                    else{
	                        _self.validation_error();
	                    }
	                }).fail(function(xhr, ajaxOptions, thrownError){
	                    // Log it.
	                    helpers.log(xhr);
	                    helpers.log(thrownError);
	                    // Set error.
	                    fatalerror = true;
	                });
	            }
	            // No form action.
	            else{
	                // Error message.
	                helpers.log("You must have an action defined on your form in order to use server validation.");

	                return false;
	            }
	        },
	        success: function(type, callback_parameters){
	            var _self = this;

	            // Clear localStorage.
	            _self.clear_localStorage();
	            // If we have a custom post function.
	            if(type == 'server'){
	                _self.$elem.fadeOut(_self.settings.fadeOutAnimationSpeed, function(){
	                    // Validation Complete.
	                    _self.validation_success();
	                    // Fade in success element.
	                    _self.$elem.parent().find(_self.success_element).fadeIn((_self.settings.fadeOutAnimationSpeed / 2));
	                    // Callback
	                    _self.settings.successCallback.call(_self, callback_parameters);
	                });
	            }
	            else if(!_self.settings.disableAjax && type == 'js'){
	                // Ajax request.
	                var ajax_promise = _self.ajax_request(_self.form_action, _self.$elem.serialize() + '&' + _self.settings.serverID + '=true');

	                // Process promise.
	                ajax_promise.always(function(response){
	                    _self.$elem.fadeOut(_self.settings.fadeOutAnimationSpeed, function(){
	                        // Validation Complete.
	                        _self.validation_success();
	                        // Fade in success element.
	                        _self.$elem.parent().find(_self.success_element).fadeIn((_self.settings.fadeOutAnimationSpeed / 2));
	                        // Callback
	                        _self.settings.successCallback.call(_self, callback_parameters);
	                    });
	                });
	            }
	            else{
	                // Unbind submit.
	                _self.$elem.unbind('submit');
	                // Validation Complete.
	                _self.validation_success();
	                // Callback
	                _self.settings.successCallback.call(_self, callback_parameters);
	                // Trigger submit after unbind.
	                _self.$elem.trigger('submit');
	            }
	        },
	        process: function(){
	            // Apply preloader.
	            this.apply_preloader(this.button);
	            // Disable stuff.
	            this.disable_button(true);
	            // Run setup this.
	            this.setup();
	            // If we are doing server validation.
	            if(this.settings.serverValidation){
	                this.server_validate_fields();
	            }
	            // If we are not doing server validation check if form has passed validation.
	            else if(!this.settings.serverValidation){
	                this.js_validate_fields();
	            }
	        },
	        validation_success: function(){
	            // Destroy preloader.
	            this.destroy_preloader(this.button);
	            // Reset validation.
	            this.validation_reset();
	        },
	        validation_error: function(){
	            var _self = this;

	            // Process for 0.5 second.
	            setTimeout(function(){
	                // Set errors
	                _self.attach_errors(_self.error_array, _self.$elem);
	                // Destroy preloader.
	                _self.destroy_preloader(_self.button);
	            }, 500);
	        },
	        validation_reset: function(){
	            // Destroy preloader.
	            this.destroy_preloader(this.button);
	            // Un-disable stuff.
	            this.disable_button(false);
	            // Remove errors.
	            this.reset_errors();
	            // Clear localStorage.
	            this.clear_localStorage();
	            // Reset all field values.
	            this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('');
	        }
	    }

	    /**
	     * suggester.init
	     * NULLED.
	    **/
	    suggester.init = function(form, el, plugin_domains){
	        // Default domains
	        var default_domains = [
	            'aol.com',
	            'bellsouth.net',
	            'btinternet.com',
	            'btopenworld.com',
	            'blueyonder.co.uk',
	            'comcast.net',
	            'cox.net',
	            'gmail.com',
	            'google.com',
	            'googlemail.com',
	            'hotmail.co.uk',
	            'hotmail.com',
	            'hotmail.fr',
	            'hotmail.it',
	            'icloud.com',
	            'live.com',
	            'mac.com',
	            'mail.com',
	            'me.com',
	            'msn.com',
	            'o2.co.uk',
	            'orange.co.uk',
	            'outlook.com',
	            'outlook.co.uk',
	            'sbcglobal.net',
	            'verizon.net',
	            'virginmedia.com',
	            'yahoo.com',
	            'yahoo.co.uk',
	            'yahoo.com.tw',
	            'yahoo.es',
	            'yahoo.fr'
	        ];
	        // Extend the domains array with those from the plugin settings.
	        this.domains = $.extend(true, default_domains, plugin_domains);

	        var email_val = el.val(),
	            match_val = suggester.get_match(email_val);

	        this.suggestion = el.next('.js-validation-suggestion');
	        this.reveal_suggestion(form, el, match_val);
	    }

	    /**
	     * suggester.get_match
	     * NULLED.
	    **/
	    suggester.get_match = function(query){
	        var limit   = 99,
	            query   = query.split('@');

	        for(var i = 0, ii = this.domains.length; i < ii; i++){
	            var distance = suggester.levenshtein_distance(this.domains[i], query[1]);
	            if(distance < limit){
	                limit = distance;
	                var domain = this.domains[i];
	            }
	        }
	        if(limit <= 2 && domain !== null && domain !== query[1]){
	            return{
	                address: query[0],
	                domain: domain
	            }
	        }
	        else{
	            return false;
	        }
	    }

	    /**
	     * suggester.levenshtein_distance
	     * NULLED.
	    **/
	    suggester.levenshtein_distance = function(a, b){
	        var c = 0,
	            d = 0,
	            e = 0,
	            f = 0,
	            g = 5;

	        if(a == null || a.length === 0){
	            if(b == null || b.length === 0){
	                return 0
	            }
	            else{
	                return b.length
	            }
	        }
	        if(b == null || b.length === 0){
	            return a.length
	        }

	        while(c + d < a.length && c + e < b.length){
	            if(a[c + d] == b[c + e]){
	                f++
	            }
	            else{
	                d = 0;
	                e = 0;
	                for(var h = 0; h < g; h++){
	                    if(c + h < a.length && a[c + h] == b[c]){
	                        d = h;
	                        break
	                    }
	                    if(c + h < b.length && a[c] == b[c + h]){
	                        e = h;
	                        break
	                    }
	                }
	            }
	            c++
	        }
	        return (a.length + b.length) / 2 - f
	    }

	    /**
	     * suggester.reveal_suggestion
	     * NULLED.
	    **/
	    suggester.reveal_suggestion = function(form, el, result){
	        if(result){
	            Plugin.prototype.reset_errors(form);
	            // Set email address.
	            $('.js-validation-address', this.suggestion).text(result.address);
	            // Set email domain.
	            $('.js-validation-domain', this.suggestion).text(result.domain);
	            // Reveal suggestion.
	            this.suggestion.stop(true, false).slideDown(350);
	            // Click event.
	            $('.js-validation-alternative-email').on('click', function(e){
	                e.preventDefault();

	                // Apply suggestion.
	                el.val(result.address + '@' + result.domain);
	                // Hide suggestion.
	                suggester.suggestion.stop(true, false).slideUp(350);
	            });
	        }
	    }

	    /**
	     * helpers.remove_duplicates
	     * Remove duplicates from an array.
	    **/
	    helpers.remove_duplicates = function(array){
	        var result = [];
	        $.each(array, function(i, e){
	            if($.inArray(e, result) == -1){
	                result.push(e);
	            }
	        });

	        return result;
	    }

	    /**
	     * helpers.log
	     * Returns a cross-browser safe message in the console.
	    **/
	    helpers.log = function(message, alertlog){
	        alertlog = (typeof alertlog === 'undefined') ? false : true;
	        if(typeof console === 'undefined' || typeof console.log === 'undefined'){
	            if(alertlog){
	                alert(message);
	            }
	        }
	        else {
	            console.log(message);
	        }
	    }

	})(jQuery, window);


/***/ },
/* 6 */
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

/***/ },
/* 7 */
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
	    failSilently: false
	  }

	  /**
	   * events
	   * Events for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.events = function () {
	    var _this = this

	    // Extend the events system.
	    global.Public.events.extend({
	      events: {
	        'change .js--dynamic-dom': 'updateDOM'
	      },
	      updateDOM: function (e) {
	        e[0].preventDefault()

	        // Get value.
	        var value = $(e[0].currentTarget).val()
	        // Get DOM target.
	        var target = $(e[0].currentTarget).data('dynamic-dom') || false

	        return (target && $(target).length) ? _this.updateTarget(value, $(target)) : _this.reportNoTarget()
	      }
	    })
	  }

	  /**
	   * updateTarget
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.updateTarget = function (value, $target) {
	    return $target.html(value)
	  }

	  /**
	   * reportNoTarget
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module.prototype.reportNoTarget = function () {
	    return (!this.settings.failSilently) ? window.Helpers.throw('No DOM target specified.') : null
	  }

	  // Export
	  module.exports = new Module()
	}(function () {}, window))

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);