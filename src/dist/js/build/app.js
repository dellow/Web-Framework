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

	'use strict';

	var _navigo = __webpack_require__(1);

	var _navigo2 = _interopRequireDefault(_navigo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (App, window) {
	  /**
	   * App
	   * Constructor for App.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  App = function App() {};

	  /**
	   * init
	   * Module init method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  App.prototype.init = function () {
	    this.routes();
	  };

	  /**
	   * plugins
	   * Module plugins method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  App.prototype.plugins = {
	    equalElementHeights: function equalElementHeights(el) {
	      // DOM check.
	      if (!el.length) return;

	      // Get plugin.
	      __webpack_require__(2);
	      // Init plugin.
	      return el.equalHeights();
	    },
	    sliders: function sliders(el, options) {
	      // DOM check.
	      if (!el.length) return;

	      // Get plugin.
	      __webpack_require__(3);
	      // Init plugin.
	      return el.slick(options);
	    },
	    validation: function validation(el, options) {
	      // DOM check.
	      if (!el.length) return;

	      // Check captcha.
	      if ($('#c_a_p_t_c_h_a', el).length) {
	        // Set the captcha field value and check the box.
	        $('#c_a_p_t_c_h_a', el).prop('checked', true).val('c_a_p_t_c_h_a');
	      }
	      // Get plugin.
	      __webpack_require__(6);
	      // Init plugin.
	      return el.validation(options);
	    }
	  };

	  /**
	   * routes
	   * Module routes method.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  App.prototype.routes = function () {
	    // Init Routing.
	    var Router = new _navigo2.default(null, false);
	    // Get global route controller.
	    __webpack_require__(7);
	    // Router.
	    Router.on({
	      '/page': function page() {
	        // Log it.
	        window.Helpers.log('Route Loaded: page');
	        // Get route controller.
	        // require('./routes/page')
	      }
	    }).resolve();
	  };

	  // Export
	  window.App = new App();
	})(window.App = window.App || function () {}, window);

	// Start.
	/**
	 *
	 * App
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	window.App.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("Navigo", [], factory);
		else if(typeof exports === 'object')
			exports["Navigo"] = factory();
		else
			root["Navigo"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
		
		function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
		
		var PARAMETER_REGEXP = /([:*])(\w+)/g;
		var WILDCARD_REGEXP = /\*/g;
		var REPLACE_VARIABLE_REGEXP = '([^\/]+)';
		var REPLACE_WILDCARD = '(?:.*)';
		var FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
		
		function clean(s) {
		  if (s instanceof RegExp) return s;
		  return s.replace(/\/+$/, '').replace(/^\/+/, '/');
		}
		
		function regExpResultToParams(match, names) {
		  if (names.length === 0) return null;
		  if (!match) return null;
		  return match.slice(1, match.length).reduce(function (params, value, index) {
		    if (params === null) params = {};
		    params[names[index]] = value;
		    return params;
		  }, null);
		}
		
		function replaceDynamicURLParts(route) {
		  var paramNames = [],
		      regexp;
		
		  if (route instanceof RegExp) {
		    regexp = route;
		  } else {
		    regexp = new RegExp(clean(route).replace(PARAMETER_REGEXP, function (full, dots, name) {
		      paramNames.push(name);
		      return REPLACE_VARIABLE_REGEXP;
		    }).replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP);
		  }
		  return { regexp: regexp, paramNames: paramNames };
		}
		
		function getUrlDepth(url) {
		  return url.replace(/\/$/, '').split('/').length;
		}
		
		function compareUrlDepth(urlA, urlB) {
		  return getUrlDepth(urlA) < getUrlDepth(urlB);
		}
		
		function findMatchedRoutes(url) {
		  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		
		  return routes.map(function (route) {
		    var _replaceDynamicURLPar = replaceDynamicURLParts(route.route),
		        regexp = _replaceDynamicURLPar.regexp,
		        paramNames = _replaceDynamicURLPar.paramNames;
		
		    var match = url.match(regexp);
		    var params = regExpResultToParams(match, paramNames);
		
		    return match ? { match: match, route: route, params: params } : false;
		  }).filter(function (m) {
		    return m;
		  });
		}
		
		function match(url, routes) {
		  return findMatchedRoutes(url, routes)[0] || false;
		}
		
		function root(url, routes) {
		  var matched = findMatchedRoutes(url, routes.filter(function (route) {
		    var u = clean(route.route);
		
		    return u !== '' && u !== '*';
		  }));
		  var fallbackURL = clean(url);
		
		  if (matched.length > 0) {
		    return matched.map(function (m) {
		      return clean(url.substr(0, m.match.index));
		    }).reduce(function (root, current) {
		      return current.length < root.length ? current : root;
		    }, fallbackURL);
		  }
		  return fallbackURL;
		}
		
		function isPushStateAvailable() {
		  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
		}
		
		function isHashChangeAPIAvailable() {
		  return !!(typeof window !== 'undefined' && 'onhashchange' in window);
		}
		
		function extractGETParameters(url, useHash) {
		  var _url$split = url.split(/\?(.*)?$/),
		      _url$split2 = _toArray(_url$split),
		      onlyURL = _url$split2[0],
		      query = _url$split2.slice(1);
		
		  if (!useHash) {
		    onlyURL = onlyURL.split('#')[0];
		  }
		  return { onlyURL: onlyURL, GETParameters: query.join('') };
		}
		
		function manageHooks(handler, route) {
		  if (route && route.hooks && _typeof(route.hooks) === 'object') {
		    if (route.hooks.before) {
		      route.hooks.before(function () {
		        var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
		
		        if (!shouldRoute) return;
		        handler();
		        route.hooks.after && route.hooks.after();
		      });
		    } else if (route.hooks.after) {
		      handler();
		      route.hooks.after && route.hooks.after();
		    }
		    return;
		  }
		  handler();
		};
		
		function Navigo(r, useHash) {
		  this.root = null;
		  this._routes = [];
		  this._useHash = useHash;
		  this._paused = false;
		  this._destroyed = false;
		  this._lastRouteResolved = null;
		  this._notFoundHandler = null;
		  this._defaultHandler = null;
		  this._usePushState = !useHash && isPushStateAvailable();
		
		  if (r) {
		    this.root = r.replace(/\/$/, '/#');
		  } else if (useHash) {
		    this.root = this._cLoc().split('#')[0].replace(/\/$/, '/#');
		  }
		
		  this._listen();
		  this.updatePageLinks();
		}
		
		Navigo.prototype = {
		  helpers: {
		    match: match,
		    root: root,
		    clean: clean
		  },
		  navigate: function navigate(path, absolute) {
		    var to;
		
		    path = path || '';
		    if (this._usePushState) {
		      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
		      to = to.replace(/([^:])(\/{2,})/g, '$1/');
		      history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
		      this.resolve();
		    } else if (typeof window !== 'undefined') {
		      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		    }
		    return this;
		  },
		  on: function on() {
		    var _this = this;
		
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }
		
		    if (typeof args[0] === 'function') {
		      this._defaultHandler = { handler: args[0], hooks: args[1] };
		    } else if (args.length >= 2) {
		      if (args[0] === '/') {
		        this._defaultHandler = { handler: args[1], hooks: args[2] };
		      } else {
		        this._add(args[0], args[1], args[2]);
		      }
		    } else if (_typeof(args[0]) === 'object') {
		      var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);
		
		      orderedRoutes.forEach(function (route) {
		        _this._add(route, args[0][route]);
		      });
		    }
		    return this;
		  },
		  notFound: function notFound(handler, hooks) {
		    this._notFoundHandler = { handler: handler, hooks: hooks };
		    return this;
		  },
		  resolve: function resolve(current) {
		    var _this2 = this;
		
		    var handler, m;
		    var url = (current || this._cLoc()).replace(this._getRoot(), '');
		
		    if (this._useHash) {
		      url = url.replace(/^\/#/, '/');
		    }
		
		    var _extractGETParameters = extractGETParameters(url, this._useHash),
		        onlyURL = _extractGETParameters.onlyURL,
		        GETParameters = _extractGETParameters.GETParameters;
		
		    if (this._paused || this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
		      return false;
		    }
		
		    m = match(onlyURL, this._routes);
		
		    if (m) {
		      this._lastRouteResolved = { url: onlyURL, query: GETParameters };
		      handler = m.route.handler;
		      manageHooks(function () {
		        m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
		      }, m.route);
		      return m;
		    } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === '#')) {
		      manageHooks(function () {
		        _this2._lastRouteResolved = { url: onlyURL, query: GETParameters };
		        _this2._defaultHandler.handler(GETParameters);
		      }, this._defaultHandler);
		      return true;
		    } else if (this._notFoundHandler) {
		      manageHooks(function () {
		        _this2._lastRouteResolved = { url: onlyURL, query: GETParameters };
		        _this2._notFoundHandler.handler(GETParameters);
		      }, this._notFoundHandler);
		    }
		    return false;
		  },
		  destroy: function destroy() {
		    this._routes = [];
		    this._destroyed = true;
		    clearTimeout(this._listenningInterval);
		    typeof window !== 'undefined' ? window.onpopstate = null : null;
		  },
		  updatePageLinks: function updatePageLinks() {
		    var self = this;
		
		    if (typeof document === 'undefined') return;
		
		    this._findLinks().forEach(function (link) {
		      if (!link.hasListenerAttached) {
		        link.addEventListener('click', function (e) {
		          var location = link.getAttribute('href');
		
		          if (!self._destroyed) {
		            e.preventDefault();
		            self.navigate(clean(location));
		          }
		        });
		        link.hasListenerAttached = true;
		      }
		    });
		  },
		  generate: function generate(name) {
		    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		
		    var result = this._routes.reduce(function (result, route) {
		      var key;
		
		      if (route.name === name) {
		        result = route.route;
		        for (key in data) {
		          result = result.replace(':' + key, data[key]);
		        }
		      }
		      return result;
		    }, '');
		
		    return this._useHash ? '#' + result : result;
		  },
		  link: function link(path) {
		    return this._getRoot() + path;
		  },
		  pause: function pause() {
		    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
		
		    this._paused = status;
		  },
		  resume: function resume() {
		    this.pause(false);
		  },
		  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
		    if (!isPushStateAvailable()) {
		      this.destroy();
		    }
		  },
		  _add: function _add(route) {
		    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		
		    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
		      this._routes.push({
		        route: route,
		        handler: handler.uses,
		        name: handler.as,
		        hooks: hooks || handler.hooks
		      });
		    } else {
		      this._routes.push({ route: route, handler: handler, hooks: hooks });
		    }
		    return this._add;
		  },
		  _getRoot: function _getRoot() {
		    if (this.root !== null) return this.root;
		    this.root = root(this._cLoc(), this._routes);
		    return this.root;
		  },
		  _listen: function _listen() {
		    var _this3 = this;
		
		    if (this._usePushState) {
		      window.onpopstate = function () {
		        _this3.resolve();
		      };
		    } else if (isHashChangeAPIAvailable()) {
		      window.onhashchange = function () {
		        _this3.resolve();
		      };
		    } else {
		      (function () {
		        var cached = _this3._cLoc(),
		            current = void 0,
		            _check = void 0;
		
		        _check = function check() {
		          current = _this3._cLoc();
		          if (cached !== current) {
		            cached = current;
		            _this3.resolve();
		          }
		          _this3._listenningInterval = setTimeout(_check, 200);
		        };
		        _check();
		      })();
		    }
		  },
		  _cLoc: function _cLoc() {
		    if (typeof window !== 'undefined') {
		      return clean(window.location.href);
		    }
		    return '';
		  },
		  _findLinks: function _findLinks() {
		    return [].slice.call(document.querySelectorAll('[data-navigo]'));
		  }
		};
		
		exports.default = Navigo;
		module.exports = exports['default'];

	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=navigo.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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

	;(function ($, window, undefined) {
	    'use strict';

	    // Set helpers.

	    var helpers = {};

	    /**
	     * Plugin
	     * Return a unique plugin instance.
	    **/
	    var Plugin = function Plugin(elem, options) {
	        this.elem = elem;
	        this.$elem = $(elem);
	        this.options = options;
	        this.metadata = this.$elem.data('plugin-options');
	    };

	    /**
	     * $.fn.equalHeights
	     * Return a unique plugin instance.
	    **/
	    $.fn.equalHeights = function (options) {
	        return this.each(function () {
	            new Plugin(this, options).init();
	        });
	    };

	    /**
	     * $.fn.equalHeights.defaults
	     * Default options.
	    **/
	    $.fn.equalHeights.defaults = {
	        widths: false
	    };

	    /**
	     * Plugin.prototype
	     * Init.
	    **/
	    Plugin.prototype = {
	        init: function init() {
	            // this
	            var _self = this;

	            // Global settings.
	            _self.settings = $.extend({}, $.fn.equalHeights.defaults, _self.options);
	            // Run the plugin.
	            _self.run();

	            return _self;
	        },
	        run: function run() {
	            // Set the breakpoints
	            var breakpoints = this.$elem.data('eh-breakpoints') ? this.$elem.data('eh-breakpoints').split('|') : [320, 9999];
	            // Go!
	            this.watch_window(this.$elem, breakpoints[0], breakpoints[1]);
	        },
	        calculate: function calculate(el) {
	            var _self = this;

	            var boxes = $('[data-eh="true"]', el);
	            // Reset the height attribute to `auto` (or nothing).
	            this.reset_sizes(el);
	            // Map all qualifying element heights to an array.
	            var heights = boxes.map(function () {
	                return $(this).height();
	            }).get();
	            // Map all qualifying element heights to an array.
	            var widths = boxes.map(function () {
	                return $(this).outerWidth() + $(this).css('margin-left');
	            }).get();
	            // Get the largest value from the array.
	            var large_height = Math.max.apply(Math, heights);
	            var large_width = Math.max.apply(Math, widths);
	            // Apply the CSS height to all qualifying elements.
	            boxes.each(function () {
	                $(this).height(large_height);
	                // Are we doing widths?
	                if (_self.settings.widths) {
	                    $(this).css({ 'min-width': large_width });
	                }
	            });
	        },
	        watch_window: function watch_window(el, breakpoint1, breakpoint2) {
	            var _self = this;

	            $(function () {
	                _self.run_sizes(el, breakpoint1, breakpoint2);
	            });
	            $(window).on('resize', function () {
	                _self.run_sizes(el, breakpoint1, breakpoint2);
	            });
	        },
	        run_sizes: function run_sizes(el, breakpoint1, breakpoint2) {
	            var _self = this;

	            return $(window).width() >= breakpoint1 && $(window).width() <= breakpoint2 ? _self.calculate(el) : _self.reset_sizes(el);
	        },
	        reset_sizes: function reset_sizes(el) {
	            var _self = this;

	            var boxes = $('[data-eh="true"]', el);
	            // Reset the height attribute to `auto` (or nothing).
	            boxes.each(function () {
	                $(this).css({ 'height': 'auto' });
	                // Are we doing widths?
	                if (_self.settings.widths) {
	                    $(this).css({ 'min-width': 'none' });
	                }
	            });
	        }
	    };
	})(jQuery, window);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4)(__webpack_require__(5))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "/*\n     _ _      _       _\n ___| (_) ___| | __  (_)___\n/ __| | |/ __| |/ /  | / __|\n\\__ \\ | | (__|   < _ | \\__ \\\n|___/_|_|\\___|_|\\_(_)/ |___/\n                   |__/\n\n Version: 1.6.0\n  Author: Ken Wheeler\n Website: http://kenwheeler.github.io\n    Docs: http://kenwheeler.github.io/slick\n    Repo: http://github.com/kenwheeler/slick\n  Issues: http://github.com/kenwheeler/slick/issues\n\n */\n/* global window, document, define, jQuery, setInterval, clearInterval */\n(function(factory) {\n    'use strict';\n    if (typeof define === 'function' && define.amd) {\n        define(['jquery'], factory);\n    } else if (typeof exports !== 'undefined') {\n        module.exports = factory(require('jquery'));\n    } else {\n        factory(jQuery);\n    }\n\n}(function($) {\n    'use strict';\n    var Slick = window.Slick || {};\n\n    Slick = (function() {\n\n        var instanceUid = 0;\n\n        function Slick(element, settings) {\n\n            var _ = this, dataSettings;\n\n            _.defaults = {\n                accessibility: true,\n                adaptiveHeight: false,\n                appendArrows: $(element),\n                appendDots: $(element),\n                arrows: true,\n                asNavFor: null,\n                prevArrow: '<button type=\"button\" data-role=\"none\" class=\"slick-prev\" aria-label=\"Previous\" tabindex=\"0\" role=\"button\">Previous</button>',\n                nextArrow: '<button type=\"button\" data-role=\"none\" class=\"slick-next\" aria-label=\"Next\" tabindex=\"0\" role=\"button\">Next</button>',\n                autoplay: false,\n                autoplaySpeed: 3000,\n                centerMode: false,\n                centerPadding: '50px',\n                cssEase: 'ease',\n                customPaging: function(slider, i) {\n                    return $('<button type=\"button\" data-role=\"none\" role=\"button\" tabindex=\"0\" />').text(i + 1);\n                },\n                dots: false,\n                dotsClass: 'slick-dots',\n                draggable: true,\n                easing: 'linear',\n                edgeFriction: 0.35,\n                fade: false,\n                focusOnSelect: false,\n                infinite: true,\n                initialSlide: 0,\n                lazyLoad: 'ondemand',\n                mobileFirst: false,\n                pauseOnHover: true,\n                pauseOnFocus: true,\n                pauseOnDotsHover: false,\n                respondTo: 'window',\n                responsive: null,\n                rows: 1,\n                rtl: false,\n                slide: '',\n                slidesPerRow: 1,\n                slidesToShow: 1,\n                slidesToScroll: 1,\n                speed: 500,\n                swipe: true,\n                swipeToSlide: false,\n                touchMove: true,\n                touchThreshold: 5,\n                useCSS: true,\n                useTransform: true,\n                variableWidth: false,\n                vertical: false,\n                verticalSwiping: false,\n                waitForAnimate: true,\n                zIndex: 1000\n            };\n\n            _.initials = {\n                animating: false,\n                dragging: false,\n                autoPlayTimer: null,\n                currentDirection: 0,\n                currentLeft: null,\n                currentSlide: 0,\n                direction: 1,\n                $dots: null,\n                listWidth: null,\n                listHeight: null,\n                loadIndex: 0,\n                $nextArrow: null,\n                $prevArrow: null,\n                slideCount: null,\n                slideWidth: null,\n                $slideTrack: null,\n                $slides: null,\n                sliding: false,\n                slideOffset: 0,\n                swipeLeft: null,\n                $list: null,\n                touchObject: {},\n                transformsEnabled: false,\n                unslicked: false\n            };\n\n            $.extend(_, _.initials);\n\n            _.activeBreakpoint = null;\n            _.animType = null;\n            _.animProp = null;\n            _.breakpoints = [];\n            _.breakpointSettings = [];\n            _.cssTransitions = false;\n            _.focussed = false;\n            _.interrupted = false;\n            _.hidden = 'hidden';\n            _.paused = true;\n            _.positionProp = null;\n            _.respondTo = null;\n            _.rowCount = 1;\n            _.shouldClick = true;\n            _.$slider = $(element);\n            _.$slidesCache = null;\n            _.transformType = null;\n            _.transitionType = null;\n            _.visibilityChange = 'visibilitychange';\n            _.windowWidth = 0;\n            _.windowTimer = null;\n\n            dataSettings = $(element).data('slick') || {};\n\n            _.options = $.extend({}, _.defaults, settings, dataSettings);\n\n            _.currentSlide = _.options.initialSlide;\n\n            _.originalSettings = _.options;\n\n            if (typeof document.mozHidden !== 'undefined') {\n                _.hidden = 'mozHidden';\n                _.visibilityChange = 'mozvisibilitychange';\n            } else if (typeof document.webkitHidden !== 'undefined') {\n                _.hidden = 'webkitHidden';\n                _.visibilityChange = 'webkitvisibilitychange';\n            }\n\n            _.autoPlay = $.proxy(_.autoPlay, _);\n            _.autoPlayClear = $.proxy(_.autoPlayClear, _);\n            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);\n            _.changeSlide = $.proxy(_.changeSlide, _);\n            _.clickHandler = $.proxy(_.clickHandler, _);\n            _.selectHandler = $.proxy(_.selectHandler, _);\n            _.setPosition = $.proxy(_.setPosition, _);\n            _.swipeHandler = $.proxy(_.swipeHandler, _);\n            _.dragHandler = $.proxy(_.dragHandler, _);\n            _.keyHandler = $.proxy(_.keyHandler, _);\n\n            _.instanceUid = instanceUid++;\n\n            // A simple way to check for HTML strings\n            // Strict HTML recognition (must start with <)\n            // Extracted from jQuery v1.11 source\n            _.htmlExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*)$/;\n\n\n            _.registerBreakpoints();\n            _.init(true);\n\n        }\n\n        return Slick;\n\n    }());\n\n    Slick.prototype.activateADA = function() {\n        var _ = this;\n\n        _.$slideTrack.find('.slick-active').attr({\n            'aria-hidden': 'false'\n        }).find('a, input, button, select').attr({\n            'tabindex': '0'\n        });\n\n    };\n\n    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {\n\n        var _ = this;\n\n        if (typeof(index) === 'boolean') {\n            addBefore = index;\n            index = null;\n        } else if (index < 0 || (index >= _.slideCount)) {\n            return false;\n        }\n\n        _.unload();\n\n        if (typeof(index) === 'number') {\n            if (index === 0 && _.$slides.length === 0) {\n                $(markup).appendTo(_.$slideTrack);\n            } else if (addBefore) {\n                $(markup).insertBefore(_.$slides.eq(index));\n            } else {\n                $(markup).insertAfter(_.$slides.eq(index));\n            }\n        } else {\n            if (addBefore === true) {\n                $(markup).prependTo(_.$slideTrack);\n            } else {\n                $(markup).appendTo(_.$slideTrack);\n            }\n        }\n\n        _.$slides = _.$slideTrack.children(this.options.slide);\n\n        _.$slideTrack.children(this.options.slide).detach();\n\n        _.$slideTrack.append(_.$slides);\n\n        _.$slides.each(function(index, element) {\n            $(element).attr('data-slick-index', index);\n        });\n\n        _.$slidesCache = _.$slides;\n\n        _.reinit();\n\n    };\n\n    Slick.prototype.animateHeight = function() {\n        var _ = this;\n        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {\n            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);\n            _.$list.animate({\n                height: targetHeight\n            }, _.options.speed);\n        }\n    };\n\n    Slick.prototype.animateSlide = function(targetLeft, callback) {\n\n        var animProps = {},\n            _ = this;\n\n        _.animateHeight();\n\n        if (_.options.rtl === true && _.options.vertical === false) {\n            targetLeft = -targetLeft;\n        }\n        if (_.transformsEnabled === false) {\n            if (_.options.vertical === false) {\n                _.$slideTrack.animate({\n                    left: targetLeft\n                }, _.options.speed, _.options.easing, callback);\n            } else {\n                _.$slideTrack.animate({\n                    top: targetLeft\n                }, _.options.speed, _.options.easing, callback);\n            }\n\n        } else {\n\n            if (_.cssTransitions === false) {\n                if (_.options.rtl === true) {\n                    _.currentLeft = -(_.currentLeft);\n                }\n                $({\n                    animStart: _.currentLeft\n                }).animate({\n                    animStart: targetLeft\n                }, {\n                    duration: _.options.speed,\n                    easing: _.options.easing,\n                    step: function(now) {\n                        now = Math.ceil(now);\n                        if (_.options.vertical === false) {\n                            animProps[_.animType] = 'translate(' +\n                                now + 'px, 0px)';\n                            _.$slideTrack.css(animProps);\n                        } else {\n                            animProps[_.animType] = 'translate(0px,' +\n                                now + 'px)';\n                            _.$slideTrack.css(animProps);\n                        }\n                    },\n                    complete: function() {\n                        if (callback) {\n                            callback.call();\n                        }\n                    }\n                });\n\n            } else {\n\n                _.applyTransition();\n                targetLeft = Math.ceil(targetLeft);\n\n                if (_.options.vertical === false) {\n                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';\n                } else {\n                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';\n                }\n                _.$slideTrack.css(animProps);\n\n                if (callback) {\n                    setTimeout(function() {\n\n                        _.disableTransition();\n\n                        callback.call();\n                    }, _.options.speed);\n                }\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.getNavTarget = function() {\n\n        var _ = this,\n            asNavFor = _.options.asNavFor;\n\n        if ( asNavFor && asNavFor !== null ) {\n            asNavFor = $(asNavFor).not(_.$slider);\n        }\n\n        return asNavFor;\n\n    };\n\n    Slick.prototype.asNavFor = function(index) {\n\n        var _ = this,\n            asNavFor = _.getNavTarget();\n\n        if ( asNavFor !== null && typeof asNavFor === 'object' ) {\n            asNavFor.each(function() {\n                var target = $(this).slick('getSlick');\n                if(!target.unslicked) {\n                    target.slideHandler(index, true);\n                }\n            });\n        }\n\n    };\n\n    Slick.prototype.applyTransition = function(slide) {\n\n        var _ = this,\n            transition = {};\n\n        if (_.options.fade === false) {\n            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;\n        } else {\n            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;\n        }\n\n        if (_.options.fade === false) {\n            _.$slideTrack.css(transition);\n        } else {\n            _.$slides.eq(slide).css(transition);\n        }\n\n    };\n\n    Slick.prototype.autoPlay = function() {\n\n        var _ = this;\n\n        _.autoPlayClear();\n\n        if ( _.slideCount > _.options.slidesToShow ) {\n            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );\n        }\n\n    };\n\n    Slick.prototype.autoPlayClear = function() {\n\n        var _ = this;\n\n        if (_.autoPlayTimer) {\n            clearInterval(_.autoPlayTimer);\n        }\n\n    };\n\n    Slick.prototype.autoPlayIterator = function() {\n\n        var _ = this,\n            slideTo = _.currentSlide + _.options.slidesToScroll;\n\n        if ( !_.paused && !_.interrupted && !_.focussed ) {\n\n            if ( _.options.infinite === false ) {\n\n                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {\n                    _.direction = 0;\n                }\n\n                else if ( _.direction === 0 ) {\n\n                    slideTo = _.currentSlide - _.options.slidesToScroll;\n\n                    if ( _.currentSlide - 1 === 0 ) {\n                        _.direction = 1;\n                    }\n\n                }\n\n            }\n\n            _.slideHandler( slideTo );\n\n        }\n\n    };\n\n    Slick.prototype.buildArrows = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true ) {\n\n            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');\n            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');\n\n            if( _.slideCount > _.options.slidesToShow ) {\n\n                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');\n                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');\n\n                if (_.htmlExpr.test(_.options.prevArrow)) {\n                    _.$prevArrow.prependTo(_.options.appendArrows);\n                }\n\n                if (_.htmlExpr.test(_.options.nextArrow)) {\n                    _.$nextArrow.appendTo(_.options.appendArrows);\n                }\n\n                if (_.options.infinite !== true) {\n                    _.$prevArrow\n                        .addClass('slick-disabled')\n                        .attr('aria-disabled', 'true');\n                }\n\n            } else {\n\n                _.$prevArrow.add( _.$nextArrow )\n\n                    .addClass('slick-hidden')\n                    .attr({\n                        'aria-disabled': 'true',\n                        'tabindex': '-1'\n                    });\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.buildDots = function() {\n\n        var _ = this,\n            i, dot;\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$slider.addClass('slick-dotted');\n\n            dot = $('<ul />').addClass(_.options.dotsClass);\n\n            for (i = 0; i <= _.getDotCount(); i += 1) {\n                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));\n            }\n\n            _.$dots = dot.appendTo(_.options.appendDots);\n\n            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');\n\n        }\n\n    };\n\n    Slick.prototype.buildOut = function() {\n\n        var _ = this;\n\n        _.$slides =\n            _.$slider\n                .children( _.options.slide + ':not(.slick-cloned)')\n                .addClass('slick-slide');\n\n        _.slideCount = _.$slides.length;\n\n        _.$slides.each(function(index, element) {\n            $(element)\n                .attr('data-slick-index', index)\n                .data('originalStyling', $(element).attr('style') || '');\n        });\n\n        _.$slider.addClass('slick-slider');\n\n        _.$slideTrack = (_.slideCount === 0) ?\n            $('<div class=\"slick-track\"/>').appendTo(_.$slider) :\n            _.$slides.wrapAll('<div class=\"slick-track\"/>').parent();\n\n        _.$list = _.$slideTrack.wrap(\n            '<div aria-live=\"polite\" class=\"slick-list\"/>').parent();\n        _.$slideTrack.css('opacity', 0);\n\n        if (_.options.centerMode === true || _.options.swipeToSlide === true) {\n            _.options.slidesToScroll = 1;\n        }\n\n        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');\n\n        _.setupInfinite();\n\n        _.buildArrows();\n\n        _.buildDots();\n\n        _.updateDots();\n\n\n        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);\n\n        if (_.options.draggable === true) {\n            _.$list.addClass('draggable');\n        }\n\n    };\n\n    Slick.prototype.buildRows = function() {\n\n        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;\n\n        newSlides = document.createDocumentFragment();\n        originalSlides = _.$slider.children();\n\n        if(_.options.rows > 1) {\n\n            slidesPerSection = _.options.slidesPerRow * _.options.rows;\n            numOfSlides = Math.ceil(\n                originalSlides.length / slidesPerSection\n            );\n\n            for(a = 0; a < numOfSlides; a++){\n                var slide = document.createElement('div');\n                for(b = 0; b < _.options.rows; b++) {\n                    var row = document.createElement('div');\n                    for(c = 0; c < _.options.slidesPerRow; c++) {\n                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));\n                        if (originalSlides.get(target)) {\n                            row.appendChild(originalSlides.get(target));\n                        }\n                    }\n                    slide.appendChild(row);\n                }\n                newSlides.appendChild(slide);\n            }\n\n            _.$slider.empty().append(newSlides);\n            _.$slider.children().children().children()\n                .css({\n                    'width':(100 / _.options.slidesPerRow) + '%',\n                    'display': 'inline-block'\n                });\n\n        }\n\n    };\n\n    Slick.prototype.checkResponsive = function(initial, forceUpdate) {\n\n        var _ = this,\n            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;\n        var sliderWidth = _.$slider.width();\n        var windowWidth = window.innerWidth || $(window).width();\n\n        if (_.respondTo === 'window') {\n            respondToWidth = windowWidth;\n        } else if (_.respondTo === 'slider') {\n            respondToWidth = sliderWidth;\n        } else if (_.respondTo === 'min') {\n            respondToWidth = Math.min(windowWidth, sliderWidth);\n        }\n\n        if ( _.options.responsive &&\n            _.options.responsive.length &&\n            _.options.responsive !== null) {\n\n            targetBreakpoint = null;\n\n            for (breakpoint in _.breakpoints) {\n                if (_.breakpoints.hasOwnProperty(breakpoint)) {\n                    if (_.originalSettings.mobileFirst === false) {\n                        if (respondToWidth < _.breakpoints[breakpoint]) {\n                            targetBreakpoint = _.breakpoints[breakpoint];\n                        }\n                    } else {\n                        if (respondToWidth > _.breakpoints[breakpoint]) {\n                            targetBreakpoint = _.breakpoints[breakpoint];\n                        }\n                    }\n                }\n            }\n\n            if (targetBreakpoint !== null) {\n                if (_.activeBreakpoint !== null) {\n                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {\n                        _.activeBreakpoint =\n                            targetBreakpoint;\n                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {\n                            _.unslick(targetBreakpoint);\n                        } else {\n                            _.options = $.extend({}, _.originalSettings,\n                                _.breakpointSettings[\n                                    targetBreakpoint]);\n                            if (initial === true) {\n                                _.currentSlide = _.options.initialSlide;\n                            }\n                            _.refresh(initial);\n                        }\n                        triggerBreakpoint = targetBreakpoint;\n                    }\n                } else {\n                    _.activeBreakpoint = targetBreakpoint;\n                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {\n                        _.unslick(targetBreakpoint);\n                    } else {\n                        _.options = $.extend({}, _.originalSettings,\n                            _.breakpointSettings[\n                                targetBreakpoint]);\n                        if (initial === true) {\n                            _.currentSlide = _.options.initialSlide;\n                        }\n                        _.refresh(initial);\n                    }\n                    triggerBreakpoint = targetBreakpoint;\n                }\n            } else {\n                if (_.activeBreakpoint !== null) {\n                    _.activeBreakpoint = null;\n                    _.options = _.originalSettings;\n                    if (initial === true) {\n                        _.currentSlide = _.options.initialSlide;\n                    }\n                    _.refresh(initial);\n                    triggerBreakpoint = targetBreakpoint;\n                }\n            }\n\n            // only trigger breakpoints during an actual break. not on initialize.\n            if( !initial && triggerBreakpoint !== false ) {\n                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);\n            }\n        }\n\n    };\n\n    Slick.prototype.changeSlide = function(event, dontAnimate) {\n\n        var _ = this,\n            $target = $(event.currentTarget),\n            indexOffset, slideOffset, unevenOffset;\n\n        // If target is a link, prevent default action.\n        if($target.is('a')) {\n            event.preventDefault();\n        }\n\n        // If target is not the <li> element (ie: a child), find the <li>.\n        if(!$target.is('li')) {\n            $target = $target.closest('li');\n        }\n\n        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);\n        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;\n\n        switch (event.data.message) {\n\n            case 'previous':\n                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;\n                if (_.slideCount > _.options.slidesToShow) {\n                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);\n                }\n                break;\n\n            case 'next':\n                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;\n                if (_.slideCount > _.options.slidesToShow) {\n                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);\n                }\n                break;\n\n            case 'index':\n                var index = event.data.index === 0 ? 0 :\n                    event.data.index || $target.index() * _.options.slidesToScroll;\n\n                _.slideHandler(_.checkNavigable(index), false, dontAnimate);\n                $target.children().trigger('focus');\n                break;\n\n            default:\n                return;\n        }\n\n    };\n\n    Slick.prototype.checkNavigable = function(index) {\n\n        var _ = this,\n            navigables, prevNavigable;\n\n        navigables = _.getNavigableIndexes();\n        prevNavigable = 0;\n        if (index > navigables[navigables.length - 1]) {\n            index = navigables[navigables.length - 1];\n        } else {\n            for (var n in navigables) {\n                if (index < navigables[n]) {\n                    index = prevNavigable;\n                    break;\n                }\n                prevNavigable = navigables[n];\n            }\n        }\n\n        return index;\n    };\n\n    Slick.prototype.cleanUpEvents = function() {\n\n        var _ = this;\n\n        if (_.options.dots && _.$dots !== null) {\n\n            $('li', _.$dots)\n                .off('click.slick', _.changeSlide)\n                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))\n                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n        }\n\n        _.$slider.off('focus.slick blur.slick');\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);\n            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);\n        }\n\n        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);\n        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);\n        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);\n        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);\n\n        _.$list.off('click.slick', _.clickHandler);\n\n        $(document).off(_.visibilityChange, _.visibility);\n\n        _.cleanUpSlideEvents();\n\n        if (_.options.accessibility === true) {\n            _.$list.off('keydown.slick', _.keyHandler);\n        }\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().off('click.slick', _.selectHandler);\n        }\n\n        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);\n\n        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);\n\n        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);\n\n        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);\n        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);\n\n    };\n\n    Slick.prototype.cleanUpSlideEvents = function() {\n\n        var _ = this;\n\n        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));\n        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n    };\n\n    Slick.prototype.cleanUpRows = function() {\n\n        var _ = this, originalSlides;\n\n        if(_.options.rows > 1) {\n            originalSlides = _.$slides.children().children();\n            originalSlides.removeAttr('style');\n            _.$slider.empty().append(originalSlides);\n        }\n\n    };\n\n    Slick.prototype.clickHandler = function(event) {\n\n        var _ = this;\n\n        if (_.shouldClick === false) {\n            event.stopImmediatePropagation();\n            event.stopPropagation();\n            event.preventDefault();\n        }\n\n    };\n\n    Slick.prototype.destroy = function(refresh) {\n\n        var _ = this;\n\n        _.autoPlayClear();\n\n        _.touchObject = {};\n\n        _.cleanUpEvents();\n\n        $('.slick-cloned', _.$slider).detach();\n\n        if (_.$dots) {\n            _.$dots.remove();\n        }\n\n\n        if ( _.$prevArrow && _.$prevArrow.length ) {\n\n            _.$prevArrow\n                .removeClass('slick-disabled slick-arrow slick-hidden')\n                .removeAttr('aria-hidden aria-disabled tabindex')\n                .css('display','');\n\n            if ( _.htmlExpr.test( _.options.prevArrow )) {\n                _.$prevArrow.remove();\n            }\n        }\n\n        if ( _.$nextArrow && _.$nextArrow.length ) {\n\n            _.$nextArrow\n                .removeClass('slick-disabled slick-arrow slick-hidden')\n                .removeAttr('aria-hidden aria-disabled tabindex')\n                .css('display','');\n\n            if ( _.htmlExpr.test( _.options.nextArrow )) {\n                _.$nextArrow.remove();\n            }\n\n        }\n\n\n        if (_.$slides) {\n\n            _.$slides\n                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')\n                .removeAttr('aria-hidden')\n                .removeAttr('data-slick-index')\n                .each(function(){\n                    $(this).attr('style', $(this).data('originalStyling'));\n                });\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slideTrack.detach();\n\n            _.$list.detach();\n\n            _.$slider.append(_.$slides);\n        }\n\n        _.cleanUpRows();\n\n        _.$slider.removeClass('slick-slider');\n        _.$slider.removeClass('slick-initialized');\n        _.$slider.removeClass('slick-dotted');\n\n        _.unslicked = true;\n\n        if(!refresh) {\n            _.$slider.trigger('destroy', [_]);\n        }\n\n    };\n\n    Slick.prototype.disableTransition = function(slide) {\n\n        var _ = this,\n            transition = {};\n\n        transition[_.transitionType] = '';\n\n        if (_.options.fade === false) {\n            _.$slideTrack.css(transition);\n        } else {\n            _.$slides.eq(slide).css(transition);\n        }\n\n    };\n\n    Slick.prototype.fadeSlide = function(slideIndex, callback) {\n\n        var _ = this;\n\n        if (_.cssTransitions === false) {\n\n            _.$slides.eq(slideIndex).css({\n                zIndex: _.options.zIndex\n            });\n\n            _.$slides.eq(slideIndex).animate({\n                opacity: 1\n            }, _.options.speed, _.options.easing, callback);\n\n        } else {\n\n            _.applyTransition(slideIndex);\n\n            _.$slides.eq(slideIndex).css({\n                opacity: 1,\n                zIndex: _.options.zIndex\n            });\n\n            if (callback) {\n                setTimeout(function() {\n\n                    _.disableTransition(slideIndex);\n\n                    callback.call();\n                }, _.options.speed);\n            }\n\n        }\n\n    };\n\n    Slick.prototype.fadeSlideOut = function(slideIndex) {\n\n        var _ = this;\n\n        if (_.cssTransitions === false) {\n\n            _.$slides.eq(slideIndex).animate({\n                opacity: 0,\n                zIndex: _.options.zIndex - 2\n            }, _.options.speed, _.options.easing);\n\n        } else {\n\n            _.applyTransition(slideIndex);\n\n            _.$slides.eq(slideIndex).css({\n                opacity: 0,\n                zIndex: _.options.zIndex - 2\n            });\n\n        }\n\n    };\n\n    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {\n\n        var _ = this;\n\n        if (filter !== null) {\n\n            _.$slidesCache = _.$slides;\n\n            _.unload();\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);\n\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.focusHandler = function() {\n\n        var _ = this;\n\n        _.$slider\n            .off('focus.slick blur.slick')\n            .on('focus.slick blur.slick',\n                '*:not(.slick-arrow)', function(event) {\n\n            event.stopImmediatePropagation();\n            var $sf = $(this);\n\n            setTimeout(function() {\n\n                if( _.options.pauseOnFocus ) {\n                    _.focussed = $sf.is(':focus');\n                    _.autoPlay();\n                }\n\n            }, 0);\n\n        });\n    };\n\n    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {\n\n        var _ = this;\n        return _.currentSlide;\n\n    };\n\n    Slick.prototype.getDotCount = function() {\n\n        var _ = this;\n\n        var breakPoint = 0;\n        var counter = 0;\n        var pagerQty = 0;\n\n        if (_.options.infinite === true) {\n            while (breakPoint < _.slideCount) {\n                ++pagerQty;\n                breakPoint = counter + _.options.slidesToScroll;\n                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n            }\n        } else if (_.options.centerMode === true) {\n            pagerQty = _.slideCount;\n        } else if(!_.options.asNavFor) {\n            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);\n        }else {\n            while (breakPoint < _.slideCount) {\n                ++pagerQty;\n                breakPoint = counter + _.options.slidesToScroll;\n                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n            }\n        }\n\n        return pagerQty - 1;\n\n    };\n\n    Slick.prototype.getLeft = function(slideIndex) {\n\n        var _ = this,\n            targetLeft,\n            verticalHeight,\n            verticalOffset = 0,\n            targetSlide;\n\n        _.slideOffset = 0;\n        verticalHeight = _.$slides.first().outerHeight(true);\n\n        if (_.options.infinite === true) {\n            if (_.slideCount > _.options.slidesToShow) {\n                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;\n                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;\n            }\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {\n                    if (slideIndex > _.slideCount) {\n                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;\n                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;\n                    } else {\n                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;\n                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;\n                    }\n                }\n            }\n        } else {\n            if (slideIndex + _.options.slidesToShow > _.slideCount) {\n                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;\n                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;\n            }\n        }\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            _.slideOffset = 0;\n            verticalOffset = 0;\n        }\n\n        if (_.options.centerMode === true && _.options.infinite === true) {\n            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;\n        } else if (_.options.centerMode === true) {\n            _.slideOffset = 0;\n            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);\n        }\n\n        if (_.options.vertical === false) {\n            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;\n        } else {\n            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;\n        }\n\n        if (_.options.variableWidth === true) {\n\n            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {\n                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);\n            } else {\n                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);\n            }\n\n            if (_.options.rtl === true) {\n                if (targetSlide[0]) {\n                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;\n                } else {\n                    targetLeft =  0;\n                }\n            } else {\n                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;\n            }\n\n            if (_.options.centerMode === true) {\n                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {\n                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);\n                } else {\n                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);\n                }\n\n                if (_.options.rtl === true) {\n                    if (targetSlide[0]) {\n                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;\n                    } else {\n                        targetLeft =  0;\n                    }\n                } else {\n                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;\n                }\n\n                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;\n            }\n        }\n\n        return targetLeft;\n\n    };\n\n    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {\n\n        var _ = this;\n\n        return _.options[option];\n\n    };\n\n    Slick.prototype.getNavigableIndexes = function() {\n\n        var _ = this,\n            breakPoint = 0,\n            counter = 0,\n            indexes = [],\n            max;\n\n        if (_.options.infinite === false) {\n            max = _.slideCount;\n        } else {\n            breakPoint = _.options.slidesToScroll * -1;\n            counter = _.options.slidesToScroll * -1;\n            max = _.slideCount * 2;\n        }\n\n        while (breakPoint < max) {\n            indexes.push(breakPoint);\n            breakPoint = counter + _.options.slidesToScroll;\n            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n        }\n\n        return indexes;\n\n    };\n\n    Slick.prototype.getSlick = function() {\n\n        return this;\n\n    };\n\n    Slick.prototype.getSlideCount = function() {\n\n        var _ = this,\n            slidesTraversed, swipedSlide, centerOffset;\n\n        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;\n\n        if (_.options.swipeToSlide === true) {\n            _.$slideTrack.find('.slick-slide').each(function(index, slide) {\n                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {\n                    swipedSlide = slide;\n                    return false;\n                }\n            });\n\n            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;\n\n            return slidesTraversed;\n\n        } else {\n            return _.options.slidesToScroll;\n        }\n\n    };\n\n    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'index',\n                index: parseInt(slide)\n            }\n        }, dontAnimate);\n\n    };\n\n    Slick.prototype.init = function(creation) {\n\n        var _ = this;\n\n        if (!$(_.$slider).hasClass('slick-initialized')) {\n\n            $(_.$slider).addClass('slick-initialized');\n\n            _.buildRows();\n            _.buildOut();\n            _.setProps();\n            _.startLoad();\n            _.loadSlider();\n            _.initializeEvents();\n            _.updateArrows();\n            _.updateDots();\n            _.checkResponsive(true);\n            _.focusHandler();\n\n        }\n\n        if (creation) {\n            _.$slider.trigger('init', [_]);\n        }\n\n        if (_.options.accessibility === true) {\n            _.initADA();\n        }\n\n        if ( _.options.autoplay ) {\n\n            _.paused = false;\n            _.autoPlay();\n\n        }\n\n    };\n\n    Slick.prototype.initADA = function() {\n        var _ = this;\n        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({\n            'aria-hidden': 'true',\n            'tabindex': '-1'\n        }).find('a, input, button, select').attr({\n            'tabindex': '-1'\n        });\n\n        _.$slideTrack.attr('role', 'listbox');\n\n        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {\n            $(this).attr({\n                'role': 'option',\n                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''\n            });\n        });\n\n        if (_.$dots !== null) {\n            _.$dots.attr('role', 'tablist').find('li').each(function(i) {\n                $(this).attr({\n                    'role': 'presentation',\n                    'aria-selected': 'false',\n                    'aria-controls': 'navigation' + _.instanceUid + i + '',\n                    'id': 'slick-slide' + _.instanceUid + i + ''\n                });\n            })\n                .first().attr('aria-selected', 'true').end()\n                .find('button').attr('role', 'button').end()\n                .closest('div').attr('role', 'toolbar');\n        }\n        _.activateADA();\n\n    };\n\n    Slick.prototype.initArrowEvents = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n            _.$prevArrow\n               .off('click.slick')\n               .on('click.slick', {\n                    message: 'previous'\n               }, _.changeSlide);\n            _.$nextArrow\n               .off('click.slick')\n               .on('click.slick', {\n                    message: 'next'\n               }, _.changeSlide);\n        }\n\n    };\n\n    Slick.prototype.initDotEvents = function() {\n\n        var _ = this;\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n            $('li', _.$dots).on('click.slick', {\n                message: 'index'\n            }, _.changeSlide);\n        }\n\n        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {\n\n            $('li', _.$dots)\n                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))\n                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n        }\n\n    };\n\n    Slick.prototype.initSlideEvents = function() {\n\n        var _ = this;\n\n        if ( _.options.pauseOnHover ) {\n\n            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));\n            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n        }\n\n    };\n\n    Slick.prototype.initializeEvents = function() {\n\n        var _ = this;\n\n        _.initArrowEvents();\n\n        _.initDotEvents();\n        _.initSlideEvents();\n\n        _.$list.on('touchstart.slick mousedown.slick', {\n            action: 'start'\n        }, _.swipeHandler);\n        _.$list.on('touchmove.slick mousemove.slick', {\n            action: 'move'\n        }, _.swipeHandler);\n        _.$list.on('touchend.slick mouseup.slick', {\n            action: 'end'\n        }, _.swipeHandler);\n        _.$list.on('touchcancel.slick mouseleave.slick', {\n            action: 'end'\n        }, _.swipeHandler);\n\n        _.$list.on('click.slick', _.clickHandler);\n\n        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));\n\n        if (_.options.accessibility === true) {\n            _.$list.on('keydown.slick', _.keyHandler);\n        }\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().on('click.slick', _.selectHandler);\n        }\n\n        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));\n\n        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));\n\n        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);\n\n        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);\n        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);\n\n    };\n\n    Slick.prototype.initUI = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$prevArrow.show();\n            _.$nextArrow.show();\n\n        }\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$dots.show();\n\n        }\n\n    };\n\n    Slick.prototype.keyHandler = function(event) {\n\n        var _ = this;\n         //Dont slide if the cursor is inside the form fields and arrow keys are pressed\n        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {\n            if (event.keyCode === 37 && _.options.accessibility === true) {\n                _.changeSlide({\n                    data: {\n                        message: _.options.rtl === true ? 'next' :  'previous'\n                    }\n                });\n            } else if (event.keyCode === 39 && _.options.accessibility === true) {\n                _.changeSlide({\n                    data: {\n                        message: _.options.rtl === true ? 'previous' : 'next'\n                    }\n                });\n            }\n        }\n\n    };\n\n    Slick.prototype.lazyLoad = function() {\n\n        var _ = this,\n            loadRange, cloneRange, rangeStart, rangeEnd;\n\n        function loadImages(imagesScope) {\n\n            $('img[data-lazy]', imagesScope).each(function() {\n\n                var image = $(this),\n                    imageSource = $(this).attr('data-lazy'),\n                    imageToLoad = document.createElement('img');\n\n                imageToLoad.onload = function() {\n\n                    image\n                        .animate({ opacity: 0 }, 100, function() {\n                            image\n                                .attr('src', imageSource)\n                                .animate({ opacity: 1 }, 200, function() {\n                                    image\n                                        .removeAttr('data-lazy')\n                                        .removeClass('slick-loading');\n                                });\n                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);\n                        });\n\n                };\n\n                imageToLoad.onerror = function() {\n\n                    image\n                        .removeAttr( 'data-lazy' )\n                        .removeClass( 'slick-loading' )\n                        .addClass( 'slick-lazyload-error' );\n\n                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);\n\n                };\n\n                imageToLoad.src = imageSource;\n\n            });\n\n        }\n\n        if (_.options.centerMode === true) {\n            if (_.options.infinite === true) {\n                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);\n                rangeEnd = rangeStart + _.options.slidesToShow + 2;\n            } else {\n                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));\n                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;\n            }\n        } else {\n            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;\n            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);\n            if (_.options.fade === true) {\n                if (rangeStart > 0) rangeStart--;\n                if (rangeEnd <= _.slideCount) rangeEnd++;\n            }\n        }\n\n        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);\n        loadImages(loadRange);\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            cloneRange = _.$slider.find('.slick-slide');\n            loadImages(cloneRange);\n        } else\n        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {\n            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);\n            loadImages(cloneRange);\n        } else if (_.currentSlide === 0) {\n            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);\n            loadImages(cloneRange);\n        }\n\n    };\n\n    Slick.prototype.loadSlider = function() {\n\n        var _ = this;\n\n        _.setPosition();\n\n        _.$slideTrack.css({\n            opacity: 1\n        });\n\n        _.$slider.removeClass('slick-loading');\n\n        _.initUI();\n\n        if (_.options.lazyLoad === 'progressive') {\n            _.progressiveLazyLoad();\n        }\n\n    };\n\n    Slick.prototype.next = Slick.prototype.slickNext = function() {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'next'\n            }\n        });\n\n    };\n\n    Slick.prototype.orientationChange = function() {\n\n        var _ = this;\n\n        _.checkResponsive();\n        _.setPosition();\n\n    };\n\n    Slick.prototype.pause = Slick.prototype.slickPause = function() {\n\n        var _ = this;\n\n        _.autoPlayClear();\n        _.paused = true;\n\n    };\n\n    Slick.prototype.play = Slick.prototype.slickPlay = function() {\n\n        var _ = this;\n\n        _.autoPlay();\n        _.options.autoplay = true;\n        _.paused = false;\n        _.focussed = false;\n        _.interrupted = false;\n\n    };\n\n    Slick.prototype.postSlide = function(index) {\n\n        var _ = this;\n\n        if( !_.unslicked ) {\n\n            _.$slider.trigger('afterChange', [_, index]);\n\n            _.animating = false;\n\n            _.setPosition();\n\n            _.swipeLeft = null;\n\n            if ( _.options.autoplay ) {\n                _.autoPlay();\n            }\n\n            if (_.options.accessibility === true) {\n                _.initADA();\n            }\n\n        }\n\n    };\n\n    Slick.prototype.prev = Slick.prototype.slickPrev = function() {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'previous'\n            }\n        });\n\n    };\n\n    Slick.prototype.preventDefault = function(event) {\n\n        event.preventDefault();\n\n    };\n\n    Slick.prototype.progressiveLazyLoad = function( tryCount ) {\n\n        tryCount = tryCount || 1;\n\n        var _ = this,\n            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),\n            image,\n            imageSource,\n            imageToLoad;\n\n        if ( $imgsToLoad.length ) {\n\n            image = $imgsToLoad.first();\n            imageSource = image.attr('data-lazy');\n            imageToLoad = document.createElement('img');\n\n            imageToLoad.onload = function() {\n\n                image\n                    .attr( 'src', imageSource )\n                    .removeAttr('data-lazy')\n                    .removeClass('slick-loading');\n\n                if ( _.options.adaptiveHeight === true ) {\n                    _.setPosition();\n                }\n\n                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);\n                _.progressiveLazyLoad();\n\n            };\n\n            imageToLoad.onerror = function() {\n\n                if ( tryCount < 3 ) {\n\n                    /**\n                     * try to load the image 3 times,\n                     * leave a slight delay so we don't get\n                     * servers blocking the request.\n                     */\n                    setTimeout( function() {\n                        _.progressiveLazyLoad( tryCount + 1 );\n                    }, 500 );\n\n                } else {\n\n                    image\n                        .removeAttr( 'data-lazy' )\n                        .removeClass( 'slick-loading' )\n                        .addClass( 'slick-lazyload-error' );\n\n                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);\n\n                    _.progressiveLazyLoad();\n\n                }\n\n            };\n\n            imageToLoad.src = imageSource;\n\n        } else {\n\n            _.$slider.trigger('allImagesLoaded', [ _ ]);\n\n        }\n\n    };\n\n    Slick.prototype.refresh = function( initializing ) {\n\n        var _ = this, currentSlide, lastVisibleIndex;\n\n        lastVisibleIndex = _.slideCount - _.options.slidesToShow;\n\n        // in non-infinite sliders, we don't want to go past the\n        // last visible index.\n        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {\n            _.currentSlide = lastVisibleIndex;\n        }\n\n        // if less slides than to show, go to start.\n        if ( _.slideCount <= _.options.slidesToShow ) {\n            _.currentSlide = 0;\n\n        }\n\n        currentSlide = _.currentSlide;\n\n        _.destroy(true);\n\n        $.extend(_, _.initials, { currentSlide: currentSlide });\n\n        _.init();\n\n        if( !initializing ) {\n\n            _.changeSlide({\n                data: {\n                    message: 'index',\n                    index: currentSlide\n                }\n            }, false);\n\n        }\n\n    };\n\n    Slick.prototype.registerBreakpoints = function() {\n\n        var _ = this, breakpoint, currentBreakpoint, l,\n            responsiveSettings = _.options.responsive || null;\n\n        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {\n\n            _.respondTo = _.options.respondTo || 'window';\n\n            for ( breakpoint in responsiveSettings ) {\n\n                l = _.breakpoints.length-1;\n                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;\n\n                if (responsiveSettings.hasOwnProperty(breakpoint)) {\n\n                    // loop through the breakpoints and cut out any existing\n                    // ones with the same breakpoint number, we don't want dupes.\n                    while( l >= 0 ) {\n                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {\n                            _.breakpoints.splice(l,1);\n                        }\n                        l--;\n                    }\n\n                    _.breakpoints.push(currentBreakpoint);\n                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;\n\n                }\n\n            }\n\n            _.breakpoints.sort(function(a, b) {\n                return ( _.options.mobileFirst ) ? a-b : b-a;\n            });\n\n        }\n\n    };\n\n    Slick.prototype.reinit = function() {\n\n        var _ = this;\n\n        _.$slides =\n            _.$slideTrack\n                .children(_.options.slide)\n                .addClass('slick-slide');\n\n        _.slideCount = _.$slides.length;\n\n        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {\n            _.currentSlide = _.currentSlide - _.options.slidesToScroll;\n        }\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            _.currentSlide = 0;\n        }\n\n        _.registerBreakpoints();\n\n        _.setProps();\n        _.setupInfinite();\n        _.buildArrows();\n        _.updateArrows();\n        _.initArrowEvents();\n        _.buildDots();\n        _.updateDots();\n        _.initDotEvents();\n        _.cleanUpSlideEvents();\n        _.initSlideEvents();\n\n        _.checkResponsive(false, true);\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().on('click.slick', _.selectHandler);\n        }\n\n        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);\n\n        _.setPosition();\n        _.focusHandler();\n\n        _.paused = !_.options.autoplay;\n        _.autoPlay();\n\n        _.$slider.trigger('reInit', [_]);\n\n    };\n\n    Slick.prototype.resize = function() {\n\n        var _ = this;\n\n        if ($(window).width() !== _.windowWidth) {\n            clearTimeout(_.windowDelay);\n            _.windowDelay = window.setTimeout(function() {\n                _.windowWidth = $(window).width();\n                _.checkResponsive();\n                if( !_.unslicked ) { _.setPosition(); }\n            }, 50);\n        }\n    };\n\n    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {\n\n        var _ = this;\n\n        if (typeof(index) === 'boolean') {\n            removeBefore = index;\n            index = removeBefore === true ? 0 : _.slideCount - 1;\n        } else {\n            index = removeBefore === true ? --index : index;\n        }\n\n        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {\n            return false;\n        }\n\n        _.unload();\n\n        if (removeAll === true) {\n            _.$slideTrack.children().remove();\n        } else {\n            _.$slideTrack.children(this.options.slide).eq(index).remove();\n        }\n\n        _.$slides = _.$slideTrack.children(this.options.slide);\n\n        _.$slideTrack.children(this.options.slide).detach();\n\n        _.$slideTrack.append(_.$slides);\n\n        _.$slidesCache = _.$slides;\n\n        _.reinit();\n\n    };\n\n    Slick.prototype.setCSS = function(position) {\n\n        var _ = this,\n            positionProps = {},\n            x, y;\n\n        if (_.options.rtl === true) {\n            position = -position;\n        }\n        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';\n        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';\n\n        positionProps[_.positionProp] = position;\n\n        if (_.transformsEnabled === false) {\n            _.$slideTrack.css(positionProps);\n        } else {\n            positionProps = {};\n            if (_.cssTransitions === false) {\n                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';\n                _.$slideTrack.css(positionProps);\n            } else {\n                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';\n                _.$slideTrack.css(positionProps);\n            }\n        }\n\n    };\n\n    Slick.prototype.setDimensions = function() {\n\n        var _ = this;\n\n        if (_.options.vertical === false) {\n            if (_.options.centerMode === true) {\n                _.$list.css({\n                    padding: ('0px ' + _.options.centerPadding)\n                });\n            }\n        } else {\n            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);\n            if (_.options.centerMode === true) {\n                _.$list.css({\n                    padding: (_.options.centerPadding + ' 0px')\n                });\n            }\n        }\n\n        _.listWidth = _.$list.width();\n        _.listHeight = _.$list.height();\n\n\n        if (_.options.vertical === false && _.options.variableWidth === false) {\n            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);\n            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));\n\n        } else if (_.options.variableWidth === true) {\n            _.$slideTrack.width(5000 * _.slideCount);\n        } else {\n            _.slideWidth = Math.ceil(_.listWidth);\n            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));\n        }\n\n        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();\n        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);\n\n    };\n\n    Slick.prototype.setFade = function() {\n\n        var _ = this,\n            targetLeft;\n\n        _.$slides.each(function(index, element) {\n            targetLeft = (_.slideWidth * index) * -1;\n            if (_.options.rtl === true) {\n                $(element).css({\n                    position: 'relative',\n                    right: targetLeft,\n                    top: 0,\n                    zIndex: _.options.zIndex - 2,\n                    opacity: 0\n                });\n            } else {\n                $(element).css({\n                    position: 'relative',\n                    left: targetLeft,\n                    top: 0,\n                    zIndex: _.options.zIndex - 2,\n                    opacity: 0\n                });\n            }\n        });\n\n        _.$slides.eq(_.currentSlide).css({\n            zIndex: _.options.zIndex - 1,\n            opacity: 1\n        });\n\n    };\n\n    Slick.prototype.setHeight = function() {\n\n        var _ = this;\n\n        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {\n            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);\n            _.$list.css('height', targetHeight);\n        }\n\n    };\n\n    Slick.prototype.setOption =\n    Slick.prototype.slickSetOption = function() {\n\n        /**\n         * accepts arguments in format of:\n         *\n         *  - for changing a single option's value:\n         *     .slick(\"setOption\", option, value, refresh )\n         *\n         *  - for changing a set of responsive options:\n         *     .slick(\"setOption\", 'responsive', [{}, ...], refresh )\n         *\n         *  - for updating multiple values at once (not responsive)\n         *     .slick(\"setOption\", { 'option': value, ... }, refresh )\n         */\n\n        var _ = this, l, item, option, value, refresh = false, type;\n\n        if( $.type( arguments[0] ) === 'object' ) {\n\n            option =  arguments[0];\n            refresh = arguments[1];\n            type = 'multiple';\n\n        } else if ( $.type( arguments[0] ) === 'string' ) {\n\n            option =  arguments[0];\n            value = arguments[1];\n            refresh = arguments[2];\n\n            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {\n\n                type = 'responsive';\n\n            } else if ( typeof arguments[1] !== 'undefined' ) {\n\n                type = 'single';\n\n            }\n\n        }\n\n        if ( type === 'single' ) {\n\n            _.options[option] = value;\n\n\n        } else if ( type === 'multiple' ) {\n\n            $.each( option , function( opt, val ) {\n\n                _.options[opt] = val;\n\n            });\n\n\n        } else if ( type === 'responsive' ) {\n\n            for ( item in value ) {\n\n                if( $.type( _.options.responsive ) !== 'array' ) {\n\n                    _.options.responsive = [ value[item] ];\n\n                } else {\n\n                    l = _.options.responsive.length-1;\n\n                    // loop through the responsive object and splice out duplicates.\n                    while( l >= 0 ) {\n\n                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {\n\n                            _.options.responsive.splice(l,1);\n\n                        }\n\n                        l--;\n\n                    }\n\n                    _.options.responsive.push( value[item] );\n\n                }\n\n            }\n\n        }\n\n        if ( refresh ) {\n\n            _.unload();\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.setPosition = function() {\n\n        var _ = this;\n\n        _.setDimensions();\n\n        _.setHeight();\n\n        if (_.options.fade === false) {\n            _.setCSS(_.getLeft(_.currentSlide));\n        } else {\n            _.setFade();\n        }\n\n        _.$slider.trigger('setPosition', [_]);\n\n    };\n\n    Slick.prototype.setProps = function() {\n\n        var _ = this,\n            bodyStyle = document.body.style;\n\n        _.positionProp = _.options.vertical === true ? 'top' : 'left';\n\n        if (_.positionProp === 'top') {\n            _.$slider.addClass('slick-vertical');\n        } else {\n            _.$slider.removeClass('slick-vertical');\n        }\n\n        if (bodyStyle.WebkitTransition !== undefined ||\n            bodyStyle.MozTransition !== undefined ||\n            bodyStyle.msTransition !== undefined) {\n            if (_.options.useCSS === true) {\n                _.cssTransitions = true;\n            }\n        }\n\n        if ( _.options.fade ) {\n            if ( typeof _.options.zIndex === 'number' ) {\n                if( _.options.zIndex < 3 ) {\n                    _.options.zIndex = 3;\n                }\n            } else {\n                _.options.zIndex = _.defaults.zIndex;\n            }\n        }\n\n        if (bodyStyle.OTransform !== undefined) {\n            _.animType = 'OTransform';\n            _.transformType = '-o-transform';\n            _.transitionType = 'OTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.MozTransform !== undefined) {\n            _.animType = 'MozTransform';\n            _.transformType = '-moz-transform';\n            _.transitionType = 'MozTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.webkitTransform !== undefined) {\n            _.animType = 'webkitTransform';\n            _.transformType = '-webkit-transform';\n            _.transitionType = 'webkitTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.msTransform !== undefined) {\n            _.animType = 'msTransform';\n            _.transformType = '-ms-transform';\n            _.transitionType = 'msTransition';\n            if (bodyStyle.msTransform === undefined) _.animType = false;\n        }\n        if (bodyStyle.transform !== undefined && _.animType !== false) {\n            _.animType = 'transform';\n            _.transformType = 'transform';\n            _.transitionType = 'transition';\n        }\n        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);\n    };\n\n\n    Slick.prototype.setSlideClasses = function(index) {\n\n        var _ = this,\n            centerOffset, allSlides, indexOffset, remainder;\n\n        allSlides = _.$slider\n            .find('.slick-slide')\n            .removeClass('slick-active slick-center slick-current')\n            .attr('aria-hidden', 'true');\n\n        _.$slides\n            .eq(index)\n            .addClass('slick-current');\n\n        if (_.options.centerMode === true) {\n\n            centerOffset = Math.floor(_.options.slidesToShow / 2);\n\n            if (_.options.infinite === true) {\n\n                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {\n\n                    _.$slides\n                        .slice(index - centerOffset, index + centerOffset + 1)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                } else {\n\n                    indexOffset = _.options.slidesToShow + index;\n                    allSlides\n                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                }\n\n                if (index === 0) {\n\n                    allSlides\n                        .eq(allSlides.length - 1 - _.options.slidesToShow)\n                        .addClass('slick-center');\n\n                } else if (index === _.slideCount - 1) {\n\n                    allSlides\n                        .eq(_.options.slidesToShow)\n                        .addClass('slick-center');\n\n                }\n\n            }\n\n            _.$slides\n                .eq(index)\n                .addClass('slick-center');\n\n        } else {\n\n            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {\n\n                _.$slides\n                    .slice(index, index + _.options.slidesToShow)\n                    .addClass('slick-active')\n                    .attr('aria-hidden', 'false');\n\n            } else if (allSlides.length <= _.options.slidesToShow) {\n\n                allSlides\n                    .addClass('slick-active')\n                    .attr('aria-hidden', 'false');\n\n            } else {\n\n                remainder = _.slideCount % _.options.slidesToShow;\n                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;\n\n                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {\n\n                    allSlides\n                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                } else {\n\n                    allSlides\n                        .slice(indexOffset, indexOffset + _.options.slidesToShow)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                }\n\n            }\n\n        }\n\n        if (_.options.lazyLoad === 'ondemand') {\n            _.lazyLoad();\n        }\n\n    };\n\n    Slick.prototype.setupInfinite = function() {\n\n        var _ = this,\n            i, slideIndex, infiniteCount;\n\n        if (_.options.fade === true) {\n            _.options.centerMode = false;\n        }\n\n        if (_.options.infinite === true && _.options.fade === false) {\n\n            slideIndex = null;\n\n            if (_.slideCount > _.options.slidesToShow) {\n\n                if (_.options.centerMode === true) {\n                    infiniteCount = _.options.slidesToShow + 1;\n                } else {\n                    infiniteCount = _.options.slidesToShow;\n                }\n\n                for (i = _.slideCount; i > (_.slideCount -\n                        infiniteCount); i -= 1) {\n                    slideIndex = i - 1;\n                    $(_.$slides[slideIndex]).clone(true).attr('id', '')\n                        .attr('data-slick-index', slideIndex - _.slideCount)\n                        .prependTo(_.$slideTrack).addClass('slick-cloned');\n                }\n                for (i = 0; i < infiniteCount; i += 1) {\n                    slideIndex = i;\n                    $(_.$slides[slideIndex]).clone(true).attr('id', '')\n                        .attr('data-slick-index', slideIndex + _.slideCount)\n                        .appendTo(_.$slideTrack).addClass('slick-cloned');\n                }\n                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {\n                    $(this).attr('id', '');\n                });\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.interrupt = function( toggle ) {\n\n        var _ = this;\n\n        if( !toggle ) {\n            _.autoPlay();\n        }\n        _.interrupted = toggle;\n\n    };\n\n    Slick.prototype.selectHandler = function(event) {\n\n        var _ = this;\n\n        var targetElement =\n            $(event.target).is('.slick-slide') ?\n                $(event.target) :\n                $(event.target).parents('.slick-slide');\n\n        var index = parseInt(targetElement.attr('data-slick-index'));\n\n        if (!index) index = 0;\n\n        if (_.slideCount <= _.options.slidesToShow) {\n\n            _.setSlideClasses(index);\n            _.asNavFor(index);\n            return;\n\n        }\n\n        _.slideHandler(index);\n\n    };\n\n    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {\n\n        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,\n            _ = this, navTarget;\n\n        sync = sync || false;\n\n        if (_.animating === true && _.options.waitForAnimate === true) {\n            return;\n        }\n\n        if (_.options.fade === true && _.currentSlide === index) {\n            return;\n        }\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            return;\n        }\n\n        if (sync === false) {\n            _.asNavFor(index);\n        }\n\n        targetSlide = index;\n        targetLeft = _.getLeft(targetSlide);\n        slideLeft = _.getLeft(_.currentSlide);\n\n        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;\n\n        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {\n            if (_.options.fade === false) {\n                targetSlide = _.currentSlide;\n                if (dontAnimate !== true) {\n                    _.animateSlide(slideLeft, function() {\n                        _.postSlide(targetSlide);\n                    });\n                } else {\n                    _.postSlide(targetSlide);\n                }\n            }\n            return;\n        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {\n            if (_.options.fade === false) {\n                targetSlide = _.currentSlide;\n                if (dontAnimate !== true) {\n                    _.animateSlide(slideLeft, function() {\n                        _.postSlide(targetSlide);\n                    });\n                } else {\n                    _.postSlide(targetSlide);\n                }\n            }\n            return;\n        }\n\n        if ( _.options.autoplay ) {\n            clearInterval(_.autoPlayTimer);\n        }\n\n        if (targetSlide < 0) {\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);\n            } else {\n                animSlide = _.slideCount + targetSlide;\n            }\n        } else if (targetSlide >= _.slideCount) {\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                animSlide = 0;\n            } else {\n                animSlide = targetSlide - _.slideCount;\n            }\n        } else {\n            animSlide = targetSlide;\n        }\n\n        _.animating = true;\n\n        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);\n\n        oldSlide = _.currentSlide;\n        _.currentSlide = animSlide;\n\n        _.setSlideClasses(_.currentSlide);\n\n        if ( _.options.asNavFor ) {\n\n            navTarget = _.getNavTarget();\n            navTarget = navTarget.slick('getSlick');\n\n            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {\n                navTarget.setSlideClasses(_.currentSlide);\n            }\n\n        }\n\n        _.updateDots();\n        _.updateArrows();\n\n        if (_.options.fade === true) {\n            if (dontAnimate !== true) {\n\n                _.fadeSlideOut(oldSlide);\n\n                _.fadeSlide(animSlide, function() {\n                    _.postSlide(animSlide);\n                });\n\n            } else {\n                _.postSlide(animSlide);\n            }\n            _.animateHeight();\n            return;\n        }\n\n        if (dontAnimate !== true) {\n            _.animateSlide(targetLeft, function() {\n                _.postSlide(animSlide);\n            });\n        } else {\n            _.postSlide(animSlide);\n        }\n\n    };\n\n    Slick.prototype.startLoad = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$prevArrow.hide();\n            _.$nextArrow.hide();\n\n        }\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$dots.hide();\n\n        }\n\n        _.$slider.addClass('slick-loading');\n\n    };\n\n    Slick.prototype.swipeDirection = function() {\n\n        var xDist, yDist, r, swipeAngle, _ = this;\n\n        xDist = _.touchObject.startX - _.touchObject.curX;\n        yDist = _.touchObject.startY - _.touchObject.curY;\n        r = Math.atan2(yDist, xDist);\n\n        swipeAngle = Math.round(r * 180 / Math.PI);\n        if (swipeAngle < 0) {\n            swipeAngle = 360 - Math.abs(swipeAngle);\n        }\n\n        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {\n            return (_.options.rtl === false ? 'left' : 'right');\n        }\n        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {\n            return (_.options.rtl === false ? 'left' : 'right');\n        }\n        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {\n            return (_.options.rtl === false ? 'right' : 'left');\n        }\n        if (_.options.verticalSwiping === true) {\n            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {\n                return 'down';\n            } else {\n                return 'up';\n            }\n        }\n\n        return 'vertical';\n\n    };\n\n    Slick.prototype.swipeEnd = function(event) {\n\n        var _ = this,\n            slideCount,\n            direction;\n\n        _.dragging = false;\n        _.interrupted = false;\n        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;\n\n        if ( _.touchObject.curX === undefined ) {\n            return false;\n        }\n\n        if ( _.touchObject.edgeHit === true ) {\n            _.$slider.trigger('edge', [_, _.swipeDirection() ]);\n        }\n\n        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {\n\n            direction = _.swipeDirection();\n\n            switch ( direction ) {\n\n                case 'left':\n                case 'down':\n\n                    slideCount =\n                        _.options.swipeToSlide ?\n                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :\n                            _.currentSlide + _.getSlideCount();\n\n                    _.currentDirection = 0;\n\n                    break;\n\n                case 'right':\n                case 'up':\n\n                    slideCount =\n                        _.options.swipeToSlide ?\n                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :\n                            _.currentSlide - _.getSlideCount();\n\n                    _.currentDirection = 1;\n\n                    break;\n\n                default:\n\n\n            }\n\n            if( direction != 'vertical' ) {\n\n                _.slideHandler( slideCount );\n                _.touchObject = {};\n                _.$slider.trigger('swipe', [_, direction ]);\n\n            }\n\n        } else {\n\n            if ( _.touchObject.startX !== _.touchObject.curX ) {\n\n                _.slideHandler( _.currentSlide );\n                _.touchObject = {};\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.swipeHandler = function(event) {\n\n        var _ = this;\n\n        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {\n            return;\n        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {\n            return;\n        }\n\n        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?\n            event.originalEvent.touches.length : 1;\n\n        _.touchObject.minSwipe = _.listWidth / _.options\n            .touchThreshold;\n\n        if (_.options.verticalSwiping === true) {\n            _.touchObject.minSwipe = _.listHeight / _.options\n                .touchThreshold;\n        }\n\n        switch (event.data.action) {\n\n            case 'start':\n                _.swipeStart(event);\n                break;\n\n            case 'move':\n                _.swipeMove(event);\n                break;\n\n            case 'end':\n                _.swipeEnd(event);\n                break;\n\n        }\n\n    };\n\n    Slick.prototype.swipeMove = function(event) {\n\n        var _ = this,\n            edgeWasHit = false,\n            curLeft, swipeDirection, swipeLength, positionOffset, touches;\n\n        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;\n\n        if (!_.dragging || touches && touches.length !== 1) {\n            return false;\n        }\n\n        curLeft = _.getLeft(_.currentSlide);\n\n        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;\n        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;\n\n        _.touchObject.swipeLength = Math.round(Math.sqrt(\n            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));\n\n        if (_.options.verticalSwiping === true) {\n            _.touchObject.swipeLength = Math.round(Math.sqrt(\n                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));\n        }\n\n        swipeDirection = _.swipeDirection();\n\n        if (swipeDirection === 'vertical') {\n            return;\n        }\n\n        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {\n            event.preventDefault();\n        }\n\n        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);\n        if (_.options.verticalSwiping === true) {\n            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;\n        }\n\n\n        swipeLength = _.touchObject.swipeLength;\n\n        _.touchObject.edgeHit = false;\n\n        if (_.options.infinite === false) {\n            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {\n                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;\n                _.touchObject.edgeHit = true;\n            }\n        }\n\n        if (_.options.vertical === false) {\n            _.swipeLeft = curLeft + swipeLength * positionOffset;\n        } else {\n            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;\n        }\n        if (_.options.verticalSwiping === true) {\n            _.swipeLeft = curLeft + swipeLength * positionOffset;\n        }\n\n        if (_.options.fade === true || _.options.touchMove === false) {\n            return false;\n        }\n\n        if (_.animating === true) {\n            _.swipeLeft = null;\n            return false;\n        }\n\n        _.setCSS(_.swipeLeft);\n\n    };\n\n    Slick.prototype.swipeStart = function(event) {\n\n        var _ = this,\n            touches;\n\n        _.interrupted = true;\n\n        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {\n            _.touchObject = {};\n            return false;\n        }\n\n        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {\n            touches = event.originalEvent.touches[0];\n        }\n\n        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;\n        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;\n\n        _.dragging = true;\n\n    };\n\n    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {\n\n        var _ = this;\n\n        if (_.$slidesCache !== null) {\n\n            _.unload();\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slidesCache.appendTo(_.$slideTrack);\n\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.unload = function() {\n\n        var _ = this;\n\n        $('.slick-cloned', _.$slider).remove();\n\n        if (_.$dots) {\n            _.$dots.remove();\n        }\n\n        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {\n            _.$prevArrow.remove();\n        }\n\n        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {\n            _.$nextArrow.remove();\n        }\n\n        _.$slides\n            .removeClass('slick-slide slick-active slick-visible slick-current')\n            .attr('aria-hidden', 'true')\n            .css('width', '');\n\n    };\n\n    Slick.prototype.unslick = function(fromBreakpoint) {\n\n        var _ = this;\n        _.$slider.trigger('unslick', [_, fromBreakpoint]);\n        _.destroy();\n\n    };\n\n    Slick.prototype.updateArrows = function() {\n\n        var _ = this,\n            centerOffset;\n\n        centerOffset = Math.floor(_.options.slidesToShow / 2);\n\n        if ( _.options.arrows === true &&\n            _.slideCount > _.options.slidesToShow &&\n            !_.options.infinite ) {\n\n            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            if (_.currentSlide === 0) {\n\n                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {\n\n                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {\n\n                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.updateDots = function() {\n\n        var _ = this;\n\n        if (_.$dots !== null) {\n\n            _.$dots\n                .find('li')\n                .removeClass('slick-active')\n                .attr('aria-hidden', 'true');\n\n            _.$dots\n                .find('li')\n                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))\n                .addClass('slick-active')\n                .attr('aria-hidden', 'false');\n\n        }\n\n    };\n\n    Slick.prototype.visibility = function() {\n\n        var _ = this;\n\n        if ( _.options.autoplay ) {\n\n            if ( document[_.hidden] ) {\n\n                _.interrupted = true;\n\n            } else {\n\n                _.interrupted = false;\n\n            }\n\n        }\n\n    };\n\n    $.fn.slick = function() {\n        var _ = this,\n            opt = arguments[0],\n            args = Array.prototype.slice.call(arguments, 1),\n            l = _.length,\n            i,\n            ret;\n        for (i = 0; i < l; i++) {\n            if (typeof opt == 'object' || typeof opt == 'undefined')\n                _[i].slick = new Slick(_[i], opt);\n            else\n                ret = _[i].slick[opt].apply(_[i].slick, args);\n            if (typeof ret != 'undefined') return ret;\n        }\n        return _;\n    };\n\n}));\n"

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 *
	 * jQuery Form Validation
	 * jquery.validation.js
	 *
	 * Copyright 2017, Stewart Dellow
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
	 *    $('.js-validate').validation({
	 *      ...
	 *      successCallback: function (parameters) {
	 *        console.log(parameters);
	 *      }
	 *    });
	 * If you are using server validation, the `parameters` argument will supply the results of the validation.
	 *
	 *
	 * domains                 : Array. Adds to default array of top level domains for the email checker to spell check against.
	 * serverData              : Object. Data to send with the XHR request (if using server validation).
	 * localStorage            : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
	 * serverValidation        : Boolean. Whether to use server validation or not.
	 * disableAjax             : Boolean. Disables AJAX. serverValidation must be false.
	 * onlyVisibleFields       : Boolean. Whether to only validate against visible fields or not.
	 * appendErrorToPlaceholder: Boolean. Append the error message to the form field placeholder.
	 * disableButtons          : Boolean. Disable the form buttons while processing.
	 * scrollToError           : Boolean. If enabled animates a scroll to the first field with an error.
	 * fadeOutAnimationSpeed   : Integer. Speed to fade out the form on success.
	 * serverURL               : String. A valid URL for the server validation.
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

	;(function ($, window, undefined) {

	  // Email suggester object.
	  var suggester = {};
	  // Set helpers object.
	  var helpers = {};

	  /**
	  * Plugin
	  * Return a unique plugin instance.
	  **/
	  var Plugin = function Plugin(elem, options) {
	    this.elem = elem;
	    this.$elem = $(elem);
	    this.options = options;
	    this.metadata = this.$elem.data('plugin-options');
	  };

	  /**
	  * $.fn.validation
	  * Return a unique plugin instance.
	  **/
	  $.fn.validation = function (options) {
	    return this.each(function () {
	      new Plugin(this, options).init();
	    });
	  };

	  /**
	  * $.fn.validation.defaults
	  * Default options.
	  **/
	  $.fn.validation.defaults = {
	    domains: [],
	    localStorage: true,
	    serverValidation: false,
	    serverURL: false,
	    serverData: {},
	    disableAjax: false,
	    onlyVisibleFields: false,
	    appendErrorToPlaceholder: false,
	    disableButtons: false,
	    scrollToError: false,
	    fadeOutAnimationSpeed: 500,
	    serverID: 'ajaxrequest',
	    emailRegEx: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	    passRegEx: /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
	    urlRegEx: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
	    errorBoxClass: 'js--validation-error',
	    errorClass: 'js--validation-field-error',
	    msgSep: ' -',
	    defaultErrorMsg: 'Please enter a value',
	    defaultSuccessMsg: 'The form has been successfully submitted.',
	    defaultSuggestText: 'Did you mean',
	    errorBoxElement: '<span/>',
	    preloaderTemplate: '<div class="loader" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#FFFFFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
	    validateElement: $('.js--validation-validate'),
	    successElement: $('.js--validation-form-success'),
	    customValidationMethod: null,
	    successCallback: function successCallback(parameters) {}
	  };

	  /**
	  * Plugin.prototype
	  * Init.
	  **/
	  Plugin.prototype = {
	    init: function init() {
	      // Global settings.
	      this.settings = $.extend({}, $.fn.validation.defaults, this.options);
	      // Cache fields.
	      this.fields = $('input, select, textarea', this.$elem);
	      // Cache the reset button element.
	      this.reset = $('button[type="reset"], input[type="reset"]', this.$elem);
	      // Cache the submit button element.
	      this.button = $('button[type="submit"], input[type="submit"]', this.$elem);
	      // Success element.
	      this.successElement = this.settings.successElement.length ? this.settings.successElement : this.$elem.before($('<div class="js--validation-form-success">' + this.settings.defaultSuccessMsg + '</div>'));
	      // Empty array for elements. Set once the form is submitted.
	      this.$elementArray = [];
	      // Do jQuery events.
	      this.events();
	      // Run the plugin.
	      this.run();

	      return this;
	    },
	    events: function events() {
	      var _this = this;

	      // On submit.
	      this.$elem.on('submit', function (e) {
	        e.preventDefault();

	        _this.setFields();
	        _this.process();
	      });
	      // On reset.
	      this.reset.on('click', function (e) {
	        _this.validationReset(e);
	      });
	      // On field change.
	      this.fields.change(function () {
	        _this.saveToLocalStorage($(this));
	      });
	    },
	    run: function run() {
	      // Add 'novalidate' attribute to form.
	      this.$elem.attr('novalidate', 'true');
	      // Process fields.
	      this.processFields();
	      // Get localStorage.
	      this.getLocalStorage();
	    },
	    setFields: function setFields() {
	      var _this = this;

	      // Put all required fields into array.
	      var fieldsArray = $('[required]', this.$elem).map(function () {
	        if (_this.settings.onlyVisibleFields) {
	          if ($(this).is(':visible')) {
	            return $(this).attr('name');
	          }
	        } else {
	          return $(this).attr('name');
	        }
	      });
	      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
	      fieldsArray = helpers.removeDuplicates(fieldsArray);
	      // Reverts the fieldsArray into an array of DOM elements.
	      this.$elementArray = $.map(fieldsArray, function (field, i) {
	        return $('[name="' + field + '"]', _this.$elem);
	      });
	    },
	    processFields: function processFields() {
	      var _this = this;

	      // Put all required fields into array.
	      var fieldsArray = $('[required]', this.$elem).map(function () {
	        if (_this.settings.onlyVisibleFields) {
	          if ($(this).is(':visible')) {
	            return $(this).attr('name');
	          }
	        } else {
	          return $(this).attr('name');
	        }
	      });
	      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
	      fieldsArray = helpers.removeDuplicates(fieldsArray);
	      // Reverts the fieldsArray into an array of DOM elements.
	      this.$elementArray = $.map(fieldsArray, function (field, i) {
	        return $('[name="' + field + '"]', _this.$elem);
	      });

	      $.each(this.$elementArray, function () {
	        // Field type specific actions.
	        switch ($(this).attr('type')) {
	          case 'email':
	            _this.setupEmailField($(this));
	            break;
	          case 'url':
	            _this.setupURLField($(this));
	            break;
	        }
	      });
	    },
	    setup: function setup() {
	      // Global error array.
	      this.errorArray = [];
	      // Create an array for checkboxes and radio inputs.
	      this.groupArray = [];
	      // Create an array for messages that have no fields.
	      this.leftovers = [];
	    },
	    ajaxRequest: function ajaxRequest(url, data) {
	      return $.ajax({
	        type: 'POST',
	        url: url,
	        data: $.extend({}, { ajaxrequest: true }, helpers.parseURLParams(data), this.settings.serverData || {}),
	        dataType: 'JSON',
	        beforeSend: function beforeSend(jqXHR, settings) {
	          // Log full URL.
	          helpers.log(settings.data ? settings.url + '?' + settings.data : settings.url);
	        }
	      });
	    },
	    applyPreloader: function applyPreloader(el) {
	      // Guard :: Check element exists.
	      if (!el.length) return;

	      // Content.
	      var content = JSON.stringify(el.html());
	      // Loader.
	      var loader = $(this.settings.preloaderTemplate).hide();
	      // Apply preloader.
	      el.css({
	        'width': el.outerWidth(),
	        'height': el.outerHeight(),
	        'position': 'relative'
	      }).html(loader).attr('data-loader-content', content).addClass('loading');
	      loader.css({
	        'position': 'absolute',
	        'top': '50%',
	        'left': '50%',
	        'margin-left': -loader.outerWidth() / 2,
	        'margin-top': -loader.outerHeight() / 2
	      }).show();
	    },
	    destroyPreloader: function destroyPreloader(el) {
	      // Guard :: Check element exists.
	      if (!el.length) return;

	      // Content.
	      var content = JSON.parse(el.data('loader-content'));
	      // Remove preloader
	      el.removeClass('loading').html(content).removeAttr('data-loader-content').css({
	        'width': '',
	        'height': '',
	        'position': ''
	      });
	    },
	    disableButton: function disableButton(disable) {
	      if (this.settings.disableButtons) {
	        // Disable
	        if (disable) {
	          // Disable the submit button.
	          this.button.prop('disabled', true);
	        } else {
	          // Enable the submit button.
	          this.button.prop('disabled', false);
	        }
	      }
	    },
	    clearLocalStorage: function clearLocalStorage() {
	      this.fields.each(function () {
	        localStorage.removeItem($(this).attr('name'));
	      });
	    },
	    getLocalStorage: function getLocalStorage() {
	      if (this.settings.localStorage && typeof Storage !== 'undefined') {
	        this.fields.each(function () {
	          // Vars
	          var inputName = $(this).attr('name');

	          if (localStorage[inputName]) {
	            if ($(this).is('select')) {
	              $('option[selected="selected"]', this).removeAttr('selected');
	              $('option[value="' + localStorage[inputName] + '"]', this).prop('selected', true);
	            } else if ($(this).is('input[type="radio"]')) {
	              if ($(this).val() == localStorage[inputName]) {
	                $(this).prop('checked', true);
	              }
	            } else if ($(this).is('input[type="checkbox"]')) {
	              var checkboxes = localStorage[inputName].split(',');
	              $('input[name="' + inputName + '"]').each(function (i) {
	                if (checkboxes[i] != '' && $(this).val() == checkboxes[i]) {
	                  $(this).prop('checked', true);
	                }
	              });
	            } else {
	              $(this).val(localStorage[inputName]);
	            }
	          }
	        });
	      }
	    },
	    saveToLocalStorage: function saveToLocalStorage(el) {
	      // Guard :: Check element exists.
	      if (!el.length) return;

	      if (this.settings.localStorage && typeof Storage !== 'undefined') {
	        // Vars
	        var inputName = el.attr('name');

	        if (el.is('input[type="checkbox"]')) {
	          // Vars
	          var checkboxArray = [];

	          $('input[name="' + inputName + '"]').each(function (i) {
	            if ($(this).is(':checked')) {
	              checkboxArray.push($(this).val());
	            } else {
	              checkboxArray.push('');
	            }
	          });
	          localStorage[inputName] = checkboxArray;
	        } else {
	          localStorage[inputName] = el.val();
	        }
	      }
	    },
	    setupEmailField: function setupEmailField(el) {
	      var _this = this;

	      // Guard :: Check element exists.
	      if (!el.length) return;

	      el.after($('<div class="js--validation-suggestion">' + this.settings.defaultSuggestText + ' <a href="#" class="js--validation-alternative-email"><span class="js--validation-address">address</span>@<span class="js--validation-domain">domain.com</span></a>?</div>'));

	      el.on('blur', function () {
	        suggester.init(_this, el, _this.settings.domains);
	      });
	    },
	    setupURLField: function setupURLField(el) {
	      // Guard :: Check element exists.
	      if (!el.length) return;

	      el.on('blur', function () {
	        var value = el.val();
	        if (value !== '' && !value.match(/^http([s]?):\/\/.*/)) {
	          el.val('http://' + value);
	        }
	      });
	    },
	    resetErrors: function resetErrors(form) {
	      // Set form.
	      form = typeof form !== 'undefined' ? form : this;
	      // Remove error class from form.
	      form.$elem.removeClass('js--validation-form-has-errors');
	      // Remove generic form messages.
	      $('.js--validation-form-messages').empty();
	      // Remove error class from fields.
	      $('.js--validation-field-has-errors', form.$elem).removeClass('js--validation-field-has-errors');
	      // Remove error class from fieldsets.
	      $('.js--validation-fieldset-has-errors', form.$elem).removeClass('js--validation-fieldset-has-errors');
	      // Remove error class from inputs with placeholder error..
	      $('.js--validation-field--placeholder', form.$elem).removeClass('js--validation-field--placeholder');
	      $('.js--validation-field--placeholder--span', form.$elem).remove();
	      // Hide email suggester.
	      $('.js--validation-suggestion', form.$elem).hide();
	      // Remove current classes.
	      $('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass);
	      $('.' + form.settings.errorBoxClass, form.$elem).remove();
	    },
	    attachErrors: function attachErrors(arr) {
	      var _this = this;

	      // Remove empty elements.
	      arr = jQuery.grep(arr, function (n, i) {
	        return n !== "" && n != null;
	      });
	      // Remove previous errors.
	      this.resetErrors();
	      // Un-disable stuff.
	      this.disableButton(false);
	      // Add error class to form.
	      this.$elem.addClass('js--validation-form-has-errors');
	      // Add new ones.
	      $.each(arr, function (index) {
	        if ($(this) == undefined) {
	          return;
	        }
	        var a = $(this),
	            el = a[0].input;

	        // Get error message.
	        var error = a[0].msg !== '' ? a[0].msg : _this.settings.defaultErrorMsg;
	        // Separator.
	        var message = _this.settings.msgSep ? error ? _this.settings.msgSep + ' <span class="js--validation-msg">' + error + '</span>' : '' : '<span class="js--validation-msg">' + error + '</span>';

	        // Check element exists in the DOM.
	        if (el.length && el.is(':input') && el.attr('type') !== 'hidden') {
	          // Apply error class to field.
	          el.addClass(_this.settings.errorClass).parent().addClass('js-validation-field-has-errors');
	          // Field specific actions.
	          if (el.attr('type') === 'checkbox' || el.attr('type') === 'radio') {
	            // Add error element to field.
	            el.parent().find('label, .label').first().append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message));
	            // Apply to nearest label if checkbox or radio.
	            el.closest('label').addClass(_this.settings.errorClass);
	          } else {
	            if (_this.settings.appendErrorToPlaceholder) {
	              // Find label.
	              el.parent().find('label, .label').addClass(_this.settings.errorClass);
	              // Check value length.
	              if (el.val().length > 0) {
	                // Add error class to placeholder.
	                el.parent().addClass('js-validation-field--placeholder');
	                // Add a span to the field.
	                el.before('<span class="js-validation-field--placeholder--span">' + error + '</span>');
	              } else {
	                // Add error to placeholder.
	                el.attr('placeholder', error);
	              }
	            } else {
	              // Add error element to field.
	              el.parent().find('label, .label').append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message));
	            }
	          }
	          // Set errors on fieldset.
	          el.closest('fieldset').addClass('js--validation-fieldset-has-errors');
	          // Scroll to first error field.
	          if (index == 0 && _this.settings.scrollToError) {
	            // Determine fieldset.
	            var fieldset = el.parentsUntil('fieldset').parent();
	            // Check if el has parent fieldset.
	            if (fieldset.length) {
	              $('html, body').animate({
	                scrollTop: fieldset.offset().top - 25
	              }, 500);
	            } else {
	              $('html, body').animate({
	                scrollTop: el.offset().top - 25
	              }, 500);
	            }
	          }
	        } else if (!el.is(':input')) {
	          el.prepend('<p>' + error + '</p>').show();
	        } else {
	          _this.leftovers.push(error);
	        }
	      });
	    },
	    fieldChecker: function fieldChecker(field) {
	      var obj;
	      var msg = field.data('validation-message') || '';

	      // Checkboxes and radio.
	      if ((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0) {
	        return obj = {
	          input: field,
	          msg: msg
	        };
	      }
	      // Email fields.
	      else if (field.attr('type') === 'email' && !this.settings.emailRegEx.test(field.val())) {
	          return obj = {
	            input: field,
	            msg: msg
	          };
	        }
	        // URL fields.
	        else if (field.attr('type') === 'url' && !this.settings.urlRegEx.test(field.val())) {
	            return obj = {
	              input: field,
	              msg: msg
	            };
	          }
	          // Check for existence.
	          else if (field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-') {
	              return obj = {
	                input: field,
	                msg: msg
	              };
	            }
	    },
	    jsValidateFields: function jsValidateFields() {
	      var _this = this;

	      // Put all empty fields into array.
	      this.errorArray = $.map(this.$elementArray, function (field, i) {
	        return _this.fieldChecker(field);
	      });
	      // Custom validation method.
	      if ($.isFunction(this.settings.customValidationMethod)) {
	        _this.errorArray.push(_this.settings.customValidationMethod());
	      }
	      // Validate non required fields with length.
	      this.$elem.find(this.settings.validateElement).each(function () {
	        if ($(this).val() !== '') {
	          _this.errorArray.push(_this.fieldChecker($(this)));
	        }
	      });

	      return _this.errorArray.length === 0 ? _this.success('js', null) : _this.validationFailure();
	    },
	    serverValidateFields: function serverValidateFields() {
	      var _this = this;

	      // Check for a form action.
	      if (_this.settings.serverURL) {
	        // Set flag.
	        var fatalerror = false;
	        // Ajax request.
	        var ajaxPromise = _this.ajaxRequest(_this.settings.serverURL, _this.$elem.serialize());
	        // Process promise.
	        ajaxPromise.done(function (res) {
	          // If error.
	          if (res.type == 'error') {
	            if (_typeof(res.response) == 'object') {
	              // Loops through the response and adds them to the errorArray.
	              for (var i = 0, ii = res.response.length; i < ii; i++) {
	                var obj = {
	                  input: res.response[i].field.indexOf('.') === 0 ? $(res.response[i].field) : $('[name="' + res.response[i].field + '"]', _this.$elem),
	                  msg: res.response[i].msg
	                };
	                _this.errorArray.push(obj);
	              }
	            }
	          }
	          // Array of elements for the callback.
	          var formEntries = _this.$elem.serializeArray();

	          return _this.errorArray.length === 0 && !fatalerror ? _this.success('server', formEntries, res) : _this.validationFailure();
	        }).fail(function (res, ajaxOptions, thrownError) {
	          // Log it.
	          helpers.log(thrownError);
	          // Set error.
	          fatalerror = true;
	        });
	      } else {
	        // Error message.
	        helpers.log("You must supply a valid URL with the serverURL option in order to use server validation.");

	        return this.validationFailure();
	      }
	    },
	    success: function success(type, callbackParameters, formResponse) {
	      var _this = this;

	      // Clear localStorage.
	      this.clearLocalStorage();
	      // If we have a custom post function.
	      if (type == 'server') {
	        this.$elem.fadeOut(this.settings.fadeOutAnimationSpeed, function () {
	          // Validation Complete.
	          _this.validateSuccess();
	          // Fade in success element.
	          _this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2);
	          // Callback
	          _this.settings.successCallback.call(this, callbackParameters, formResponse);
	        });
	      } else if (!this.settings.disableAjax && type == 'js') {
	        // Ajax request.
	        var ajaxPromise = this.ajaxRequest(this.settings.serverURL, this.$elem.serialize() + '&' + this.settings.serverID + '=true');

	        // Process promise.
	        ajaxPromise.always(function (response) {
	          _this.$elem.fadeOut(_this.settings.fadeOutAnimationSpeed, function () {
	            // Validation Complete.
	            _this.validateSuccess();
	            // Fade in success element.
	            _this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2);
	            // Callback
	            _this.settings.successCallback.call(_this, callbackParameters);
	          });
	        });
	      } else {
	        // Unbind submit.
	        this.$elem.unbind('submit');
	        // Validation Complete.
	        this.validateSuccess();
	        // Callback
	        this.settings.successCallback.call(this, callbackParameters);
	        // Trigger submit after unbind.
	        this.$elem.trigger('submit');
	      }
	    },
	    process: function process() {
	      // Apply preloader.
	      this.applyPreloader(this.button);
	      // Disable stuff.
	      this.disableButton(true);
	      // Run setup this.
	      this.setup();
	      // Check validation type.
	      if (this.settings.serverValidation) {
	        // If we are doing server validation.
	        this.serverValidateFields();
	      } else {
	        // If we are not doing server validation.
	        this.jsValidateFields();
	      }
	    },
	    validateSuccess: function validateSuccess() {
	      // Destroy preloader.
	      this.destroyPreloader(this.button);
	      // Reset validation.
	      this.validationReset();
	    },
	    validationFailure: function validationFailure() {
	      var _this = this;

	      // Process for 0.5 second.
	      setTimeout(function () {
	        // Set errors
	        _this.attachErrors(_this.errorArray, _this.$elem);
	        // Destroy preloader.
	        _this.destroyPreloader(_this.button);
	      }, 500);
	    },
	    validationReset: function validationReset() {
	      // Destroy preloader.
	      this.destroyPreloader(this.button);
	      // Un-disable stuff.
	      this.disableButton(false);
	      // Remove errors.
	      this.resetErrors();
	      // Clear localStorage.
	      this.clearLocalStorage();
	      // Reset all field values.
	      this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('');
	    }
	  };

	  /**
	   *
	   * init
	   * NULLED.
	   *
	  **/
	  suggester.init = function (form, el, pluginDomains) {
	    // Default domains
	    var defaultDomains = ['aol.com', 'bellsouth.net', 'btinternet.com', 'btopenworld.com', 'blueyonder.co.uk', 'comcast.net', 'cox.net', 'gmail.com', 'google.com', 'googlemail.com', 'hotmail.co.uk', 'hotmail.com', 'hotmail.fr', 'hotmail.it', 'icloud.com', 'live.com', 'mac.com', 'mail.com', 'me.com', 'msn.com', 'o2.co.uk', 'orange.co.uk', 'outlook.com', 'outlook.co.uk', 'sbcglobal.net', 'verizon.net', 'virginmedia.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.com.tw', 'yahoo.es', 'yahoo.fr'];
	    // Extend the domains array with those from the plugin settings.
	    this.domains = $.extend(true, defaultDomains, pluginDomains);

	    var emailVal = el.val();
	    var matchVal = suggester.getMatch(emailVal);

	    this.suggestion = el.next('.js--validation-suggestion');
	    this.reveal(form, el, matchVal);
	  };

	  /**
	   *
	   * getMatch
	   * NULLED.
	   *
	  **/
	  suggester.getMatch = function (query) {
	    var limit = 99;
	    var query = query.split('@');

	    for (var i = 0, ii = this.domains.length; i < ii; i++) {
	      var distance = suggester.levenshteinDistance(this.domains[i], query[1]);
	      if (distance < limit) {
	        limit = distance;
	        var domain = this.domains[i];
	      }
	    }
	    if (limit <= 2 && domain !== null && domain !== query[1]) {
	      return {
	        address: query[0],
	        domain: domain
	      };
	    } else {
	      return false;
	    }
	  };

	  /**
	   *
	   * levenshteinDistance
	   * NULLED.
	   *
	  **/
	  suggester.levenshteinDistance = function (a, b) {
	    var c = 0;
	    var d = 0;
	    var e = 0;
	    var f = 0;
	    var g = 5;

	    if (a == null || a.length === 0) {
	      if (b == null || b.length === 0) {
	        return 0;
	      } else {
	        return b.length;
	      }
	    }
	    if (b == null || b.length === 0) {
	      return a.length;
	    }

	    while (c + d < a.length && c + e < b.length) {
	      if (a[c + d] == b[c + e]) {
	        f++;
	      } else {
	        d = 0;
	        e = 0;
	        for (var h = 0; h < g; h++) {
	          if (c + h < a.length && a[c + h] == b[c]) {
	            d = h;
	            break;
	          }
	          if (c + h < b.length && a[c] == b[c + h]) {
	            e = h;
	            break;
	          }
	        }
	      }
	      c++;
	    }
	    return (a.length + b.length) / 2 - f;
	  };

	  /**
	   *
	   * reveal
	   * NULLED.
	   *
	  **/
	  suggester.reveal = function (form, el, result) {
	    if (result) {
	      Plugin.prototype.resetErrors(form);
	      // Set email address.
	      $('.js--validation-address', this.suggestion).text(result.address);
	      // Set email domain.
	      $('.js--validation-domain', this.suggestion).text(result.domain);
	      // Reveal suggestion.
	      this.suggestion.stop(true, false).slideDown(350);
	      // Click event.
	      $('.js--validation-alternative-email').on('click', function (e) {
	        e.preventDefault();

	        // Apply suggestion.
	        el.val(result.address + '@' + result.domain);
	        // Hide suggestion.
	        suggester.suggestion.stop(true, false).slideUp(350);
	      });
	    }
	  };

	  /**
	   *
	   * removeDuplicates
	   * Remove duplicates from an array.
	   *
	  **/
	  helpers.removeDuplicates = function (array) {
	    var result = [];
	    $.each(array, function (i, e) {
	      if ($.inArray(e, result) == -1) {
	        result.push(e);
	      }
	    });

	    return result;
	  };

	  /**
	   *
	   * log
	   * Returns a cross-browser safe message in the console.
	   *
	  **/
	  helpers.log = function (message, alertlog) {
	    alertlog = typeof alertlog === 'undefined' ? false : true;
	    if (typeof console === 'undefined' || typeof console.log === 'undefined') {
	      if (alertlog) {
	        alert(message);
	      }
	    } else {
	      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
	      console.log('%c' + message, 'color:#c5211d;');
	      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
	      console.log('');
	    }
	  };

	  /**
	   *
	   * parseURLParams
	   * Converts the URL parameters into an object.
	   *
	  **/
	  helpers.parseURLParams = function (str) {
	    return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
	  };
	})(jQuery, window);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mobile = __webpack_require__(8);

	var _mobile2 = _interopRequireDefault(_mobile);

	var _turbolinks = __webpack_require__(9);

	var _turbolinks2 = _interopRequireDefault(_turbolinks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * Route
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	(function (Module, window) {
	  /**
	   * Module
	   * Constructor for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	  **/
	  Module = function Module() {
	    this.plugins();
	    this.init();
	  };

	  /**
	   * _settings
	   * Settings for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype._settings = {};

	  /**
	   * _dom
	   * DOM elements for this module.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype._dom = {
	    form: $('.js--validate-form')
	  };

	  /**
	   * plugins
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.plugins = function () {
	    // Init plugin.
	    window.App.plugins.validation(this._dom.form, {
	      serverValidation: false,
	      appendErrorToPlaceholder: true,
	      msgSep: '',
	      successCallback: function successCallback() {
	        // Check for Google Analytics.
	        if (window.config.ga_active) {
	          // Log it.
	          window.Helpers.log('Setting virtual page view: /form-success.virtual');
	          // Set a virtual page for GA.
	          window.ga('send', 'pageview', '/form-success.virtual');
	        }
	      }
	    });
	  };

	  /**
	   * init
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  Module.prototype.init = function () {
	    _turbolinks2.default.start();
	    _mobile2.default.init();
	  };

	  // Export
	  module.exports = new Module();
	})(function () {}, window);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *
	 * Class
	 *
	 * Copyright 2016, Author Name
	 * Some information on the license.
	 *
	**/

	var MobileMenu = function () {

	  /**
	   * constructor
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/
	  function MobileMenu() {
	    _classCallCheck(this, MobileMenu);

	    // Set flag.
	    this.menuOpen = false;

	    this._settings = {
	      menuSize: '80',
	      moveContent: false
	    };

	    this.dom = {
	      menu: $('.js--mobileMenu--menu'),
	      open: $('.js--mobileMenu--triggerOpen'),
	      content: $('.js--mobileMenu--content')
	    };
	  }

	  /**
	   * init
	   * NULLED.
	   *
	   * @since 1.0.0
	   * @version 1.0.0
	   * @access public
	  **/


	  _createClass(MobileMenu, [{
	    key: 'init',
	    value: function init() {
	      this.events();
	    }

	    /**
	     * events
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      // Extend the events system.
	      window.Events.extend({
	        events: {
	          'click .js--mobileMenu--triggerOpen': 'toggleMenu',
	          'click .js--mobileMenu--triggerClose': 'hideMenu'
	        },
	        toggleMenu: function toggleMenu(e) {
	          return _this.startMenu(!_this.menuOpen ? 'show' : 'hide');
	        },
	        hideMenu: function hideMenu(e) {
	          return _this.startMenu('hide');
	        }
	      });
	    }

	    /**
	     * startMenu
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'startMenu',
	    value: function startMenu(action) {
	      // Set the mobile menu header height to
	      // match the page mobile header height.
	      this.setHeaderHeight();

	      return action === 'show' ? this.showMenu() : this.hideMenu();
	    }

	    /**
	     * showMenu
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'showMenu',
	    value: function showMenu() {
	      // Toggle the mobile menu visiblity.
	      this.style(this.dom.menu, { 'left': -(100 - this._settings.menuSize) + '%', 'opacity': '1' });
	      // Add no-scroll class.
	      $('body').addClass('u-noscroll');
	      // Add active class to button.
	      this.dom.open.addClass('active');
	      // Toggle the content position.
	      if (this._settings.moveContent) {
	        this.style(this.dom.content, { 'left': this._settings.menuSize + '%' });
	      }
	      // Reset flag.
	      this.menuOpen = true;
	    }

	    /**
	     * hideMenu
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'hideMenu',
	    value: function hideMenu() {
	      // Toggle the mobile menu visiblity.
	      this.style(this.dom.menu, { 'left': '-100%', 'opacity': '0' });
	      // Remove no-scroll class.
	      $('body').removeClass('u-noscroll');
	      // Add active class to button.
	      this.dom.open.removeClass('active');
	      // Toggle the content position.
	      if (this._settings.moveContent) {
	        this.style(this.dom.content, { 'left': '' });
	      }
	      // Reset flag.
	      this.menuOpen = false;
	    }

	    /**
	     * setHeaderHeight
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'setHeaderHeight',
	    value: function setHeaderHeight() {
	      return $('.page-mobile-menu__header').height(this.calculateHeight($('.js--mobileMenu--header')));
	    }

	    /**
	     * calculateHeight
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'calculateHeight',
	    value: function calculateHeight(el) {
	      return el.outerHeight();
	    }

	    /**
	     * style
	     * NULLED.
	     *
	     * @since 1.0.0
	     * @version 1.0.0
	     * @access public
	    **/

	  }, {
	    key: 'style',
	    value: function style(el, css) {
	      return el.css(css);
	    }
	  }]);

	  return MobileMenu;
	}();

	var MobileMenuClass = new MobileMenu();

	// Export
	exports.default = MobileMenuClass;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Turbolinks 5.0.0
	Copyright © 2016 Basecamp, LLC
	 */
	(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
	var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"=="function"&&__webpack_require__(10)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);